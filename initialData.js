require("dotenv").config();
const sampleDrivers = require("./mockData/drivers.json");
const sampleDeliveries = require("./mockData/deliveries.json");

// Lets not hardcode password, even for test data
const password = process.env.INITIAL_DATA_PASSWORD;
const PASSWORD_MIN_LENGTH = 8;

// You can force a re-init in development with the RECREATE_DATABASE
// environment variable.
const shouldRecreateDatabase = () =>
  process.env.NODE_ENV !== "production" && process.env.RECREATE_DATABASE;

const validatePassword = () => {
  if (!password) {
    throw new Error(
      `To seed initial data, set the 'INITIAL_DATA_PASSWORD' environment variable`
    );
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    throw new Error(
      `To seed initial data, the 'INITIAL_DATA_PASSWORD' environment variable must be at least ${PASSWORD_MIN_LENGTH} characters`
    );
  }
};

module.exports = async keystone => {
  // Check the users list to see if there are any; if we find none, assume
  // it's a new database and initialise the demo data set.
  const users = await keystone.lists.User.adapter.findAll();
  if (!users.length || shouldRecreateDatabase()) {
    // Ensure a valid initial password is available to be used
    // validatePassword();
    // Drop the connected database to ensure no existing collections remain
    Object.values(keystone.adapters).forEach(async adapter => {
      await adapter.dropDatabase();
    });
    console.log("💾 Creating initial data...");
    const initialData = generateMockData();
    await keystone.createItems(initialData);
  }
};

function generateMockData() {
  const initData = {
    User: [],
    Driver: [],
    Delivery: [],
    Company: [
      {
        name: "company a",
        users: []
      },
      {
        name: "company b",
        users: []
      }
    ]
  };
  for (let i = 0; i < sampleDrivers.length; i++) {
    console.log(`Add sample driver "${sampleDrivers[i].driver_id}"...`);
    const company = i % 2 === 0 ? "company a" : "company b";
    initData.User.push({
      name: sampleDrivers[i].name,
      role: "staff",
      uid: (Math.random() * 100000).toString(),
      company: { where: { name: company } },
      driver: { where: { trackId: sampleDrivers[i].driver_id } }
    });
    if (company === "company a") {
      initData.Company[0].users.push({
        where: {
          name: sampleDrivers[i].name
        }
      });
    } else {
      initData.Company[1].users.push({
        where: {
          name: sampleDrivers[i].name
        }
      });
    }
    initData.Driver.push({
      trackId: sampleDrivers[i].driver_id,
      user: { where: { name: sampleDrivers[i].name } }
    });
  }
  for (let i = 0; i < sampleDeliveries.length; i++) {
    console.log(`Add sample delivery "${sampleDeliveries[i].delivery_id}"...`);
    initData.Delivery.push({
      trackId: sampleDeliveries[i].delivery_id,
      driver: {
        where: {
          trackId: sampleDeliveries[i].driver_id
        }
      }
    });
  }
  console.log(initData);
  return initData;
}

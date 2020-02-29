require("dotenv").config();

const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const { NextApp } = require("@keystonejs/app-next");

const PROJECT_NAME = "dashboard";
const initialiseData = require("./initialData");

const { Delivery, Driver, Company, User } = require("./schema");

/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter({
    mongoUri: process.env.MONGO_URI
  }),
  onConnect: initialiseData
});

keystone.createList("Delivery", Delivery);
keystone.createList("Driver", Driver);
keystone.createList("User", User);
keystone.createList("Company", Company);

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ enableDefaultRoute: false }),
    new NextApp({ dir: "frontend" })
  ]
};

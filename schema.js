require("dotenv").config();

const {
  CloudinaryImage,
  Checkbox,
  DateTime,
  Integer,
  Virtual,
  Location,
  Password,
  Relationship,
  Select,
  Text
} = require("@keystonejs/fields");
const { CloudinaryAdapter } = require("@keystonejs/file-adapters");
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");
const gql = require("graphql-tag");
const cloudinaryAdapter = new CloudinaryAdapter({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET
});

exports.Company = {
  fields: {
    name: { type: Text },
    users: { type: Relationship, ref: "User.company", many: true }
  }
};

exports.User = {
  fields: {
    email: { type: Text },
    uid: { type: Text, isUnique: true },
    name: { type: Text },
    role: { type: Select, options: "superadmin, admin, staff" },
    company: { type: Relationship, ref: "Company.users" },
    driver: { type: Relationship, ref: "Driver.user" }
  }
};

exports.Driver = {
  fields: {
    trackId: { type: Text },
    user: { type: Relationship, ref: "User.driver" },
    deliveries: {
      type: Relationship,
      ref: "Delivery.driver",
      many: true
    },
    trackDriver: {
      type: Virtual,
      extendGraphQLTypes: [
        `type TrackDriver { device_id: String, platform: String }`
      ],
      graphQLReturnType: `TrackDriver`,
      graphQLReturnFragment: `{
            device_id
            platform
        }`,
      resolver: async item => {
        const response = await fetch(
          "https://logtruck.herokuapp.com/logistics/drivers/" + item.trackId
        );
        console.log(response);
        const data = await response.json();
        return data;
      }
    }
  }
};

exports.Delivery = {
  fields: {
    trackId: { type: Text },
    deliverBy: { type: DateTime },
    driver: { type: Relationship, ref: "Driver.deliveries" },
    trackDelivery: {
      type: Virtual,
      extendGraphQLTypes: [
        `type TrackDelivery { delivery_id: String, status: String }`
      ],
      graphQLReturnType: `TrackDelivery`,
      graphQLReturnFragment: `{
            delivery_id
            status
          }`,
      resolver: async item => {
        const response = await fetch(
          "https://logtruck.herokuapp.com/logistics/deliveries/" + item.trackId
        );
        console.log(response);
        const data = await response.json();
        return data;
      }
    }
  }
};

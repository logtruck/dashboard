const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");
const withCSS = require("@zeit/next-css");
const withTM = require("next-transpile-modules");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = () => {};
}

const nextConfiguration = {
  ["!" + PHASE_DEVELOPMENT_SERVER]: {
    env: {
      APOLLO_CLIENT_URL: "http://localhost:3000/admin/api",
      APOLLO_GITHUB_CLIENT_URL: "https://api.github.com/graphql",
      APOLLO_PRODUCT_HUNT_CLIENT_URL:
        "https://api.producthunt.com/v2/api/graphql",
      GITHUB_AUTH_TOKEN: "your_github_auth_token",
      PRODUCT_HUNT_AUTH_TOKEN: "your_product_hunt_auth_token",
      FIREBASE_API_KEY: "AIzaSyAmLNfQNfqDvI-ozxRBEOtEkmUnk5VICwI",
      FIREBASE_AUTH_DOMAIN: "logtruck-c0c73.firebaseapp.com",
      FIREBASE_DATABASE_URL: "https://logtruck-c0c73.firebaseio.com",
      FIREBASE_PROJECT_ID: "logtruck-c0c73",
      FIREBASE_STORAGE_BUCKET: "logtruck-c0c73.appspot.com",
      FIREBASE_MESSAGING_SENDER_ID: "1088956012666",
      FIREBASE_APP_ID: "1:1088956012666:web:61b5f21c77f830938783c3",
      FIREBASE_MEASUREMENT_ID: "your_measurement_id"
    }
  },
  [PHASE_DEVELOPMENT_SERVER]: {
    env: {
      APOLLO_CLIENT_URL: "http://localhost:3000/admin/api",
      APOLLO_GITHUB_CLIENT_URL: "https://api.github.com/graphql",
      APOLLO_PRODUCT_HUNT_CLIENT_URL:
        "https://api.producthunt.com/v2/api/graphql",
      GITHUB_AUTH_TOKEN: "your_github_auth_token",
      PRODUCT_HUNT_AUTH_TOKEN: "your_product_hunt_auth_token",
      FIREBASE_API_KEY: "AIzaSyAmLNfQNfqDvI-ozxRBEOtEkmUnk5VICwI",
      FIREBASE_AUTH_DOMAIN: "logtruck-c0c73.firebaseapp.com",
      FIREBASE_DATABASE_URL: "https://logtruck-c0c73.firebaseio.com",
      FIREBASE_PROJECT_ID: "logtruck-c0c73",
      FIREBASE_STORAGE_BUCKET: "logtruck-c0c73.appspot.com",
      FIREBASE_MESSAGING_SENDER_ID: "1088956012666",
      FIREBASE_APP_ID: "1:1088956012666:web:61b5f21c77f830938783c3",
      FIREBASE_MEASUREMENT_ID: "your_measurement_id"
    }
  },
  webpack: function(config) {
    config.externals = config.externals || {};
    config.externals["styletron-server"] = "styletron-server";
    return config;
  }
};

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: ["react-flexbox-grid"]
      }
    ],
    withOptimizedImages,
    withFonts,
    withCSS
  ],

  nextConfiguration
);

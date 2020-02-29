const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = () => {};
}

const nextConfiguration = {
  ['!' + PHASE_DEVELOPMENT_SERVER]: {
    env: {
      APOLLO_CLIENT_URL: 'your_apollo_client_api',
      APOLLO_GITHUB_CLIENT_URL: 'https://api.github.com/graphql',
      APOLLO_PRODUCT_HUNT_CLIENT_URL:
        'https://api.producthunt.com/v2/api/graphql',
      GITHUB_AUTH_TOKEN: 'your_github_auth_token',
      PRODUCT_HUNT_AUTH_TOKEN: 'your_product_hunt_auth_token',
      FIREBASE_API_KEY: 'your_firebase_api_key',
      FIREBASE_AUTH_DOMAIN: 'your_firebase_auth_domain',
      FIREBASE_DATABASE_URL: 'your_firebase_database_url',
      FIREBASE_PROJECT_ID: 'your_firebase_project_id',
      FIREBASE_STORAGE_BUCKET: 'your_firebase_storage_bucket',
      FIREBASE_MESSAGING_SENDER_ID: 'your_messaging_sender_id',
      FIREBASE_APP_ID: 'your_firebase_app_id',
      FIREBASE_MEASUREMENT_ID: 'your_measurement_id',
    },
  },
  [PHASE_DEVELOPMENT_SERVER]: {
    env: {
      APOLLO_CLIENT_URL: 'http://localhost:4000/graphql',
      APOLLO_GITHUB_CLIENT_URL: 'https://api.github.com/graphql',
      APOLLO_PRODUCT_HUNT_CLIENT_URL:
        'https://api.producthunt.com/v2/api/graphql',
      GITHUB_AUTH_TOKEN: 'your_github_auth_token',
      PRODUCT_HUNT_AUTH_TOKEN: 'your_product_hunt_auth_token',
      FIREBASE_API_KEY: 'your_firebase_api_key',
      FIREBASE_AUTH_DOMAIN: 'your_firebase_auth_domain',
      FIREBASE_DATABASE_URL: 'your_firebase_database_url',
      FIREBASE_PROJECT_ID: 'your_firebase_project_id',
      FIREBASE_STORAGE_BUCKET: 'your_firebase_storage_bucket',
      FIREBASE_MESSAGING_SENDER_ID: 'your_messaging_sender_id',
      FIREBASE_APP_ID: 'your_firebase_app_id',
      FIREBASE_MEASUREMENT_ID: 'your_measurement_id',
    },
  },
  webpack: function(config) {
    config.externals = config.externals || {};
    config.externals['styletron-server'] = 'styletron-server';
    return config;
  },
};

module.exports = withPlugins(
  [
    [
      withTM,
      {
        transpileModules: ['react-flexbox-grid'],
      },
    ],
    withOptimizedImages,
    withFonts,
    withCSS,
  ],

  nextConfiguration
);

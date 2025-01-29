const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Custom modifications to the Webpack config (optional)
  // Example: Uncomment to set up aliases or plugins
  // config.resolve.alias['my-alias'] = '/my/custom/path';

  return config;
};

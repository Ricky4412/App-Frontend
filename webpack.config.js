const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async (env, argv) => {
  // Validate the mode (development or production)
  env.mode = env.mode || 'development';

  // Create the default config
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Customize the config before returning it
  // For example, add custom plugins, loaders, etc.

  return config;
};
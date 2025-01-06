const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(envKeys));
  },
});

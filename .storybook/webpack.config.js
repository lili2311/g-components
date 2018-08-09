/**
 * @file
 * Custom Webpack config for Storybook.
 * This isn't used for any actual bundling; we use Rollup for that.
 */

const path = require('path');
const BowerResolvePlugin = require('bower-resolve-webpack-plugin');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: ['bower_components'],
        },
      },
    ],
    include: path.resolve(__dirname, '../'),
  });

  defaultConfig.module.rules.push({
    test: /\.txt/,
    loader: 'raw-loader',
  });

  defaultConfig.resolve.modules.push('bower_components');
  defaultConfig.resolve.plugins = [new BowerResolvePlugin()];
  defaultConfig.resolve.descriptionFiles = ['bower.json', 'package.json'];
  defaultConfig.resolve.mainFields = ['browser', 'main'];

  return defaultConfig;
};

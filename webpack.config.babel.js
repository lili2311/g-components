/**
 * @file
 * Custom Webpack config for Storybook.
 * This isn't used for any actual bundling; we use Rollup for that.
 */

import { resolve } from 'path';
import BowerResolvePlugin from 'bower-resolve-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import merge from 'webpack-merge';

module.exports = (mode = 'production') => {
  const common = {
    mode,
    entry: ['./index.js'],
    resolve: {
      modules: ['bower_components', 'node_modules'],
      plugins: [new BowerResolvePlugin()],
      descriptionFiles: ['bower.json', 'package.json'],
      mainFields: ['browser', 'main'],
      alias: {
        ftdomdelegate: 'dom-delegate',
      },
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['babel-preset-env', 'babel-preset-react'],
            plugins: [
              'add-module-exports' /* <-- wtfits */,
              'transform-runtime',
              'transform-class-properties',
              'syntax-dynamic-import',
            ],
          },
        },
        {
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
        },
        {
          test: /\.txt/,
          loader: 'raw-loader',
        },
      ],
    },
  };

  return [
    merge(common, {
      output: {
        libraryTarget: 'umd',
        library: 'GComponents',
        path: resolve(__dirname, 'dist'),
        filename: 'gcomponents.umd.js',
        sourceMapFilename: 'gcomponents.umd.map',
      },
    }),
    merge(common, {
      output: {
        libraryTarget: 'commonjs2',
        path: resolve(__dirname, 'dist'),
        filename: 'gcomponents.cjs.js',
        sourceMapFilename: 'gcomponents.cjs.map',
      },
    }),
    merge(common, {
      output: {
        libraryTarget: 'umd',
        library: 'GComponents',
        path: resolve(__dirname, 'dist'),
        filename: 'gcomponents.umd.min.js',
        sourceMapFilename: 'gcomponents.umd.map',
      },
      optimization: {
        minimizer: [new UglifyJsPlugin()],
      },
    }),
    merge(common, {
      output: {
        libraryTarget: 'commonjs2',
        path: resolve(__dirname, 'dist'),
        filename: 'gcomponents.cjs.min.js',
        sourceMapFilename: 'gcomponents.cjs.map',
      },
      optimization: {
        minimizer: [new UglifyJsPlugin()],
      },
    }),
  ];
};

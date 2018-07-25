const path = require('path');

const sharedConfig = {
  entry: './index.js',
  resolve: {
    modules: ['node_modules', 'bower_components'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [
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
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
};

module.exports = {
  ...sharedConfig,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.min.js',
    libraryTarget: 'umd',
    library: 'GComponents',
  },
};

const path = require("path");

module.exports = {
  resolve: {
    modules: ['node_modules', 'bower_components'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: ['bower_components'],
            },
          }],
        include: path.resolve(__dirname, "../")
      }
    ]
  }
};

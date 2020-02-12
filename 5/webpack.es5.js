const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: ['core-js/features/promise', 'intersection-observer', './src/index.js'],
  output: {
    filename: 'sunmedia-es5.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
        loader: "babel-loader", 
        options: {
          presets: ["@babel/preset-env"]
         }
        }
      },
    ],
  },
});
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

module.exports = merge.smart({
  mode: 'development',
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/index.html'})
  ]
}, baseConfig);

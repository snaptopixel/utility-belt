const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');

module.exports = merge.smart({
  mode: 'production',
  stats: {
    modules: false,
    children: false,
    entrypoints: false,
  },
  entry: {
    widget: './src/index.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[hash:8].js',
    chunkFilename: '[id].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "[id].[hash:8].css"
    }),
    new OptimizeCssAssetsPlugin()
  ]
}, baseConfig);
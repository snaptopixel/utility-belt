const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          onlyCompileBundledFiles: true
        }
      },
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "stylus-loader",
            options: {
              sourceMap: true,
              preferPathResolver: 'webpack',
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
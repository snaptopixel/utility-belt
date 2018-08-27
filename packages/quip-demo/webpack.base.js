const path = require('path');

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
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeViewBox: false },
                { removeXMLNS: true },
                { removeDoctype: true },
                { removeAttrs: { attrs: 'svg:(width|height)' } },
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
                { removeUnknownsAndDefaults: true }
              ]
            }
          }
        ]
      }
    ]
  }
}
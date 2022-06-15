const webpack = require('webpack')
const { webpackConfig, merge } = require('shakapacker')

module.exports = merge(webpackConfig, {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery/src/jquery',
    })
  ],
})
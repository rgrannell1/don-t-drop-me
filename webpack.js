const path = require('path')
const clean = require('clean-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

require('dotenv').config()

module.exports = {
  mode: 'production',
  entry: {
    index: './client/js/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('public/js')
  },
  plugins: [
    new clean.CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve('public/**/*')
      ]
    }),
    new webpack.DefinePlugin({
      __DISABLE_SERVICE_WORKER__: process.env.DISABLE_SERVICE_WORKER
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public/index.html'),
    port: 6000
  }
}

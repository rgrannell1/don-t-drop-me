import * as path from 'path'
import clean from 'clean-webpack-plugin'
import webpack from 'webpack'

import dotenv from 'dotenv'

dotenv.config()

export default {
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
      __DISABLE_SERVICE_WORKER__: process.env.DISABLE_SERVICE_WORKER || false
    })
  ],
  devServer: {
    contentBase: 'public/index.html',
    port: 6000
  }
}

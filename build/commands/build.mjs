
import * as fs from 'fs'

import fse from 'fs-extra'
import webpack from 'webpack'

import webpackConfig from '../../webpack.mjs'

const command = {
  name: 'build',
  dependencies: []
}

command.cli = `
Usage:
  script build [--production]
Description:
  Build
`

const build = {}

build.webpack = async ({ production }) => {
  await new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      console.log(stats.toString({ colors: true }))

      if (err) {
        reject(err)
      } else if (stats.hasErrors()) {
        reject(new Error('failed due to compiliation errors'))
      }

      resolve()
    })
  })
}

command.task = async args => {
  try {
    await new Promise((resolve, reject) => {
      fs.mkdir('public', err => {
        err ? reject(err) : resolve()
      })
    })
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }

  await build.webpack({

  })
  await Promise.all([
    fse.copy('client/css', 'public/css'),
    fse.copy('client/data', 'public/data'),
    fse.copy('client/images', 'public/images'),
    fse.copy('client/index.html', 'public/index.html'),
    fse.copy('client/manifest.webmanifest', 'public/manifest.webmanifest'),
    fse.copy('client/service-worker.js', 'public/service-worker.js')
  ])
}

export default command
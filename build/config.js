const path = require('path')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version
const banner =
  `/**
 * we-cropper v${version}
 * (c) ${new Date().getFullYear()} dlhandsome
 * @license MIT
 */`

const resolve = _path => path.resolve(__dirname, '../', _path)

const configs = {
  umdDev: {
    input: resolve('src/main.js'),
    file: resolve('dist/weCropper.js'),
    format: 'umd',
    env: 'development'
  },
  umdProd: {
    input: resolve('src/main.js'),
    file: resolve('dist/weCropper.min.js'),
    format: 'umd',
    env: 'production'
  }
}

function genConfig (opts) {
  const config = {
    input: {
      input: opts.input,
      plugins: [
        replace({
          __VERSION__: JSON.stringify(version)
        }),
        buble()
      ]
    },
    output: {
      banner,
      file: opts.file,
      format: opts.format,
      name: 'weCropper'
    }
  }
  
  return config
}

function mapValues (obj, fn) {
  const res = {}
  Object.keys(obj).forEach(key => {
    res[key] = fn(obj[key], key)
  })
  return res
}

module.exports = mapValues(configs, genConfig)
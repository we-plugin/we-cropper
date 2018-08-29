const path = require('path')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const npmResolve = require('rollup-plugin-node-resolve')
const common = require('rollup-plugin-commonjs')
const copy = require('rollup-plugin-copy')
const version = process.env.VERSION || require('../../package.json').version
const banner =
  `/**
 * we-cropper v${version}
 * (c) ${new Date().getFullYear()} dlhandsome
 * @license MIT
 */`

const resolve = _path => path.resolve(__dirname, '../../', _path)

const configs = {
  umdDev: {
    input: resolve('src/main.js'),
    file: resolve('dist/we-cropper.js'),
    format: 'umd',
    env: 'development'
  },
  umdProd: {
    input: resolve('src/main.js'),
    file: resolve('dist/we-cropper.min.js'),
    format: 'umd',
    env: 'production'
  }
}

function genConfig (name) {
  const opts = configs[name]
  const config = {
    input: opts.input,
    plugins: [
      npmResolve(),
      common(),
      replace({
        __VERSION__: JSON.stringify(version)
      }),
      buble(),
      copy({
        'dist/': 'example/we-cropper/',
        verbose: true
      })
    ],
    output: {
      banner,
      file: opts.file,
      format: opts.format,
      name: 'WeCropper'
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

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  module.exports = Object.keys(configs).map(genConfig)
}

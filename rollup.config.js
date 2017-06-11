/**
 * Created by sail on 2017/6/11.
 */
var babel = require('rollup-plugin-babel')

module.exports = {
	entry: 'src/main.js',
	format: 'umd',
	moduleName: 'weCropper',
	dest: 'dist/weCropper.js',
	plugins: [babel()]
}
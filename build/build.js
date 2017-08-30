/**
 * Created by sail on 2017/6/11.
 */
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')

rollup.rollup({
	entry: 'src/main.js',
	plugins: [
		json(),
		babel()
	]
})
.then(bundle => bundle.write({
	format: 'umd',
	moduleName: 'weCropper',
	dest: 'dist/weCropper.js'
}))
.catch(err => console.error(err))
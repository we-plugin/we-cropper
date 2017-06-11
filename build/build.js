/**
 * Created by sail on 2017/6/11.
 */
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

rollup.rollup({
	entry: 'src/main.js',
	plugins: [babel()]
})
.then(bundle => bundle.write({
	format: 'umd',
	moduleName: 'weCropper',
	dest: 'dist/weCropper.js'
}))
.catch(err => console.error(err))
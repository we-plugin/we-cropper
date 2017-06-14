const __version__ = '1.1.4'

import { validator, setTouchState } from './utils'
import DEFAULT from './default'
import prepare from './prepare'
import observer from './observer'
import methods from './methods'
import update from './update'
import handle from './handle'
import cutt from './cut'

class weCropper {

	constructor (params) {
		const self = this
		const _default = {}

		validator(self, DEFAULT)

		Object.keys(DEFAULT).forEach(key => {
			_default[key] = DEFAULT[key].default
		})
		Object.assign(self, _default, params)

		self.prepare()
		self.attachPage()
		self.createCtx()
		self.observer()
		self.cutt()
		self.methods()
		self.init()
		self.update()

		return self
	}


	init () {
		const self = this
		const { src } = self

		self.version = __version__

		typeof self.onReady === 'function' && self.onReady(self.ctx, self)

		if (src) {
			self.pushOrign(src)
		}
		setTouchState(self, false, false, false)

		self.oldScale = 1
		self.newScale = 1

		return self
	}
}

Object.assign(weCropper.prototype, handle)

weCropper.prototype.prepare = prepare
weCropper.prototype.observer = observer
weCropper.prototype.methods = methods
weCropper.prototype.cutt = cutt
weCropper.prototype.update = update

export default weCropper

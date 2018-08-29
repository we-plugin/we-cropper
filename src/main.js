import { validator, setTouchState } from './utils/index'
import DEFAULT from './default'
import prepare from './prepare'
import observer from './observer'
import methods from './methods'
import update from './update'
import handle from './handle'
import cutt from './cut'

const version = __VERSION__

class WeCropper {
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

    self.version = version

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

Object.assign(WeCropper.prototype, handle)

WeCropper.prototype.prepare = prepare
WeCropper.prototype.observer = observer
WeCropper.prototype.methods = methods
WeCropper.prototype.cutt = cutt
WeCropper.prototype.update = update

export default WeCropper

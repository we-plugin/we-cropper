let device = void 0
const TOUCH_STATE = ['touchstarted', 'touchmoved', 'touchended']
const adaptAPI = {
  strokeStyle: 'setStrokeStyle',
  fillStyle: 'setFillStyle',
  lineWidth: 'setLineWidth'
}

export function firstLetterUpper (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function setTouchState (instance, ...arg) {
  TOUCH_STATE.forEach((key, i) => {
    if (arg[i] !== undefined) {
      instance[key] = arg[i]
    }
  })
}

export function validator (instance, o) {
  Object.defineProperties(instance, o)
}

export function	getDevice () {
  if (!device) {
    device = wx.getSystemInfoSync()
  }
  return device
}

export function adapt2d (context, handle, value) {
  if (context.type === '2d') {
    context.ctx[handle] = value
  } else {
    context.ctx[adaptAPI[handle]](value)
  }
}

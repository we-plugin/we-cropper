let	device = void 0
const TOUCH_STATE = ['touchstarted', 'touchmoved', 'touchended']

export function isFunction (obj) {
  return typeof obj === 'function'
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

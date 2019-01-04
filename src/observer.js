import {
  isFunc
} from './utils/tools'
import {
  firstLetterUpper
} from './utils/helper'

const EVENT_TYPE = ['ready', 'beforeImageLoad', 'beforeDraw', 'imageLoad']

export default function observer () {
  const self = this

  self.on = (event, fn) => {
    if (EVENT_TYPE.indexOf(event) > -1) {
      if (isFunc(fn)) {
        event === 'ready'
          ? fn(self)
          : self[`on${firstLetterUpper(event)}`] = fn
      }
    } else {
      console.error(`event: ${event} is invalid`)
    }
    return self
  }
}

import {
  getDevice
} from './utils/helper'

let tmp = {}

const {
  pixelRatio
} = getDevice()

export default {
  id: {
    default: 'cropper',
    get () {
      return tmp.id
    },
    set (value) {
      if (typeof (value) !== 'string') {
        console.error(`id：${value} is invalid`)
      }
      tmp.id = value
    }
  },
  width: {
    default: 750,
    get () {
      return tmp.width
    },
    set (value) {
      if (typeof (value) !== 'number') {
        console.error(`width：${value} is invalid`)
      }
      tmp.width = value
    }
  },
  height: {
    default: 750,
    get () {
      return tmp.height
    },
    set (value) {
      if (typeof (value) !== 'number') {
        console.error(`height：${value} is invalid`)
      }
      tmp.height = value
    }
  },
  pixelRatio: {
    default: pixelRatio,
    get () {
      return tmp.pixelRatio
    },
    set (value) {
      if (typeof (value) !== 'number') {
        console.error(`pixelRatio：${value} is invalid`)
      }
      tmp.pixelRatio = value
    }
  },
  scale: {
    default: 2.5,
    get () {
      return tmp.scale
    },
    set (value) {
      if (typeof (value) !== 'number') {
        console.error(`scale：${value} is invalid`)
      }
      tmp.scale = value
    }
  },
  zoom: {
    default: 5,
    get () {
      return tmp.zoom
    },
    set (value) {
      if (typeof (value) !== 'number') {
        console.error(`zoom：${value} is invalid`)
      } else if (value < 0 || value > 10) {
        console.error(`zoom should be ranged in 0 ~ 10`)
      }
      tmp.zoom = value
    }
  },
  src: {
    default: '',
    get () {
      return tmp.src
    },
    set (value) {
      if (typeof (value) !== 'string') {
        console.error(`src：${value} is invalid`)
      }
      tmp.src = value
    }
  },
  cut: {
    default: {},
    get () {
      return tmp.cut
    },
    set (value) {
      if (typeof (value) !== 'object') {
        console.error(`cut：${value} is invalid`)
      }
      tmp.cut = value
    }
  },
  boundStyle: {
    default: {},
    get () {
      return tmp.boundStyle
    },
    set (value) {
      if (typeof (value) !== 'object') {
        console.error(`boundStyle：${value} is invalid`)
      }
      tmp.boundStyle = value
    }
  },
  onReady: {
    default: null,
    get () {
      return tmp.ready
    },
    set (value) {
      tmp.ready = value
    }
  },
  onBeforeImageLoad: {
    default: null,
    get () {
      return tmp.beforeImageLoad
    },
    set (value) {
      tmp.beforeImageLoad = value
    }
  },
  onImageLoad: {
    default: null,
    get () {
      return tmp.imageLoad
    },
    set (value) {
      tmp.imageLoad = value
    }
  },
  onBeforeDraw: {
    default: null,
    get () {
      return tmp.beforeDraw
    },
    set (value) {
      tmp.beforeDraw = value
    }
  }
}

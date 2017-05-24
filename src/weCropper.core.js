const __version__ = '1.1.1'

const DEFAULT = {
	id: {
		default: 'cropper',
		get () {
			return this.__id__
		},
		set (value) {
			if (typeof(value) !== 'string') {
				console.error(`id：${value} is invalid`)
			}
			this.__id__ = value
		}
	},
	width: {
		default: 750,
		get () {
			return this.__width__
		},
		set (value) {
			if (typeof(value) !== 'number') {
				console.error(`width：${value} is invalid`)
			}
			this.__width__ = value
		}
	},
	height: {
		default: 750,
		get () {
			return this.__height__
		},
		set (value) {
			if (typeof(value) !== 'number') {
				console.error(`height：${value} is invalid`)
			}
			this.__height__ = value
		}
	},
	minScale: {
		default: 1,
		get () {
			return this.__minScale__
		},
		set (value) {
			if (typeof(value) !== 'number') {
				console.error(`minScale：${value} is invalid`)
			}
			this.__minScale__ = value
		}
	},
	maxScale: {
		default: 2.5,
		get () {
			return this.__maxScale__
		},
		set (value) {
			if (typeof(value) !== 'number') {
				console.error(`maxScale：${value} is invalid`)
			}
			this.__maxScale__ = value
		}
	},
	zoom: {
		default: 5,
		get () {
			return this.__zoom__
		},
		set (value) {
			if (typeof(value) !== 'number') {
				console.error(`zoom：${value} is invalid`)
			} else if (value < 0 || value > 10) {
				console.error(`zoom should be ranged in 0 ~ 10`)
			}
			this.__zoom__ = value
		}
	},
	src: {
		default: 'cropper',
		get () {
			return this.__src__
		},
		set (value) {
			if (typeof(value) !== 'string') {
				console.error(`id：${value} is invalid`)
			}
			this.__src__ = value
		}
	},
	onReady: {
		default: null,
		get () {
			return this.__ready__
		},
		set (value) {
			this.__ready__ = value
		}
	},
	onBeforeImageLoad: {
		default: null,
		get () {
			return this.__beforeImageLoad__
		},
		set (value) {
			this.__beforeImageLoad__ = value
		}
	},
	onImageLoad: {
		default: null,
		get () {
			return this.__imageLoad__
		},
		set (value) {
			this.__imageLoad__ = value
		}
	},
	onBeforeDraw: {
		default: null,
		get () {
			return this.__beforeDraw__
		},
		set (value) {
			this.__beforeDraw__ = value
		}
	}
}

export default class weCropper {

	constructor (params) {
		const self = this
		const _default = {}

		self.version = __version__

		self.validator(DEFAULT)
		self.tools()

		Object.keys(DEFAULT).forEach(key => {
			_default[key] = DEFAULT[key].default
		})

		Object.assign(self, _default, params)

		self.attachPage()
		self.createCtx()
		self._hook()
		self._methods()
		self._init()
		self._updateTouch ()

		return self
	}

	tools () {
		const self = this

		self.firstLetterUpper = (str) => {
			return str.charAt(0).toUpperCase() + str.slice(1)
		}

		self.attachPage = () => {
			const pages = getCurrentPages()
			//  获取到当前page上下文
			const pageContext = pages[pages.length - 1]
			//  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
			pageContext.wecropper = self
		}

		self.createCtx = () => {
			const { id } =  self
			if (id) {
				self.ctx = wx.createCanvasContext(id)
			} else {
				console.error(`constructor: create canvas context failed, 'id' must be valuable`)
			}
		}

		self.getDevice = () => {
			!self.device && (self.device = wx.getSystemInfoSync())
			return self.device
		}
	}

	validator (o) {
		Object.defineProperties(this, o)
	}

	_hook () {
		const self = this

		const EVENT_TYPE = ['ready', 'beforeImageLoad', 'beforeDraw', 'imageLoad']

		self.on = (event, fn) => {
			if (EVENT_TYPE.indexOf(event) > -1) {
				if (typeof(fn) === 'function') {
					event === 'ready'
					? fn(self)
					: self[`on${ self.firstLetterUpper(event) }`] = fn
				}
			} else {
				console.error(`event: ${ event } is invalid`)
			}
			return self
		}
	}

	_init () {
		const self = this
		const { src } = self

		typeof self.onReady === 'function' && self.onReady(self.ctx, self)

		if (src) {
			self.pushOrign(src)
		}
		self.setTouchState(false, false, false)

		return self
	}

	_updateTouch () {
		const self = this

		if (!self.src) return

		self.__oneTouchStart = (touch) => {
			self.touchX0 = touch.x
			self.touchY0 = touch.y
		}

		self.__oneTouchMove = (touch) => {
			let xMove, yMove
			//计算单指移动的距离
			if (self.touchstarted === false) {
				self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight)

				typeof self.onBeforeDraw === 'function' && self.onBeforeDraw(self.ctx, self)

				self.ctx.draw()
				return
			}
			xMove = touch.x - self.touchX0
			yMove = touch.y - self.touchY0

			self.imgLeft = self.rectX + xMove
			self.imgTop = self.rectY + yMove

			self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight)

			typeof self.onBeforeDraw === 'function' && self.onBeforeDraw(self.ctx, self)

			self.ctx.draw()
		}

		self.__twoTouchStart = (touch0, touch1) => {
			let xMove, yMove, oldDistance

			self.touchX1 = self.rectX + self.scaleWidth / 2
			self.touchY1 = self.rectY + self.scaleHeight / 2

			//计算两指距离
			xMove = touch1.x - touch0.x
			yMove = touch1.y - touch0.y
			oldDistance = Math.sqrt(xMove * xMove + yMove * yMove)

			self.oldDistance = oldDistance
		}

		self.__twoTouchMove = (touch0, touch1) => {
			let xMove, yMove, newDistance
			const { minScale, maxScale, zoom } = self
			// 计算二指最新距离
			xMove = touch1.x - touch0.x
			yMove = touch1.y - touch0.y
			newDistance = Math.sqrt(xMove * xMove + yMove * yMove)

			//  使用0.005的缩放倍数具有良好的缩放体验
			self.newScale =  self.oldScale + 0.001 * zoom * (newDistance - self.oldDistance)

			//  设定缩放范围
			self.newScale <= minScale && (self.newScale = minScale)
			self.newScale >= maxScale && (self.newScale = maxScale)

			self.scaleWidth = self.newScale * self.baseWidth
			self.scaleHeight = self.newScale * self.baseHeight
			self.imgLeft =  self.touchX1 - self.scaleWidth / 2
			self.imgTop = self.touchY1 - self.scaleHeight / 2

			self.updateCanvas()
		}

		self.__xtouchEnd = () => {
			self.oldScale = self.newScale || self.oldScale
			self.rectX = self.imgLeft || self.rectX
			self.rectY = self.imgTop || self.rectY
		}
	}
	//  图片手势初始监测
	touchStart (e) {
		const self = this
		const [touch0, touch1] = e.touches

		self.setTouchState(true, null, null)

		//计算第一个触摸点的位置，并参照改点进行缩放
		self.__oneTouchStart(touch0)

		// 两指手势触发
		if (e.touches.length >= 2) {
			self.__twoTouchStart(touch0, touch1)
		}
	}
	//  图片手势动态缩放
	touchMove (e) {
		const self = this
		const [ touch0, touch1 ] = e.touches

		self.setTouchState(null, true)

		// 单指手势时触发
		if (e.touches.length === 1) {
			self.__oneTouchMove(touch0)
		}
		// 两指手势触发
		if (e.touches.length >= 2) {
			self.__twoTouchMove(touch0, touch1)
		}
	}

	touchEnd (e) {
		const self = this

		self.setTouchState(false, false, true)
		self.__xtouchEnd()
	}

	setTouchState(touchstarted = null, touchmoved = null, touchended = null) {
		const self = this

		const state = {
			touchstarted,
			touchmoved,
			touchended
		}

		Object.keys(state).forEach(key => {
			if (state[key]!== null) {
				self[key] = state[key]
			}
		})
	}

	_methods () {
		const self = this
		const { windowWidth } = self.getDevice()

		self.updateCanvas = () => {
			if (self.croperTarget) {
				//  画布绘制图片
				self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight)
			}
			typeof self.onBeforeDraw === 'function' && self.onBeforeDraw(self.ctx, self)

			self.ctx.draw()
		}

		self.pushOrign = (src) => {
			self.src = src

			typeof self.onBeforeImageLoad === 'function' && self.onBeforeImageLoad(self.ctx, self)

			wx.getImageInfo({
				src,
				success (res) {
					let { width, height } = self
					let innerAspectRadio = res.width / res.height

					self.croperTarget = res.path
					self.rectX = 0
					self.baseWidth= width * windowWidth / 750
					self.baseHeight = width * windowWidth / (innerAspectRadio * 750)
					self.rectY = (height * windowWidth / 750 - self.baseHeight) / 2

					self.imgLeft = self.rectX
					self.imgTop = self.rectY
					self.scaleWidth = self.baseWidth
					self.scaleHeight = self.baseHeight
					self.oldScale = 1

					self.updateCanvas()

					typeof self.onImageLoad === 'function' && self.onImageLoad(self.ctx, self)
				}
			})

			self._updateTouch()
			return self
		}

		self.getCropperImage = (callback) => {
			const { id } = self

			wx.canvasToTempFilePath({
				canvasId: id,
				success (res) {
					typeof callback === 'function' && callback(res.tempFilePath)
				}
			})

			return self
		}
	}
}

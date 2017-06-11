/**
 * Created by sail on 2017/6/11.
 */
import { getDevice } from './utils'

export default function methods() {
	const self = this
	const { windowWidth } = getDevice()
	const deviceRadio = windowWidth / 750

	self.updateCanvas = () => {
		if (self.croperTarget) {
			//  画布绘制图片
			self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight)
		}
		typeof self.onBeforeDraw === 'function' && self.onBeforeDraw(self.ctx, self)

		self.ctx.draw()
		return self
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
				self.baseWidth = width * deviceRadio
				self.baseHeight = width * deviceRadio / innerAspectRadio
				self.rectY = (height * deviceRadio - self.baseHeight) / 2

				self.imgLeft = self.rectX
				self.imgTop = self.rectY
				self.scaleWidth = self.baseWidth
				self.scaleHeight = self.baseHeight
				self.oldScale = 1

				self.updateCanvas()

				typeof self.onImageLoad === 'function' && self.onImageLoad(self.ctx, self)
			}
		})

		self.update()
		return self
	}

	self.getCropperImage = (...args) => {
		const { id } = self
		const ARG_TYPE = toString.call(args[0])

		switch (ARG_TYPE) {
			case '[object Object]':
				let { x = 0, y = 0, width = self.width * deviceRadio, height = self.height * deviceRadio, quality = 10 } = args[0]

				if (typeof(quality) !== 'number') {
					console.error(`quality：${quality} is invalid`)
				} else if (quality < 0 || quality > 10) {
					console.error(`quality should be ranged in 0 ~ 10`)
				}
				wx.canvasToTempFilePath({
					canvasId: id,
					x,
					y,
					width,
					height,
					destWidth: width * quality / (deviceRadio * 10),
					destHeight: height * quality / (deviceRadio * 10),
					success (res) {
						typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath)
					}
				}); break
			case '[object Function]':
				wx.canvasToTempFilePath({
					canvasId: id,
					destWidth: self.width,
					destHeight: self.height,
					success (res) {
						typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath)
					}
				}); break
		}

		return self
	}
}
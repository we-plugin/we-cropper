/**
 * Created by sail on 2017/6/11.
 */
export default function methods() {
	const self = this

	const { deviceRadio } = self
	const boundWidth = self.width // 裁剪框默认宽度，即整个画布宽度
	const boundHeight = self.height // 裁剪框默认高度，即整个画布高度
	let { x = 0, y = 0, width = boundWidth, height = boundHeight } = self.cut

	self.updateCanvas = () => {
		if (self.croperTarget) {
			//  画布绘制图片
			self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight)
		}
		typeof self.onBeforeDraw === 'function' && self.onBeforeDraw(self.ctx, self)

		self.setBoundStyle() //	设置边界样式
		self.ctx.draw()
		return self
	}

	self.pushOrign = (src) => {
		self.src = src

		typeof self.onBeforeImageLoad === 'function' && self.onBeforeImageLoad(self.ctx, self)

		wx.getImageInfo({
			src,
			success (res) {
				let innerAspectRadio = res.width / res.height

				self.croperTarget = res.path

				console.log(x, y)
				if (innerAspectRadio < width / height) {
					self.rectX = x
					self.baseWidth = width
					self.baseHeight = width / innerAspectRadio
					self.rectY = y - Math.abs((height - self.baseHeight) / 2)
				} else {
					self.rectY = y
					self.baseWidth = height * innerAspectRadio
					self.baseHeight = height
					self.rectX = x - Math.abs((width - self.baseWidth) / 2)
				}


				self.imgLeft = self.rectX
				self.imgTop = self.rectY
				self.scaleWidth = self.baseWidth
				self.scaleHeight = self.baseHeight

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
				let { quality = 10 } = args[0]

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
					x,
					y,
					width,
					height,
					destWidth: width / deviceRadio,
					destHeight: height / deviceRadio,
					success (res) {
						typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath)
					}
				}); break
		}

		return self
	}
}
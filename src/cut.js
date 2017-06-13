/**
 * Created by sail on 1017/6/12.
 */
export default function cut() {
	const self = this
	const { deviceRadio } = self
	const boundWidth = self.width // 裁剪框默认宽度，即整个画布宽度
	const boundHeight = self.height
	// 裁剪框默认高度，即整个画布高度
	let { x = 0, y = 0, width = boundWidth, height = boundHeight } = self.cut

	/**
	 * 设置边界
	 * @param imgLeft 图片左上角横坐标值
	 * @param imgTop 图片左上角纵坐标值
	 */
	self.outsideBound = (imgLeft, imgTop) => {
		self.imgLeft = imgLeft >= x
			? x
			: self.scaleWidth + imgLeft - x <= width
			? x + width - self.scaleWidth
			:	imgLeft

		self.imgTop = imgTop >= y
			? y
			: self.scaleHeight + imgTop - y <= height
			? y + height - self.scaleHeight
			: imgTop
	}

	/**
	 * 设置边界样式
	 * @param color	边界颜色
	 */
	self.setBoundStyle = ({ color = '#04b00f', mask = 'rgba(0, 0, 0, 0.3)', lineWidth = 1 } = {}) => {

		// 绘制半透明层
		self.ctx.beginPath()
		self.ctx.setFillStyle(mask)
		self.ctx.fillRect(0, 0, x, boundHeight)
		self.ctx.fillRect(x, 0, width, y)
		self.ctx.fillRect(x, y + height, width, boundHeight - y - height)
		self.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight)
		self.ctx.fill()

		// 设置边界左上角样式
		// 为使边界样式处于边界外边缘，此时x、y均要减少lineWidth
		self.ctx.beginPath()
		self.ctx.setStrokeStyle(color)
		self.ctx.setLineWidth(lineWidth)
		self.ctx.moveTo(x - lineWidth, y + 10 - lineWidth)
		self.ctx.lineTo(x - lineWidth, y - lineWidth)
		self.ctx.lineTo(x + 10 - lineWidth, y - lineWidth)
		self.ctx.stroke()

		// 设置边界左下角样式
		// 为使边界样式处于边界外边缘，此时x要减少lineWidth、y要增加lineWidth
		self.ctx.beginPath()
		self.ctx.setStrokeStyle(color)
		self.ctx.setLineWidth(lineWidth)
		self.ctx.moveTo(x - lineWidth, y + height - 10 + lineWidth)
		self.ctx.lineTo(x - lineWidth, y + height + lineWidth)
		self.ctx.lineTo(x + 10 - lineWidth, y + height + lineWidth)
		self.ctx.stroke()

		// 设置边界右上角样式
		// 为使边界样式处于边界外边缘，此时x要增加lineWidth、y要减少lineWidth
		self.ctx.beginPath()
		self.ctx.setStrokeStyle(color)
		self.ctx.setLineWidth(lineWidth)
		self.ctx.moveTo(x + width - 10 + lineWidth, y - lineWidth)
		self.ctx.lineTo(x + width + lineWidth, y - lineWidth)
		self.ctx.lineTo(x + width + lineWidth, y + 10 - lineWidth)
		self.ctx.stroke()

		// 设置边界右下角样式
		// 为使边界样式处于边界外边缘，此时x、y均要增加lineWidth
		self.ctx.beginPath()
		self.ctx.setStrokeStyle(color)
		self.ctx.setLineWidth(lineWidth)
		self.ctx.moveTo(x + width + lineWidth, y + height - 10 + lineWidth)
		self.ctx.lineTo(x + width + lineWidth, y + height + lineWidth)
		self.ctx.lineTo(x + width - 10 + lineWidth, y + height + lineWidth)
		self.ctx.stroke()
	}
}
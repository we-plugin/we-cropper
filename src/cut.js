export default function cut () {
  const self = this
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
    const boundOption = [
      {
        start: { x: x - lineWidth, y: y + 10 - lineWidth },
        step1: { x: x - lineWidth, y: y - lineWidth },
        step2: { x: x + 10 - lineWidth, y: y - lineWidth }
      },
      {
        start: { x: x - lineWidth, y: y + height - 10 + lineWidth },
        step1: { x: x - lineWidth, y: y + height + lineWidth },
        step2: { x: x + 10 - lineWidth, y: y + height + lineWidth }
      },
      {
        start: { x: x + width - 10 + lineWidth, y: y - lineWidth },
        step1: { x: x + width + lineWidth, y: y - lineWidth },
        step2: { x: x + width + lineWidth, y: y + 10 - lineWidth }
      },
      {
        start: { x: x + width + lineWidth, y: y + height - 10 + lineWidth },
        step1: { x: x + width + lineWidth, y: y + height + lineWidth },
        step2: { x: x + width - 10 + lineWidth, y: y + height + lineWidth }
      }
    ]

    // 绘制半透明层
    self.ctx.beginPath()
    self.ctx.setFillStyle(mask)
    self.ctx.fillRect(0, 0, x, boundHeight)
    self.ctx.fillRect(x, 0, width, y)
    self.ctx.fillRect(x, y + height, width, boundHeight - y - height)
    self.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight)
    self.ctx.fill()

    boundOption.forEach(op => {
      self.ctx.beginPath()
      self.ctx.setStrokeStyle(color)
      self.ctx.setLineWidth(lineWidth)
      self.ctx.moveTo(op.start.x, op.start.y)
      self.ctx.lineTo(op.step1.x, op.step1.y)
      self.ctx.lineTo(op.step2.x, op.step2.y)
      self.ctx.stroke()
    })
  }
}

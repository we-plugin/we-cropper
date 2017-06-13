/**
 * Created by sail on 2017/6/11.
 */
export default function update() {
	const self = this

	if (!self.src) return

	self.__oneTouchStart = (touch) => {
		self.touchX0 = touch.x
		self.touchY0 = touch.y
	}

	self.__oneTouchMove = (touch) => {
		let xMove, yMove
		//计算单指移动的距离
		if (self.touchended) {
			return self.updateCanvas()
		}
		xMove = touch.x - self.touchX0
		yMove = touch.y - self.touchY0

		const imgLeft = self.rectX + xMove
		const imgTop = self.rectY + yMove

		self.outsideBound(imgLeft, imgTop)

		self.updateCanvas()
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
		const { scale, zoom } = self
		// 计算二指最新距离
		xMove = touch1.x - touch0.x
		yMove = touch1.y - touch0.y
		newDistance = Math.sqrt(xMove * xMove + yMove * yMove)

		//  使用0.005的缩放倍数具有良好的缩放体验
		self.newScale =  self.oldScale + 0.001 * zoom * (newDistance - self.oldDistance)

		//  设定缩放范围
		self.newScale <= 1 && (self.newScale = 1)
		self.newScale >= scale && (self.newScale = scale)

		self.scaleWidth = self.newScale * self.baseWidth
		self.scaleHeight = self.newScale * self.baseHeight
		const imgLeft =  self.touchX1 - self.scaleWidth / 2
		const imgTop = self.touchY1 - self.scaleHeight / 2

		self.outsideBound(imgLeft, imgTop)

		self.updateCanvas()
	}

	self.__xtouchEnd = () => {
		self.oldScale = self.newScale
		self.rectX = self.imgLeft
		self.rectY = self.imgTop
	}
}
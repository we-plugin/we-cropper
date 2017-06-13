/**
 * Created by sail on 2017/6/11.
 */
import { getDevice } from './utils'

export default function prepare() {
	const self = this
	const { windowWidth } = getDevice()

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

	self.deviceRadio = windowWidth / 750
}
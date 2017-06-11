/**
 * Created by sail on 2017/6/11.
 */

import { setTouchState } from './utils'

export default {
	//  图片手势初始监测
	touchStart (e) {
		const self = this
		const [touch0, touch1] = e.touches

		setTouchState(self, true, null, null)

		//计算第一个触摸点的位置，并参照改点进行缩放
		self.__oneTouchStart(touch0)

		// 两指手势触发
		if (e.touches.length >= 2) {
			self.__twoTouchStart(touch0, touch1)
		}
	},

	//  图片手势动态缩放
	touchMove (e) {
		const self = this
		const [touch0, touch1] = e.touches

		setTouchState(self, null, true)

		// 单指手势时触发
		if (e.touches.length === 1) {
			self.__oneTouchMove(touch0)
		}
		// 两指手势触发
		if (e.touches.length >= 2) {
			self.__twoTouchMove(touch0, touch1)
		}
	},

	touchEnd (e) {
		const self = this

		setTouchState(self, false, false, true)
		self.__xtouchEnd()
	}
}
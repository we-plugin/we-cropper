/**
 * Created by sail on 2017/6/1.
 */


const __cut_border_color__ = 'green'	//  裁剪框颜色
const __cut_border_width__ = 1  // 裁剪框线条宽度
const __mask_background__ = 'rgba(0, 0, 0, .5)'	// 半透明层背景色


/**
 *
 * @param opt 裁剪框参数
 * @param ctx 画布上下文
 * @param instance wecropper实例
 */
export default (opt = {}, ctx = {}, instance = {}) => {
	const { windowWidth } = instance.getDevice()
	const deviceRadio = windowWidth / 750
	const { width = instance.width * deviceRadio, height = instance.height * deviceRadio} = opt

	// 设置裁剪框颜色
	ctx.setStrokeStyle(__cut_border_color__)
	// 设置半透明层背景色
	ctx.setFillStyle(__mask_background__)
	//  设置裁剪框线条宽度
	ctx.setLineWidth(__cut_border_width__)

	ctx.strokeRect((instance.width * deviceRadio - width) / 2 - 1, (instance.height * deviceRadio - height) / 2 - 1, width + 2, height + 2)

	ctx.fillRect(0, 0, (instance.width * deviceRadio - width) / 2 - 1, instance.height * deviceRadio)
	ctx.fillRect((instance.width * deviceRadio - width) / 2 - 1, 0, width + 2, (instance.height * deviceRadio - height) / 2 - 1)
	ctx.fillRect((instance.width * deviceRadio - width) / 2 - 1, instance.height * deviceRadio - (instance.height * deviceRadio - height) / 2 + 1, width + 2, (instance.height * deviceRadio - height) / 2 - 1)
	ctx.fillRect(instance.width * deviceRadio - (instance.width * deviceRadio - width) / 2 + 1, 0, (instance.width * deviceRadio - width) / 2 - 1, instance.height * deviceRadio)
}
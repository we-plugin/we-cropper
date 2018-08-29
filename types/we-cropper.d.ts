import {
  Options
} from './options'

import {
  Wx,
  EventHandle
} from './wx'

export as namespace WeCropper;

export { WeCropper }

export default WeCropper

/**
 * we-cropper类
 */
declare class WeCropper {
  /**
   * 构造方法
   */
  constructor (option: Options.ConstructorOption);
  /**
   * 更新画布视图
   */
  updateCanvas(): any;
  /**
   * 载入图片
   */
  pushOrign(src: string): any;
  /**
   * 获取裁剪图片（base64编码）
   */
  getCropperBase64(callback: (base64: string) => void): any;
  /**
   * 获取裁剪图片
   */
  getCropperImage(callback: (src: string) => void, opt?: { quality: number }): any;
  /**
   * 事件监听
   */
  on(event: 'ready' | 'load' | 'beforeDraw', callback: (ctx: Wx.CanvasContext) => void): any;
  /**
   * 接收（手指触摸动作开始）事件对象
   * @param e 
   */
  touchStart(e: EventHandle.CanvasEventHandle): any;
  /**
   * 接收（手指触摸后移动）事件对象
   * @param e 
   */
  touchMove(e: EventHandle.CanvasEventHandle): any;
  /**
   * 接收（手指触摸动作结束）事件对象
   * @param e 
   */
  touchEnd(e: EventHandle.CanvasEventHandle): any;
}
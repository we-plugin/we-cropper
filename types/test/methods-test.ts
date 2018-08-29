import {
  Wx,
  EventHandle
} from '../wx'
import WeCropper from '../we-cropper'
// 图片源
const URL: string = 'https://static.smartisanos.cn/os/assets/images/onestep-logo@2x.e035bc6a7fbf6f6a5986c4349a6c9a7e.png'
// 裁剪图路径
let cropperImage: string
// 裁剪base64
let cropperImageBase64: string
// canvas上下文
let canvasContext: Wx.CanvasContext
// 触摸事件对象
let e: EventHandle.CanvasEventHandle = {
  type: 'touchstart',
  timeStamp: 1535559158996,
  target: {
    id: 'cropper',
    tagName: 'canvas',
    dataset: {}
  },
  currentTarget: {
    id: 'cropper',
    tagName: 'canvas',
    dataset: {}
  },
  touches: [{identifier: 1, x: 0, y: 0}, { identifier: 1, x: 150, y: 150}],
  changedTouches: [{identifier: 1, x: 0, y: 0}, { identifier: 1, x: 150, y: 150}]
}

const wecropper = new WeCropper({
  id: 'cropper'
})

// 接收（手指触摸动作开始）事件对象
wecropper.touchStart(e)

// 接收（手指触摸后移动）事件对象
wecropper.touchMove(e)

// 接收（手指触摸动作结束）事件对象
wecropper.touchEnd(e)

// 载入图片
wecropper.pushOrign(URL)

// 更新画布视图
wecropper.updateCanvas()

// 获取画布图片
wecropper.getCropperImage(src => {
  cropperImage = src 
})

// 获取裁剪图片（base64编码
wecropper.getCropperBase64(src => {
  cropperImageBase64 = src
})

// 事件监听
wecropper.on('ready', ctx => {
  canvasContext = ctx
  canvasContext.shadowColor = '#000000'
})

wecropper.on('load', ctx => {
  canvasContext = ctx
  canvasContext.shadowColor = '#000000'
})

wecropper.on('beforeDraw', ctx => {
  canvasContext = ctx
  canvasContext.shadowColor = '#000000'
})

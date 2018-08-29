import WeCropper from '../we-cropper'

new WeCropper({
  id: 'cropper'
})

new WeCropper({
  id: 'cropper',
  cut: {
    // empty cut option
  }
})

new WeCropper({
  id: 'cropper',
  // 设置裁剪区域
  cut: {
    x: 0,
    y: 0,
    width: 250,
    height: 250
  }
})

new WeCropper({
  id: 'cropper',
  // 设置容器宽度
  width: 375,
  // 设置容器高度
  height: 500,
  // 最大缩放系数
  scale: 2.5
})

// 事件
new WeCropper({
  id: 'cropper',
  onReady (ctx) {
    console.log(`weCropper is ready`)
    console.log(`current canvas context:`, ctx)
  },
  onLoad (ctx) {
    console.log(`picture loaded`)
    console.log(`current canvas context:`, ctx)
  },
  onBeforeDraw (ctx) {
    console.log(`before canvas draw,i can do something`)
    console.log(`current canvas context:`, ctx)
      //  那就尝试在图片上加个水印吧
    ctx.setFontSize(14)
    ctx.setFillStyle('#ffffff')
    ctx.fillText('@we-cropper', 265, 350)
  }
})
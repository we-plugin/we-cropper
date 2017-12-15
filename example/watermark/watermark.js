import WeCropper from '../we-cropper/we-cropper.js'

const WATERMARK_FONT = '@we-cropper'
const device = wx.getSystemInfoSync()

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width: device.windowWidth,
      height: device.windowWidth,
      scale: 2.5,
      zoom: 8
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage () {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  uploadTap () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad (option) {
    const { cropperOpt } = this.data

    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
        //  那就尝试在图片上加个水印吧
        // ctx.drawImage(path, 50, 50, 50, 30)
        ctx.setFontSize(14)
        ctx.setFillStyle('#ffffff')
        ctx.fillText(WATERMARK_FONT, 265, 350)
      })
  }
})

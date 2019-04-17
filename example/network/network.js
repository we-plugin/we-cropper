import WeCropper from '../we-cropper/we-cropper.js'

const NETWORK_IMG_URL = 'https://static.smartisanos.cn/os/assets/images/onestep-logo@2x.e035bc6a7fbf6f6a5986c4349a6c9a7e.png'
const device = wx.getSystemInfoSync()
Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width: device.windowWidth,
      height: device.windowWidth,
      scale: 2.5
    }
  },
  touchStart (e) {
    this.cropper.touchStart(e)
  },
  touchMove (e) {
    this.cropper.touchMove(e)
  },
  touchEnd (e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage () {
    this.cropper.getCropperImage(function (path, err) {
      if (err) {
        wx.showModal({
          title: '温馨提示',
          content: err.message
        })
      } else {
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [path] // 需要预览的图片http链接列表
        })
      }
    })
  },
  uploadTap () {
    this.cropper.pushOrign(NETWORK_IMG_URL)
  },
  onLoad (option) {
    const { cropperOpt } = this.data

    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`weCropper is ready`)
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
  }
})

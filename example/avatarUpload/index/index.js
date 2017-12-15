/**
 * Created by sail on 2017/4/14.
 */
Page({
  data: {
    src: ''
  },
  upload () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  },
  onLoad (option) {
    let { avatar } = option
    if (avatar) {
      this.setData({
        src: avatar
      })
    }
  }
})

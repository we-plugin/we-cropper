import WeCropper from 'we-cropper'

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    options: {
      type: Object,
      value: {}
    }
  },
  attached() {
    if (this.properties.options) {
      this.init()
    } else {
      console.warn(
        '[miniprogram-cropper] ' +
        '请传入options参数\n参数配置见文档：' +
        'https://we-plugin.github.io/we-cropper/#/api'
      )
    }
  },
  methods: {
    init() {
      const {
        id,
        targetId
      } = this.properties.options
      const option = Object.assign(this.properties.options, {
        ctx: wx.createCanvasContext(id, this),
        targetCtx: wx.createCanvasContext(targetId, this)
      })

      this.__wecropper__ = new WeCropper(option)
    },
    // 这里是一个自定义方法
    touchStart(e) {
      this.__wecropper__.touchStart(e)
    },

    touchMove(e) {
      this.__wecropper__.touchMove(e)
    },

    touchEnd(e) {
      this.__wecropper__.touchEnd(e)
    },

    pushOrign(src) {
      this.__wecropper__.pushOrign(src)
    },

    updateCanvas() {
      this.__wecropper__.updateCanvas()
    },

    getCropperBase64(fn) {
      return this.__wecropper__.getCropperBase64(fn)
    },

    getCropperImage(opt, fn) {
      const option = Object.assign({
        // 传入自定义组件上下文
        componentContext: this,
      }, opt)
      return this.__wecropper__.getCropperImage(option, fn)
    }
  }
})

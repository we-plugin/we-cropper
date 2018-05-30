<template>
  <canvas
      v-if="_canvasId"
      :canvasId="_canvasId"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      disable-scroll
      :style="{ width: _width + 'px', height: _height + 'px', background: 'rgba(0, 0, 0, .8)' }">
  </canvas>
</template>

<script>
  import WeCropper from 'we-cropper'

  let _wecropper

  export default {
    name: 'mpvue-cropper',
    props: {
      option: {
        type: Object
      }
    },
    computed: {
      _canvasId () {
        return this.option.id
      },
      _width () {
        return this.option.width
      },
      _height () {
        return this.option.height
      }
    },
    methods: {
      touchstart ($event) {
        _wecropper.touchStart($event.mp)
      },
      touchmove ($event) {
        _wecropper.touchMove($event.mp)
      },
      touchend ($event) {
        _wecropper.touchEnd($event.mp)
      },
      pushOrigin (src) {
        _wecropper.pushOrign(src)
      },
      updateCanvas () {
        _wecropper.updateCanvas()
      },
      getCropperBase64 () {
        return new Promise((resolve, reject) => {
          _wecropper.getCropperImage(src => {
            src ? resolve(src) : reject()
          })
        })
      },
      getCropperImage () {
        return new Promise((resolve, reject) => {
          _wecropper.getCropperImage(src => {
            src ? resolve(src) : reject()
          })
        })
      },
      init () {
        _wecropper = new WeCropper(Object.assign(this.option, {
          id: this._canvasId
        }))
        .on('ready', (...args) => {
          this.$emit('ready', ...args)
        })
        .on('beforeImageLoad', (...args) => {
          this.$emit('beforeImageLoad', ...args)
        })
        .on('imageLoad', (...args) => {
          this.$emit('imageLoad', ...args)
        })
        .on('beforeDraw', (...args) => {
          this.$emit('beforeDraw', ...args)
        })
        .updateCanvas()
      }
    },
    onLoad () {
      if (!this.option) {
        return console.warn('[mpvue-cropper] 请传入option参数\n参数配置见文档：https://we-plugin.github.io/we-cropper/#/api')
      }
      this.init()
    }
  }
</script>
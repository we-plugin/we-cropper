<template>
<div>
  <canvas
      v-if="_canvasId"
      :canvasId="_canvasId"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      disable-scroll
      :style="{ width: _width + 'px', height: _height + 'px', background: 'rgba(0, 0, 0, .8)' }">
  </canvas>
  <canvas
    v-if="_targetId"
    :canvas-id="_targetId"
    disable-scroll
    :style="{
      position: 'fixed',
      top: -_width * _pixelRatio + 'px',
      left: -_height * _pixelRatio + 'px',
      width: _width * _pixelRatio + 'px',
      height: _height * _pixelRatio + 'px'
    }">
  </canvas>
</div>
</template>

<script>
  import WeCropper from 'we-cropper'

  export default {
    name: 'mpvue-cropper',
    props: {
      option: {
        type: Object
      }
    },
    data () {
      return {
        _wecropper: null
      }
    },
    computed: {
      _canvasId () {
        return this.option.id
      },
      _targetId () {
        return this.option.targetId
      },
      _width () {
        return this.option.width
      },
      _height () {
        return this.option.height
      },
      _pixelRatio () {
        return this.option.pixelRatio
      }
    },
    methods: {
      touchstart ($event) {
        this._wecropper.touchStart($event.mp)
      },
      touchmove ($event) {
        this._wecropper.touchMove($event.mp)
      },
      touchend ($event) {
        this._wecropper.touchEnd($event.mp)
      },
      pushOrigin (src) {
        this._wecropper.pushOrign(src)
      },
      updateCanvas () {
        this._wecropper.updateCanvas()
      },
      getCropperBase64 () {
        return new Promise((resolve, reject) => {
          this._wecropper.getCropperImage(src => {
            src ? resolve(src) : reject()
          })
        })
      },
      getCropperImage () {
        return new Promise((resolve, reject) => {
          this._wecropper.getCropperImage(src => {
            src ? resolve(src) : reject()
          })
        })
      },
      init () {
        this._wecropper = new WeCropper(Object.assign(this.option, {
          id: this._canvasId,
          targetId: this._targetId,
          pixelRatio: this._pixelRatio
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
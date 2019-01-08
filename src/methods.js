import {
  isFunc,
  isPlainObject
} from './utils/tools'
import {
  draw,
  getImageInfo,
  canvasToTempFilePath
} from './utils/promisify'
import CanvasToBase64 from './utils/canvas2base64'

export default function methods () {
  const self = this

  const boundWidth = self.width // 裁剪框默认宽度，即整个画布宽度
  const boundHeight = self.height // 裁剪框默认高度，即整个画布高度

  const {
    id,
    targetId,
    pixelRatio
  } = self

  let {
    x = 0,
    y = 0,
    width = boundWidth,
    height = boundHeight
  } = self.cut

  self.updateCanvas = (done) => {
    if (self.croperTarget) {
      //  画布绘制图片
      self.ctx.drawImage(
        self.croperTarget,
        self.imgLeft,
        self.imgTop,
        self.scaleWidth,
        self.scaleHeight
      )
    }
    isFunc(self.onBeforeDraw) && self.onBeforeDraw(self.ctx, self)

    self.setBoundStyle(self.boundStyle) //	设置边界样式

    self.ctx.draw(false, done)
    return self
  }

  self.pushOrign = (src) => {
    self.src = src

    isFunc(self.onBeforeImageLoad) && self.onBeforeImageLoad(self.ctx, self)

    return getImageInfo({ src })
      .then(res => {
        let innerAspectRadio = res.width / res.height
        let customAspectRadio = width / height

        self.croperTarget = res.path

        if (innerAspectRadio < customAspectRadio) {
          self.rectX = x
          self.baseWidth = width
          self.baseHeight = width / innerAspectRadio
          self.rectY = y - Math.abs((height - self.baseHeight) / 2)
        } else {
          self.rectY = y
          self.baseWidth = height * innerAspectRadio
          self.baseHeight = height
          self.rectX = x - Math.abs((width - self.baseWidth) / 2)
        }

        self.imgLeft = self.rectX
        self.imgTop = self.rectY
        self.scaleWidth = self.baseWidth
        self.scaleHeight = self.baseHeight

        self.update()

        return new Promise((resolve) => {
          self.updateCanvas(resolve)
        })
      })
      .then(() => {
        isFunc(self.onImageLoad) && self.onImageLoad(self.ctx, self)
      })
  }

  self.getCropperBase64 = (done = () => {}) => {
    CanvasToBase64.convertToBMP({
      canvasId: id,
      x,
      y,
      width,
      height
    }, done)
  }

  self.getCropperImage = (...args) => {
    const customOptions = args[0]
    const fn = args[args.length - 1]

    let canvasOptions = {
      canvasId: id,
      x: x,
      y: y,
      width: width,
      height: height
    }

    let task = () => Promise.resolve()

    if (
      isPlainObject(customOptions) &&
      customOptions.original
    ) {
      // original mode
      task = () => {
        self.targetCtx.drawImage(
          self.croperTarget,
          self.imgLeft * pixelRatio,
          self.imgTop * pixelRatio,
          self.scaleWidth * pixelRatio,
          self.scaleHeight * pixelRatio
        )

        canvasOptions = {
          canvasId: targetId,
          x: x * pixelRatio,
          y: y * pixelRatio,
          width: width * pixelRatio,
          height: height * pixelRatio
        }

        return draw(self.targetCtx)
      }
    }

    return task()
      .then(() => {
        if (isPlainObject(customOptions)) {
          canvasOptions = Object.assign({}, canvasOptions, customOptions)
        }
        return canvasToTempFilePath(canvasOptions)
      })
      .then(res => {
        const tempFilePath = res.tempFilePath

        isFunc(fn) && fn.call(self, tempFilePath)
        return tempFilePath
      })
      .catch(() => {
        isFunc(fn) && fn.call(self, null)
      })
  }
}

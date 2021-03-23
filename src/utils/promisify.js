export function wxPromise (fn) {
  return function (obj = {}, ...args) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (err) {
        reject(err)
      }
      fn(obj, ...args)
    })
  }
}

export function draw (ctx, reserve = false) {
  return new Promise((resolve) => {
    ctx.draw && ctx.draw(reserve, resolve)
  })
}

export const getImageInfo = wxPromise(wx.getImageInfo)

export const canvasToTempFilePath = wxPromise(wx.canvasToTempFilePath)

export const loadCanvasImage = (context, src) => {
  return new Promise((resolve, reject) => {
    if (context.type === '2d') {
      const img = context.canvas.createImage()
      img.onload = () => {
        resolve(img)
      }
      img.onerror = (e) => {
        reject(e)
      }
      img.src = src
    } else {
      resolve(src)
    }
  })
}

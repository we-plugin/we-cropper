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
    ctx.draw(reserve, resolve)
  })
}

export const getImageInfo = wxPromise(wx.getImageInfo)

export const canvasToTempFilePath = wxPromise(wx.canvasToTempFilePath)

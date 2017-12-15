const cut = require('../src/cut').default
const assert = require('assert')

describe('cut', function () {
  const self = {}
  self.cut = {
    x: 30,
    y: 30,
    width: 100,
    height: 100
  }
  // init cut.js
  cut.apply(self)

  describe('outsideBound', function () {
    // 检查outsideBound方法是否已经bind到实例上
    it('outsideBound funtion exist', function () {
      const type = toString.call(self.outsideBound)
      assert.equal(type, '[object Function]')
    })

    // 测试outsideBound
    it('outsideBound functionality', function () {
      // 左边界处理
      let imgLeft
      let imgTop

      self.scaleWidth = 120
      self.scaleHeight = 120

      // 超出左边界
      imgLeft = 40
      imgTop = 30
      self.outsideBound.apply(self, [imgLeft, imgTop])

      assert.equal(self.imgLeft, self.cut.x)

      // 未超出左边界， 超出右边界
      imgLeft = 0
      self.outsideBound.apply(self, [imgLeft, imgTop])

      assert.equal(self.imgLeft, self.cut.width + self.cut.x - self.scaleWidth)

      // 未超出左边界，未超出右边界
      imgLeft = 15
      self.outsideBound.apply(self, [imgLeft, imgTop])

      assert.equal(self.imgLeft, imgLeft)

      // 超出上边界
      imgTop = 40

      self.outsideBound.apply(self, [imgLeft, imgTop])

      assert.equal(self.imgTop, self.cut.y)

      // 未超出上边界，超出下边界
      imgTop = 0
      self.outsideBound.apply(self, [imgLeft, imgTop])

      assert.equal(self.imgTop, self.cut.height + self.cut.y - self.scaleHeight)

      // 未超出上边界，未超出下边界
      imgTop = 15
      self.outsideBound.apply(self, [imgLeft, imgTop])

      assert.equal(self.imgTop, imgTop)
    })
  })
})

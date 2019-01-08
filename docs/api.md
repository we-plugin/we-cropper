## API

### 构造器参数

#### id

- Type: `String`
- Default: `-`

用于手势操作的canvas组件标识符（必填）

#### targetId

- Type: `String`
- Default: ```-```

用于生成截图的canvas组件标识符（必填）

#### pixelRatio

- Type: `Number`
- Default: ```wx.getSystemInfoSync().pixelRatio```

设备像素比 （必填）

#### width

- Type: `Number`
- Default: `-`

容器宽度，单位：px

#### height

- Type: `Number`
- Default: `-`

容器高度，单位：px

#### scale

- Type: `Number`
- Default: `2.5`

最大缩放倍数

#### src

- Type: `String`
- Default: `-`

需裁剪的图片资源

#### zoom

- Type: `Number`
- Default: `5`
- Range: 1 ~ 10

缩放系数

#### cut

- Type: `Object`
- Options: 
    - x: `Number` 裁剪框x轴起点（默认 0）
    - y: `Number` 裁剪框y轴起点（默认 0）
    - width: `Number` 裁剪框宽度（默认 画布宽度），单位：px
    - height: `Number` 裁剪框高度（默认 画布高度），单位：px

#### boundStyle

- Type: `Object`
- Options: 
    - color: `String` 裁剪框颜色（默认 ```#04b00f```）
    - lineWidth: `Number` 裁剪框线条宽度（默认 1）
    - mask: `String` 遮罩层颜色（默认 ```rgba(0, 0, 0, 0.3)```）

#### onReady

- Type: `Function`
- Params:
    - `ctx`: 返回当前画布的上下文
    - `instance`: 返回weCropper实例
- Example: 参考示例1-1

钩子函数：weCropper实例化后会立即执行

#### onLoad

- Type: `Function`
- Params:
    - `ctx`: 返回当前画布的上下文
    - `instance`: 返回weCropper实例
- Example: 参考示例1-1

钩子函数：图片加载完毕后会立即执行

#### onBeforeDraw

- Type: `Function`
- Params:
    - `ctx`: 返回当前画布的上下文
    - `instance`: 返回weCropper实例
- Example: 参考示例1-1

钩子函数：在画布绘制之前执行

> 示例 1-1

```javascript
    new weCropper({
      id: 'cropper',
      onReady (ctx) {
      	console.log(`weCropper is ready`)
      	console.log(`current canvas context:`, ctx)
      	wx.showToast({
      		title: '上传中',
            icon: 'loading',
            duration: 20000
      	})
      },
      onLoad (ctx) {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      },
      onBeforeDraw (ctx) {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      	//  那就尝试在图片上加个水印吧
        ctx.setFontSize(14)
        ctx.setFillStyle('#ffffff')
        ctx.fillText('@we-cropper', 265, 350)
      }
    })

```



### 方法

#### wecropper.updateCanvas()

更新画布视图

#### wecropper.pushOrign(src)

- src:
    - Type: `String`

载入图片

#### wecropper.getCropperImage(opt,callback)

- opt: (可选参数)
    - Type: `Object`
    - Options:
        - original `Boolean` 是否使用原图模式（默认值 `false`） `v1.3.3支持` 
        - quality `Number` 图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。`v1.3.3支持` 
        - fileType `String` 目标文件的类型  `v1.3.3支持` 

- callback:
    - Type: `Function`
    - Params:
        - `src`: 裁剪后的图片路径

- return：
    - Type: `Promise`
        
获取画布图片

> 示例 2-1

```javascript
// 通过 then 链式调用
this.wecropper.getCropperImage()
  .then((src) => {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  })
  .catch(() => {
    console.log('获取图片地址失败，请稍后重试')
  })

// 亦可通过回调函数
this.wecropper.getCropperImage(tempFilePath => {
  if (tempFilePath) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  } else {
    console.log('获取图片地址失败，请稍后重试')
  }
})
```

#### wecropper.getCropperBase64(callback)

!> 基础库 1.9.0 开始支持，低版本需做兼容处理 

- callback:
    - Type: `Function`
    - Params:
        - `base64`: 裁剪后的图片（base64编码）
        
获取裁剪图片（base64编码）
        
#### wecropper.on(event, callback)

- event:
    - Type: `String`
    - Range: `ready、beforeImageLoad、imageLoad、beforeDraw`
    
- callback:
    - Type: `Function`
    - Params:
        - `ctx`: 返回当前画布的上下文
    - Example: 参考示例2-1
    
事件监听

#### wecropper.touchStart(e)

- e:
    - Type: `Object`

接收（手指触摸动作开始）事件对象

#### wecropper.touchMove(e)

- e:
    - Type: `Object`

接收（手指触摸后移动）事件对象

#### wecropper.touchEnd(e)

- e:
    - Type: `Object`

接收（手指触摸动作结束）事件对象


> 示例 3-1

```javascript
    new weCropper({
      id: 'cropper'
    })
    .on('ready', (ctx) => {
      console.log(`weCropper is ready`)
      console.log(`current canvas context:`, ctx)
      wx.showToast({
        title: '上传中',
        icon: 'loading',
        duration: 20000
      })
    })
    .on('load', (ctx) => {
      console.log(`picture loaded`)
      console.log(`current canvas context:`, ctx)
      wx.hideToast()
    })
    .on('beforeDraw', (ctx) => {
      console.log(`before canvas draw,i can do something`)
      console.log(`current canvas context:`, ctx)
      //  那就尝试在图片上加个水印吧
      ctx.setFontSize(14)
      ctx.setFillStyle('#ffffff')
      ctx.fillText('@we-cropper', 265, 350)
    })

```


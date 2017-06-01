## API

### 构造器参数

#### id

- Type: `String`
- Default: `-`

canvas组件标识符

#### width

- Type: `Number`
- Default: `-`

裁剪图片区域宽度

#### height

- Type: `Number`
- Default: `-`

裁剪图片区域高度

#### minScale

- Type: `Number`
- Default: `-`

最小缩放倍数

#### maxScale

- Type: `Number`
- Default: `-`

最大缩放倍数

最小缩放倍数

#### src

- Type: `String`
- Default: `-`

需裁剪的图片资源

#### zoom

- Type: `Number`
- Default: `5`
- Range: 1 ~ 10

缩放系数

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

> 示例1-1

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
        - x	`Number` (非必填) 画布x轴起点（默认0）
        - y	`Number` (非必填) 画布y轴起点（默认0）
        - width	`Number` (非必填) 画布宽度（默认为canvas宽度-x）
        - height	`Number` (非必填) 画布高度（默认为canvas高度-y）
        - quality `Number` (非必填) 输出图片质量（有效范围 0 ～ 10，默认为10）

- callback:
    - Type: `Function`
    - Params:
        - `src`: 裁剪后的图片路径
        
获取画布图片
        
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


> 示例2-1

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


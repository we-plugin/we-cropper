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

#### ready

- Type: `Function`
- Params:
    - `ctx`: 返回当前画布的上下文
    - `instance`: 返回weCropper实例
- Example: 参考示例1-1

#### load

- Type: `Function`
- Params:
    - `ctx`: 返回当前画布的上下文
    - `instance`: 返回weCropper实例
- Example: 参考示例1-1

#### beforeDraw

- Type: `Function`
- Params:
    - `ctx`: 返回当前画布的上下文
    - `instance`: 返回weCropper实例
- Example: 参考示例1-1

示例1-1

```javascript
    new weCropper({
      id: 'cropper',
      ready: function (ctx) {
      	console.log(`weCropper is ready`)
      	console.log(`current canvas context: ${ctx}`)
      	wx.showToast({
      		title: '上传中',
            icon: 'loading',
            duration: 20000
      	})
      },
      load: function (ctx) {
      	console.log(`picture loaded`)
        console.log(`current canvas context: ${ctx}`)
        wx.hideToast()
      },
      beforeDraw: function (ctx) {
      	console.log(`before canvas draw,i can do something`)
      	console.log(`current canvas context: ${ctx}`)
      	//  那就尝试在图片上加个水印吧
      	ctx.setFontSize(20)
        ctx.setFillStyle('#ffffff')
        ctx.fillText('@dlhandsome', 200, 200)
      }
    })

```



### 方法

#### wecropper.getCropperImage(callback)

- callback:
    - Type: `Function`
    - Params:
        - `src`: 裁剪后的图片路径
        
#### wecropper.on(event, callback)

- event:
    - Type: `String`
    - Range: `ready、load、beforeDraw`
    
- callback:
    - Type: `Function`
    - Params:
        - `ctx`: 返回当前画布的上下文


示例2-1

```javascript
    new weCropper({
      id: 'cropper',
      ready: ,
      load: ,
      beforeDraw: 
    })
    .on('ready', function (ctx) {
      console.log(`weCropper is ready`)
      console.log(`current canvas context: ${ctx}`)
      wx.showToast({
        title: '上传中',
        icon: 'loading',
        duration: 20000
      })
    })
    .on('load', function (ctx) {
      console.log(`picture loaded`)
      console.log(`current canvas context: ${ctx}`)
      wx.hideToast()
    })
    .on('beforeDraw', function (ctx) {
      console.log(`before canvas draw,i can do something`)
      console.log(`current canvas context: ${ctx}`)
      //  那就尝试在图片上加个水印吧
      ctx.setFontSize(20)
      ctx.setFillStyle('#ffffff')
      ctx.fillText('@dlhandsome', 200, 200)
    })

```


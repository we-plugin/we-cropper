# 微信小程序图片裁剪工具we-cropper

一款灵活小巧的canvas图片裁剪器

<img src="https://github.com/dlhandsome/we-cropper/blob/master/screenshots/code.jpg?raw=true" width="100%"></img>

## 使用说明

*** 克隆项目到你的目录 ***
```bash
cd my-project
git clone https://github.com/dlhandsome/we-cropper.git
cd we-cropper
```

*** 微信开发者工具 ***

!> 工具库使用了ES6语法，需要开启ES6转ES5

<img src="https://github.com/dlhandsome/we-cropper/blob/master/screenshots/wxTool.jpg?raw=true" width="100%"></img>

## 示例

*** WXML ***

> 首先需要在WXML结构中置入一个canvas作为裁剪图片的容器，并绑定相应的事件句柄。

!> 需要注意的是，canvas的宽高（width、height）需要和we-cropper构造器参数中的保持一致

```html
<view class="croper-wrapper">
    <canvas
            class="cropper"
            disable-scroll="true"
            bindtouchstart="touchStart"
            bindtouchmove="touchMove"
            bindtouchend="touchEnd"
            style="width:{{width}}rpx;height:{{height}}rpx;"
            canvas-id="cropper">
    </canvas>
    <view class="classname">
        <view
                class="upload"
                bindtap="uploadTap">
            上传图片
        </view>
        <view
                class="getCropperImage"
                bindtap="getCropperImage">
            生成图片
        </view>
    </view>
</view>

```
> 引入weCropper插件

```javascript
import weCropper from '../../src/weCropper.core.js'
```

> 将构造器参数注册在data中

```javascript
    data: {
		id: 'cropper',
		width: 750,
		height: 750,
		minScale: 1,
		maxScale: 2.5,
		zoom: 8
	}
```

> 推荐在页面onLoad函数中实例化weCropper

```javascript
    //...
    onLoad (option) {
        const { data } = this
    
        new weCropper(data)
            .on('ready', (ctx) => {
                console.log(`wecropper is ready for work!`)
            })
            .on('beforeImageLoad', (ctx) => {
                console.log(`before picture loaded, i can do something`)
                console.log(`current canvas context: ${ctx}`)
                wx.showToast({
                    title: '上传中',
                    icon: 'loading',
                    duration: 20000
                })
            })
            .on('imageLoad', (ctx) => {
                console.log(`picture loaded`)
                console.log(`current canvas context: ${ctx}`)
                wx.hideToast()
            })
    }
   
```

> 事件绑定

!> wecropper插件通过touchStart、touchMove、touchEnd方法来接收事件对象。

```javascript
      //...
      touchStart (e) {
	    this.wecropper.touchStart(e)
      },
      touchMove (e) {
	    this.wecropper.touchMove(e)
      },
      touchEnd (e) {
	    this.wecropper.touchEnd(e)
      }
      //...

```

!> 有两种方式传入目标图片地址: 
    
+ 实例化时通过构造参数传入 

```javascript
new weCropper({
	// ...
	src: '...',
	// ...
})
```
+ 惰性载入

```javascript
const src = '...'

this.wecropper.pushOrign(src)
```
    
> 上面示例则是惰性载入的方式，当点击上传图片按钮时,获取图片地址，并通过pushOrign方法载入图片

```javascript
    //...
    uploadTap () {
      const self = this
      const { data } = self
    
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success (res) {
          const src = res.tempFilePaths[0]
           //  获取裁剪图片资源后，给data添加src属性及其值
          Object.assign(data, { src })
    
          self.wecropper.pushOrign(src)
        }
      })
    }
```

> 缩放调整画布中的图片直到满意的状态，点击生成图片按钮，导出图片

```javascript
    getCropperImage () {
      this.wecropper.getCropperImage((src) => {
        if (src) {
          wx.previewImage({
            current: '', // 当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
          })
        } else {
          console.log('获取图片地址失败，请稍后重试')
        }
      })
     }
```


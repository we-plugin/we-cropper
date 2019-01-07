# 微信小程序图片裁剪工具we-cropper

[![travis-ci](https://travis-ci.org/we-plugin/we-cropper.svg?branch=master)](https://www.travis-ci.org/we-plugin/we-cropper)
[![npm-version](https://img.shields.io/npm/v/we-cropper.svg)](https://www.npmjs.com/package/we-cropper)

一款灵活小巧的canvas图片裁剪器 [在线体验](https://unpkg.com/we-cropper@1.2.0/docs/assets/online.jpg)

<div align="center">
  <a><img src="https://user-images.githubusercontent.com/16918885/50694060-d6a60a00-1073-11e9-9fd7-bba4ce72df19.png" width="350"/></a>
</div>

## 使用说明

*** 克隆项目至你的目录 ***
```bash
cd my-project
git clone https://github.com/we-plugin/we-cropper.git
cd we-cropper
```

## 示例

*** WXML ***

> 首先需要在WXML结构中置入一个canvas作为裁剪图片的容器，并绑定相应的事件句柄。

!> 需要注意的是，canvas的宽高（width、height）需要和we-cropper构造器参数中的保持一致

```html
<import src="../we-cropper/we-cropper.wxml"/>

<view class="cropper-wrapper">
    <template is="we-cropper" data="{{...cropperOpt}}"/>
    <view class="cropper-buttons">
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
> 引入WeCropper插件

```javascript
    import WeCropper from '../we-cropper/we-cropper.js'
    
    const device = wx.getSystemInfoSync() // 获取设备信息
    const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
    const height = width
    
    Page({
      data: {
      	cropperOpt: {
            id: 'cropper', // 用于手势操作的canvas组件标识符
            targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
            pixelRatio: device.pixelRatio, // 传入设备像素比
            width,  // 画布宽度
            height, // 画布高度
            scale: 2.5, // 最大缩放倍数
            zoom: 8, // 缩放系数
            cut: {
              x: (width - 200) / 2, // 裁剪框x轴起点
              y: (width - 200) / 2, // 裁剪框y轴期起点
              width: 200, // 裁剪框宽度
              height: 200 // 裁剪框高度
            }
      	}
      }
    })
    
	
	//...
```

> 推荐在页面onLoad函数中实例化WeCropper

```javascript
    //...
    onLoad (option) {
        const { cropperOpt } = this.data
        
        this.cropper = this.new WeCropper(cropperOpt)
            .on('ready', (ctx) => {
                console.log(`wecropper is ready for work!`)
            })
            .on('beforeImageLoad', (ctx) => {
                wx.showToast({
                    title: '上传中',
                    icon: 'loading',
                    duration: 20000
                })
            })
            .on('imageLoad', (ctx) => {
                wx.hideToast()
            })
    }
   
```

> 事件绑定

!> 插件通过touchStart、touchMove、touchEnd方法来接收事件对象。

```javascript
      //...
      touchStart (e) {
	    this.cropper.touchStart(e)
      },
      touchMove (e) {
	    this.cropper.touchMove(e)
      },
      touchEnd (e) {
	    this.cropper.touchEnd(e)
      }
      //...

```

有两种方式载入图片: 
    
+ 实例化时载入

!> 当检测到构造参数```src```有值时，会尝试通过 ```wx.getImageInfo```获取图片信息，```src```可以是图片的路径，可以是相对路径、临时文件路径、存储文件路径、网络图片路径，详情见 小程序文档·[wx.getImageInfo](https://developers.weixin.qq.com/miniprogram/dev/api/wx.getImageInfo.html)

```javascript
new weCropper({
	// ...
	src: '...',
	// ...
})
```
+ 先实例化后载入

!> 当检测到通过 ```pushOrign``` 方法传入的值不为空时，会尝试通过 ```wx.getImageInfo```获取图片信息，```src```可以是图片的路径，可以是相对路径、临时文件路径、存储文件路径、网络图片路径，详情见 小程序文档·[wx.getImageInfo](https://developers.weixin.qq.com/miniprogram/dev/api/wx.getImageInfo.html)

1. 实例化 we-cropper，并将实例挂载在 page 上

```javascript
onLoad () {
  this.cropper = new weCropper({
    // ...
  })
}
```
    
2. 点击上传图片按钮后获取图片地址，并通过pushOrign方法载入图片

```javascript
    //...
    uploadTap () {
      const self = this
    
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success (res) {
          const src = res.tempFilePaths[0]
    
          self.cropper.pushOrign(src)
        }
      })
    }
```

> 缩放调整画布中的图片直到满意的状态，点击生成图片按钮，导出图片

```javascript
    getCropperImage () {
      this.wecropper.getCropperImage((tempFilePath) => {
        // tempFilePath 为裁剪后的图片临时路径
        if (tempFilePath) {
          wx.previewImage({
            current: '',
            urls: [tempFilePath]
          })
        } else {
          console.log('获取图片地址失败，请稍后重试')
        }
      })
     }
```

## 遇到问题

+ [Issues](https://github.com/we-plugin/we-cropper/issues)

+ [Pull requests](https://github.com/we-plugin/we-cropper)

+ we-cropper交流群(已超过100人，添加作者微信邀请入群)

<img src="https://github.com/dlhandsome/me/blob/master/we-cropper.qrcode.png?raw=true" width="350">

## 鼓励作者

<img src="https://unpkg.com/we-cropper@1.2.0/docs/assets/appreciate.jpg" width="350" height="350">

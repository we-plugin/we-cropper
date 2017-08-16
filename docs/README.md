# 微信小程序图片裁剪工具we-cropper

一款灵活小巧的canvas图片裁剪器

<img src="https://github.com/we-plugin/we-cropper/blob/master/docs/assets/screenshot.jpg" width="50%"></img>

## 使用说明

*** 克隆项目至你的目录 ***
```bash
cd my-project
git clone https://github.com/dlhandsome/we-cropper.git
cd we-cropper
```

## 示例

*** WXML ***

> 首先需要在WXML结构中置入一个canvas作为裁剪图片的容器，并绑定相应的事件句柄。

!> 需要注意的是，canvas的宽高（width、height）需要和we-cropper构造器参数中的保持一致

```html
<import src="../../dist/weCropper.wxml"/>

<view class="cropper-wrapper">
    <template is="weCropper" data="{{...cropperOpt}}"/>
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
> 引入weCropper插件

```javascript
    import weCropper from 'dist/weCropper'
    
    const device = wx.getSystemInfoSync() // 获取设备信息
    const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
    const height = width
    
    Page({
      data: {
      	cropperOpt: {
            id: 'cropper',
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

> 推荐在页面onLoad函数中实例化weCropper

```javascript
    //...
    onLoad (option) {
        const { cropperOpt } = this.data
        
        // 若同一个页面只有一个裁剪容器，在其它Page方法中可通过this.wecropper访问实例
        new weCropper(cropperOpt)
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
        
        // 若同一个页面由多个裁剪容器，需要主动做如下处理
          
        this.A = new weCropper(cropperOptA)
        this.B = new weCropper(cropperOptB)
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

!> 有两种方式载入图片: 
    
+ 构造参数载入 

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
    
> 示例采用惰性载入的方式：点击上传图片按钮后获取图片地址，并通过pushOrign方法载入图片

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

## 遇到问题

+ [Issues](https://github.com/dlhandsome/we-cropper/issues)

+ [Pull requests](https://github.com/dlhandsome/we-cropper)

+ we-cropper交流群

<img src="assets/wechat.jpg" width="200" height="200">
# miniprogram-cropper

小程序自定义组件：图片裁剪工具

> 使用此组件需要依赖小程序基础库 2.2.1 以上版本，同时依赖开发者工具的 npm 构建。具体详情可查阅[官方 npm 文档]((https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html))

## 安装

```bash
npm install miniprogram-cropper --save
```

## 使用

##### 页面 ```page.json``` 中添加自定义组件

```json
{
  "usingComponents": {
    "miniprogram-cropper": "miniprogram-cropper"
  }
}
```

##### 页面 ```WXML``` 中引用自定义组件

```xml
<miniprogram-cropper id="crop" options="{{cropperOpt}}">
</miniprogram-cropper>
```

## options 属性

参考 [we-cropper 构造参数](https://we-plugin.github.io/we-cropper/#/api?id=%E6%9E%84%E9%80%A0%E5%99%A8%E5%8F%82%E6%95%B0)

## 组件 methods

参考 [we-cropper 方法](https://we-plugin.github.io/we-cropper/#/api?id=%E6%96%B9%E6%B3%95)

#### 如何在页面调用组件内方法

- 获取组件实例

```javascript
onLoad () {
  this.crop = this.selectComponent('#crop')
}
```

- 调用组件内方法

```javascript
// 载入图片
this.crop.pushOrign(tempFilePath)

// 获取裁剪图片
this.crop.getCropperImage()
  .then(function (path) {
    // Todo
  })
```

## 代码示例

**page.wxml**
```xml
<miniprogram-cropper id="crop" options="{{cropperOpt}}"></miniprogram-cropper>

 <view
    class="cropper-buttons" 
    :style="{ color:cropperOpt.boundStyle.color}">
    <view
        class="upload btn"
        bindtap="uploadTap">
        上传图片
    </view>
    <view
        class="getCropperImage btn"
        :style="{ backgroundColor: cropperOpt.boundStyle.color }"
        bindtap="getCropperImage">
        生成图片
    </view>
</view>
```

**page.js**
```javascript
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
    crop: null,
    data: {
        cropperOpt: {
            id: 'cropper',
            targetId: 'targetCropper',
            pixelRatio: device.pixelRatio,
            width,
            height,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (width - 300) / 2,
                y: (height - 300) / 2,
                width: 300,
                height: 300
            },
            boundStyle: {
                color: '#ffffff',
                mask: 'rgba(0,0,0,0.8)',
                lineWidth: 1
            }
        }
    },

    uploadTap () {
        const self = this

        if (this.crop) {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success (res) {
                    const src = res.tempFilePaths[0]
                    //  获取裁剪图片资源后，给data添加src属性及其值
            
                    self.crop.pushOrign(src)
                }
            })
        }
    },

    getCropperImage () {
        this.crop.getCropperImage()
            .then((src) => {
                wx.previewImage({
                current: '', // 当前显示图片的http链接
                urls: [src] // 需要预览的图片http链接列表
                })
            })
            .catch(() => {
                console.log('获取图片地址失败，请稍后重试')
            })
    },

    onLoad () {
        this.crop = this.selectComponent('#crop')

    }
})

```

## LISENCE

MIT License

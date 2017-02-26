# 微信小程序图片裁剪工具we-cropper
## 演示
<img src="https://github.com/dlhandsome/we-cropper/blob/master/example.gif?raw=true" width="25%" height="25%"></img>
## 使用说明
### 克隆项目到你的目录
```bash
cd my-project
git clone https://github.com/dlhandsome/we-cropper.git
```
### 项目目录结构
```
├── example                演示文件夹
|   ├── weCropper.js       演示页面js
|   |── weCropper.json     演示页面配置
|   |── weCropper.wxml     演示页面文档结构
|   └── weCropper.wxss     演示页面样式
├── src                    插件目录
|   └── weCropper.core.js  插件
├── app.js                 小程序配置项（声明钩子）
├── app.json               小程序配置项
├── app.wxss               小程序配置项（全局样式配置）
├── example.gif            演示gif
```
## API

#### weCropper类

使用ES2015中class进行封装，weCropper实例化后，其实例会依附在Page上下文的wecropper属性上，便于在Page钩子函数中访问。

###### 示例

```javascript
    import weCropper from './weCropper.core.js'

    const data = {
      id: 'cropper',
      width: 600,
      height: 600,
      minScale: 1,
      maxScale: 2.5,
      src: ''   // 这里的src需要在用户点击上传图片后获取
    }

    Page({
      data,
      touchStart (e) {
        this.wecropper.touchStart(e)
      },
      touchMove (e) {
        this.wecropper.touchMove(e)
      },
      touchEnd (e) {
        this.wecropper.touchEnd(e)
      },
      getCropperImage () {
        this.wecropper.getCropperImage()
      },
      uploadTap () {
        let self = this
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            let src = res.tempFilePaths[0]
            //  获取裁剪图片资源后，给data添加src属性及其值
            Object.assign(data, { src })
            new weCropper(data)
          }
        })
      },
      onLoad (option) {
        // do something
      }
    })

```

###### weCropper构造器参数

| 属性 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| id | String | - | canvas组件标识符 |
| width | Number | - | 裁剪图片区域宽度 |
| height | Number | - | 裁剪图片区域高度 |
| minScale | Number | - | 最小缩放倍数 |
| maxScale | Number | - | 最大缩放倍数 |
| src | String | - | 需裁剪的图片资源 |

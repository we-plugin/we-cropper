# 微信小程序图片裁剪工具we-cropper

一款灵活小巧的canvas图片裁剪器

<div style="position:relative;width: 100%">
    <img src="https://github.com/we-plugin/we-cropper/blob/master/docs/assets/screenshot.jpg" width="50%" style="position:absolute; left: 50%; transform:translateX(-50%)" />
</div>

## Feature

- 实用的API
- 灵活的钩子函数
- 多场景的demo可供参考：
    - 常规裁剪
    - 上传裁剪头像
    - 裁剪网络图片
    - 添加水印
    - 局部裁剪

## Usage

#### 克隆项目到你的目录
```bash
cd my-project

git clone https://github.com/we-plugin/we-cropper.git
```
####  使用编译后的文件dist/weCropper.js
```javascript
var weCropper = require('dist/weCropper')

// ES6(需在开发工具勾选ES6转ES5)
import weCropper from 'dist/weCropper'
```

#### 对插件进行开发调试
```bash
npm install
```
在src下进行文件修改

```bash
npm run build
```

## Links

[Document](https://dlhandsome.github.io/we-cropper/#/)

[ChangeLog](https://dlhandsome.github.io/we-cropper/#/changelog)

[Example](https://github.com/dlhandsome/we-cropper/tree/master/example)

[The MIT License](http://opensource.org/licenses/MIT)

## Contributing

如果你有好的意见或建议，欢迎提issue或pull request

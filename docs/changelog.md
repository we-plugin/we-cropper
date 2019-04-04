## changelog

### v1.3.4 （2019-04-04）

- `A` 方法 `getCropperImage` 新增参数：`componentContext`（默认值：`false`）

### v1.3.3 （2019-01-08）

- `A` 方法 `getCropperImage` 新增参数：`original`（默认值：`false`）

### v1.3.0 (2019-01-04)

- `A` 新增 『API：构造器参数』`targetId`、`pixelRatio`
- `A` 允许 `getCropperImage` 通过 `then` 链式调用
- `F` 修复 获取裁剪图片模糊问题

注意： 此版本`updateCanvas`方法返回 `Promise` 对象（原返回 we-cropper 实例），如有通过以下方式绑定实例时，会造成异常：

```javascript
this.cropper = new WeCropper(options)
   .on()
   .on()
   .updateCanvas()
```
此问题在 v1.3.2 之后恢复向下兼容

### v1.2.5 (2018-12-19)

- `A` 新增 『API：裁剪框样式参数』boundStyle

### v1.2.0 (2018-01-22)

- ~~自定义Clip方法~~

- 新增 『API：方法』[获取裁剪图片（base64编码）](https://we-plugin.github.io/we-cropper/#/api?id=wecroppergetcropperbase64callback)

### v1.1.5 (2017-11-22)

- `F` 修复 获取裁剪图图片异常时，getCropperImage方法内匿名函数不执行

### v1.1.4 (2017-6-13)

- `F` 修复 图片越界问题 [ISSUE #7](https://github.com/we-plugin/we-cropper/issues/7) [ISSUE #10](https://github.com/we-plugin/we-cropper/issues/10)

- `D` 移除 『API：构造器参数』minScale

- `C` 修改 『API：构造器参数』maxScale -> scale [详情]()

- `C` 构造器参数单位全部统一为px

- `A` 新增 『API：构造器参数』cut [详情]()

### v1.1.3 (2017-6-1)
- ~~`F` 修复 裁剪图片清晰度问题 [ISSUE #4](https://github.com/we-plugin/we-cropper/issues/4)~~

- `A` 丰富接口功能 『API：方法』[获取裁剪图片](https://we-plugin.github.io/we-cropper/#/api?id=wecroppergetcropperimageoptcallback)

### v1.1.2 (2017-5-24)
- `A` 新增 『API：方法』更新canvas视图`updateCanvas` [ISSUE #3](https://github.com/we-plugin/we-cropper/issues/3)

### v1.1.1 (2017-5-7)
- `A` 新增 『API：方法』载入图片`pushOrign`

- `F` 修改 『API：钩子函数』命名 `onReady`、`onBeforeImageLoad`、`onImageLoad`、`onBeforeDraw`

### v1.1.0 (2017-5-6)

- `A` 新增 『API：构造器参数』`zoom`

- `A` 新增 『API：钩子函数』`ready`、`load`、`beforeDraw`

- `A` 新增 『API：方法』 事件监听`on`

- `A` 新增 『示例』裁剪网络图片、给图片加水印

- `F` 修复  网络图片路径、相对路径传入src无法显示图片的bug [ISSUE #2](https://github.com/we-plugin/we-cropper/issues/2)

### v1.0.0 (2017-4-14) 

- `A` 新增『示例』：上传头像案例

- `F` 修复 『API：方法』 裁剪图片获取方式： 

    修改前：

    ```javascript
    this.wecropper.getCropperImage()
    ```

    生成裁剪图并跳转其预览页
    
    修改后：
    
    ```javascript
    this.wecropper.getCropperImage(function (src) {
       console.log(src)
    })
    ```
    生成裁剪图片并返回其路径作为回调参数
    
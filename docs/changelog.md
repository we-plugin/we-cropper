## changelog

### v1.1.2 (2017-5-24)
- `A` 新增 『API：方法』更新canvas视图`updateCanvas`[ISSUE #3](https://github.com/dlhandsome/we-cropper/issues/3)

### v1.1.1 (2017-5-7)
- `A` 新增 『API：方法』载入图片`pushOrign`

- `F` 修改 『API：钩子函数』命名 `onReady`、`onBeforeImageLoad`、`onImageLoad`、`onBeforeDraw`

### v1.1.0 (2017-5-6)

- `A` 新增 『API：构造器参数』`zoom`

- `A` 新增 『API：钩子函数』`ready`、`load`、`beforeDraw`

- `A` 新增 『API：方法』 事件监听`on`

- `A` 新增 『示例』裁剪网络图片、给图片加水印

- `F` 修复  网络图片路径、相对路径传入src无法显示图片的bug[ISSUE #2](https://github.com/dlhandsome/we-cropper/issues/2)

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
    
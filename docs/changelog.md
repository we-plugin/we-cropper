## changelog

### 2017-4-14

- 新增「示例」：上传头像案例

- API： 

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
    
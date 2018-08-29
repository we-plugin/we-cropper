/**
 * 小程序触摸对象
 */
export namespace EventHandle {
  /**
   * 触发事件的源组件
   */
  type BaseEventTarget = {
    id: string;
    tagName: string;
    dataset: object;
  }
  /**
   * 基础事件对象属性
   */
  interface BaseEvent {
    type: string;
    timeStamp: number;
    target: BaseEventTarget;
    currentTarget: BaseEventTarget;
  }
  /**
   * Touch 对象
   */
  type WxmlEventHandleTouch = {
    identifier: number;
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
  }
  /**
   * 普通触摸事件对象
   */
  interface WxmlEventHandle extends BaseEvent {
    touches: Array<WxmlEventHandleTouch>;
    changedTouches: Array<WxmlEventHandleTouch>;
  }
  /**
   * CanvasTouch 对象
   */
  type CanvasEventHandleTouch = {
    identifier: number;
    x: number;
    y: number;
  }
  /**
   * canvas触摸事件对象
   */
  interface CanvasEventHandle extends BaseEvent {
    touches: Array<CanvasEventHandleTouch>;
    changedTouches: Array<CanvasEventHandleTouch>;
  }
}

/**
 * 小程序模块
 */
export namespace Wx {
  /**
   * 小程序canvas上下文
   */
  interface CanvasContext {
    /**
     * 设置填充色, 如果没有设置 fillStyle，默认颜色为 black。
     */
    setFillStyle(color: string): void;
    /**
     * 设置边框颜色, 如果没有设置 fillStyle，默认颜色为 black。
     */
    setStrokeStyle(color: string): void;
    /**
     * 设置阴影
     */
    setShadow(offsetX: number, offsetY: number, blur: number, color: string): void;
    /**
     * 创建一个线性的渐变颜色。需要使用 addColorStop() 来指定渐变点，至少要两个。
     */ 
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): void;
    /**
     * 创建一个圆形的渐变颜色。 起点在圆心，终点在圆环。 需要使用 addColorStop() 来指定渐变点，至少要两个。
     */
    createCircularGradient(x: number, y: number, r: number): void;
    /**
     * 创建一个颜色的渐变点。小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。需要使用 addColorStop() 来指定渐变点，至少要两个。
     */
    addColorStop(stop: number, color: string): void;
    /**
     * 设置线条的宽度
     */
    setLineWidth(lineWidth: number): void;
    /**
     * 设置线条端点的样式
     */
    setLineCap(lineCap: 'butt' | 'round' | 'square'): void;
    /**
     * 设置两线相交处的样式
     */
    setLineJoin(lineJoin: 'bevel' | 'round' | 'miter'): void;
    /**
     * 设置虚线样式的方法
     */
    setLineDash(pattern: Array<number>, offset:number): void;
    /**
     * 设置最大倾斜
     */
    setMiterLimit(miterLimit: number): void;
    /**
     * 添加一个矩形路径到当前路径。
     */
    rect(x: number, y: number, width: number, height: number): void;
    /** 
     * 填充一个矩形。用 setFillStyle() 设置矩形的填充色，如果没设置默认是黑色。
     */
    fillRect(x: number, y: number, width: number, height: number): void;
    /** 
     * 一个矩形(非填充)。用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。
     */
    strokeRect(x: number, y: number, width: number, height: number): void;
    /**
     * 在给定的矩形区域内，清除画布上的像素
     */
    clearRect(x: number, y: number, width: number, height: number): void;
    /**
     * 对当前路径进行填充
     */
    fill(): void;
    /**
     * 对当前路径进行描边
     */
    stroke(): void;
    /**
     * 开始一个路径
     */
    beginPath(): void;
    /**
     * 关闭一个路径
     */
    closePath(): void;
    /**
     * 把路径移动到画布中的指定点，但不创建线条。
     */
    moveTo(x: number, y: number): void;
    /**
     * 添加一个新点，然后在画布中创建从该点到最后指定点的线条。
     */
    lineTo(x: number, y: number): void;
    /**
     * 添加一个弧形路径到当前路径，顺时针绘制。
     */
    arc(x: number, y: number, radius: number, startAngle: number, sweepAngle: number): void;
    /**
     * 创建二次方贝塞尔曲线
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    /**
     * 创建三次方贝塞尔曲线
     */
    bezierCurveTo(cpx1: number, cpy1: number, cpx2: number, cpy2: number, x: number, y: number): void;
    /**
     * 对横纵坐标进行缩放
     */
    scale(scaleWidth: number/**横坐标缩放的倍数1 = 100%，0.5 = 50%，2 = 200%，依次类 */, scaleHeight: number/**	纵坐标轴缩放的倍数1 = 100%，0.5 = 50%，2 = 200%，依次类 */): void;
    /**
     * 对坐标轴进行顺时针旋转
     */
    rotate(deg: number/**degrees * Math.PI/180；degrees范围为0~360;旋转角度，以弧度计 */): void;
    /**
     * 对坐标原点进行缩放
     */
    translate(x: number/**水平坐标平移量 */, y: number/**竖直坐标平移量 */): void;
    /**
     * 从原始画布中剪切任意形状和尺寸
     */
    clip(): void;
    /**
     * 在画布上绘制被填充的文本
     */
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    /**
     * 设置字体大小
     */
    setFontSize(fontSize: number): void;
    /**
     * 用于设置文字的对齐
     */
    setTextAlign(align: 'left' | 'center' | 'right'): void;
    /**
     * 用于设置文字的水平对齐
     */
    setTextBaseline(textBaseline: 'top' | 'bottom' | 'middle' | 'normal'): void;
    /**
     * 在画布上绘制图像
     */
    drawImage(imageResource: string, x: number, y: number, width: number, height: number): void;
    /** 
     * 设置全局画笔透明度。
     */
    setGlobalAlpha(alpha: number): void;
    /**
     * 保存当前坐标轴的缩放、旋转、平移信息
     */
    save(): void;
    /**
     * 恢复之前保存过的坐标轴的缩放、旋转、平移信息
     */
    restore(): void;
    /**
     * 进行绘图
     */
    draw(): void;
    /**
     * 测量文本尺寸信息，目前仅返回文本宽度(同步接口)
     */
    measureText(text: string): number;
    /**
     * 属性是设置要在绘制新形状时应用的合成操作的类型
     */
    globalCompositeOperation(type: string): void;
    /**
     * 根据控制点和半径绘制圆弧路径
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    /**
     * 给定的 (x, y) 位置绘制文本描边的方法
     */
    strokeText(text: string, x: number, y: number, maxWidth: number): void;
    /**
     * 设置虚线偏移量的属性 
     */
    lineDashOffset(value: number): void;
    /**
     * 对指定的图像创建模式的方法，可在指定的方向上重复元图像
     */
    createPattern(image: string, repetition:  'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'):void;
    /**
     * 设置阴影的模糊级别
     */
    shadowBlur: any;
    /**
     * 设置阴影的颜色
     */
    shadowColor: string;
    /**
     * 设置阴影相对于形状在水平方向的偏移
     */
    shadowOffsetX: number;
    /**
     * 设置阴影相对于形状在竖直方向的偏移
     */
    shadowOffsetY: number;
    /**
     * 设置当前字体样式的属性
     */
    font: string;
    /**
     * 使用矩阵多次叠加当前变换的方法
     */
    transform(scaleX: number, skewX: number, skewY: number, scaleY: number, translateX: number, translateY: number): void;
    /**
     * 使用矩阵重新设置（覆盖）当前变换的方法
     */
    setTransform(scaleX: number, skewX: number, skewY: number, scaleY: number, translateX: number, translateY: number): void;
  }
}
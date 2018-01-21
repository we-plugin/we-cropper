/**
 * 获取最新缩放值
 * @param oldScale 上一次触摸结束后的缩放值
 * @param oldDistance 上一次触摸结束后的双指距离
 * @param zoom 缩放系数
 * @param touch0 第一指touch对象
 * @param touch1 第二指touch对象
 * @returns {*}
 */
export const getNewScale = (oldScale, oldDistance, zoom, touch0, touch1) => {
  let xMove, yMove, newDistance
  // 计算二指最新距离
  xMove = Math.round(touch1.x - touch0.x)
  yMove = Math.round(touch1.y - touch0.y)
  newDistance = Math.round(Math.sqrt(xMove * xMove + yMove * yMove))

  return oldScale + 0.001 * zoom * (newDistance - oldDistance)
}

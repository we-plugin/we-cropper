export default class GlobalConfig {
  constructor () {
    this.theme = {
      active: 'green',
      items: [
        {
          color: '#04b00f',
          name: 'green'
        },
        {
          color: '#C20C0C',
          name: 'red'
        },
        {
          color: '#F0C040',
          name: 'yellow'
        }
      ]
    }
  }

  init () {
    const { color } = this.theme.items.find(item => item.name === this.theme.active)

    this.setThemeColor(color)
  }

  setThemeColor (v) {
    wx.setStorageSync('themeColor', v)
  }

  getThemeColor () {
    return wx.getStorageSync('themeColor')
  }
}

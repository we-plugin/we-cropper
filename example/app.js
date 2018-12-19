/**
 * Created by sail on 2017/2/27.
 */
import GlobalConfig from './config/index'

const globalConfig = new GlobalConfig()

globalConfig.init()

App({
  globalData: {
    config: globalConfig
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
})

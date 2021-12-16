// app.js

var QQMapWX = require('qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmap = new QQMapWX({
  key: 'IZZBZ-XLAWO-4F5WJ-SXC2J-SU2VE-4XBPU'
})
App({
  globalData: {
    userInfo: null,
    navHeight: 0,
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        this.globalData.navHeight = res.statusBarHeight;
      },
    })
  },
  async authorization() {
    const that = this;
    try {
        await that.getWxLocation()
      } catch (error) {
        Model({
          title: '温馨提示',
          tip: '获取权限失败，需要获取您的地理位置才能为您提供更好的服务！是否授权获取地理位置？',
          showCancel: true,
          confirmText: '前往设置',
          cancelText: '取消',
          sureCall() {
            that.toSetting()
          },
          cancelCall() {}
        })
        return
      }
  },
  // 持续获取位置信息
  getWxLocation() {
    wx.showLoading({
      title: '定位中...',
      mask: true,
    })
    return new Promise((resolve, reject) => {
      const _locationChangeFn = (res) => {
        console.log('location change', res)
        wx.hideLoading()
        wx.offLocationChange(_locationChangeFn)
      }
      wx.startLocationUpdate({
        success: (res) => {
          wx.onLocationChange(_locationChangeFn)
          resolve()
        },
        fail: (err) => {
          reject()
        }
      })
    })
  },
  // 调起客户端小程序设置界面
  toSetting() {
    wx.openSetting({
      success(res) {
        //如果已经授权
        if (res.authSetting["scope.userLocation"]) {
          this.authorization()
        }
      }
    })
  },
})
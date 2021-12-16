// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  onLoad() {
    let user = wx.getStorageSync('user')
    this.setData({
      userInfo: user
    })
  },
  login() {
    wx.getUserProfile({
      desc: '获取用户基本信息',
      success: outres => {
        wx.login({
          success: inres => {
            // ------ 获取凭证 ------
            var code = inres.code;
            if (code) {
              // ------ 发送凭证 ------
              wx.request({
                url: 'http://localhost:8080/OlineLine/info',
                method: 'POST',
                data: {
                  code: code,
                  type: 'login',
                  nickname: outres.userInfo.nickname,
                  gender: outres.userInfo.gender,
                  avatarUrl: outres.userInfo.avatarUrl
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: res => {
                  wx.setStorageSync('user', res.data.user)
                  wx.setStorageSync('openid', res.data.openid)
                  this.setData({
                    userInfo: res.data.user
                  })
                },
              })
            }
          }
        })
      }
    })
  },
  //进入修改资料页面
  modInfo() {
    wx.navigateTo({
      url: 'myInfo',
    })
  },
  //进入查看权益界面
  getRight(){
    wx.navigateTo({
      url: 'right',
    })
  },
  logout() {
    this.setData({
      userInfo: ''
    })
    wx.setStorageSync('user', null)
  },
  myorder(){
    wx.navigateTo({
      url: '../mepages/myorder',
    })
  },
  myteam(){
    wx.navigateTo({
      url: '../mepages/myteam',
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
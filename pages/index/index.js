// index.js
// 获取应用实例
const app = getApp()
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmap = new QQMapWX({
  key: 'IZZBZ-XLAWO-4F5WJ-SXC2J-SU2VE-4XBPU'
})
Page({
  data: {
    distances: [], //距离
    userInfo: {},
    modalName: '', //开启前台发送位置消息返回的错误信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    locations: [{
      latitude: 40.03797,
      longitude: 116.34802,
    }, {
      latitude: 40.03858,
      longitude: 116.34674,
    }, {
      latitude: 40.03639,
      longitude: 116.34576,
    }, {
      latitude: 40.04085,
      longitude: 116.34751,
    }, {
      latitude: 40.03962,
      longitude: 116.34373,
    }, {
      latitude: 40.03666,
      longitude: 116.34888,
    }]
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
    // wx.startLocationUpdate({
    //   success: (res) => {
    //     wx.onLocationChange((data) => {
    //       //获取当前时间
    //       var currentTime = new Date().getTime();
    //       //获取上次保存的位置信息
    //       var oldLocation = wx.getStorageSync('oldLocation');
    //       //获取上次执行的时间
    //       var oldTime = wx.getStorageSync('oldTime');
    //       //将经纬度拼接
    //       var newLocation = data.latitude + "" + data.longitude;
    //       //判断当前的位置是否和上次位置不一致
    //       if (oldLocation != newLocation || oldLocation == null) {
    //         //缓存当前最新位置
    //         wx.setStorageSync('oldLocation', newLocation);
    //         //缓存当前执行的时间
    //         wx.setStorageSync('oldTime', currentTime);
    //         //如果本次执行时间距离上次时间超过5s，将位置信息上传后台
    //         if ((currentTime - oldTime) > 2000 || oldTime == null) {
    //           this.getDistance()
    //         }
    //       }
    //     });
    //     console.log('startLocationUpdate-res', res)
    //   },
    //   fail: (err) => {
    //     this.setData({
    //       modalName: 'DialogModal1'
    //     });
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopLocationUpdate({
      success: (res) => {
        wx.offLocationChange()
      },
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.offLocationChange()
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
  //获得两点步行距离和时间
  getDistance: function (e) {
    var that = this
    qqmap.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      //from参数不填默认当前地址
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from: '', //若起点有数据则采用起点坐标，若为空默认当前地址
      to: that.data.locations, //终点坐标
      success: res => { //成功后的回调
        var res = res.result
        var distancess = [{
          distance: '',
          walktime: ''
        }, {
          distance: '',
          walktime: ''
        }, {
          distance: '',
          walktime: ''
        }, {
          distance: '',
          walktime: ''
        }, {
          distance: '',
          walktime: ''
        }, {
          distance: '',
          walktime: ''
        }]
        for (var i = 0; i < res.elements.length; i++) {
          distancess[i].distance = res.elements[i].distance //将返回数据存入对应的distances数组的distance，
          distancess[i].walktime = parseInt(res.elements[i].distance / 50) + 1 //将到达目的地大概需要的时间存入对应的distances数组的walktime
        }
        console.log(distancess)
        this.setData({
          distances: distancess
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {}
    })
  },
  //在线排队
  queue(){
    wx.navigateTo({
      url: '../queue/queue',
    })
  }
})
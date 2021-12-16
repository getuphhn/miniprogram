// pages/me/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    male: false,
    female: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    this.setData({
      userInfo: user
    })
    this.genderCheck()
  },
  //判断性别，选中单选框
  genderCheck: function () {
    if (this.data.userInfo.gender == "男") {
      this.setData({
        male: true
      })
    } else if (this.data.userInfo.gender == "女") {
      this.setData({
        female: true
      })
    }
  },
  saveInfo: function (e) {
    let user = e.detail.value
    wx.request({
      url: 'http://localhost:8080/OlineLine/info',
      method: 'POST',
      data: {
        type: 'modifyInfo',
        nickname: user.nickname,
        name: user.name,
        gender: user.gender,
        id: user.id,
        phone: user.phone,
        email: user.email,
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.setStorageSync('user', res.data.user)
        this.setData({
          userInfo: res.data.user
        })
        this.changeParentData()
      }
    })
  },
  //刷新上一级页面
  changeParentData: function () {
    var pages = getCurrentPages(); //当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
      beforePage.setData({
        userInfo:wx.getStorageSync('user')
      }); //触发父页面中的方法
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
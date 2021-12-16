// pages/childpagesofme/myteam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamname: '',
    teamnumber: '',
    teamlabel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit: function (e) {
    let team = e.detail.value
    wx.request({
      url: 'http://localhost:8080/OlineLine/team',
      method: 'POST',
      data: {
        teamname: team.teamname,
        teamnumner: team.teamnumber,
        teamlaber: team.teamlabel,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.setStorageSync('user', res.data.user)
        this.setData({
          userInfo: res.data.user
        })
     
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  //打开规则提示
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
  },


  //关闭规则提示
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
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
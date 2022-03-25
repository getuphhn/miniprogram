// pages/order/order.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '已完成', index: 0 }, { name: '待付款', index: 1 }, { name: '已取消', index: 2 }],
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },
 
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
 
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
 
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function(){
    this.setData({
      alreadyOrder: [{ name: "北京欢乐谷游乐园", state: "交易成功", time: "2021-02-17 14:00-16:00", status: "已结束", url: "https://s1.ax1x.com/2022/03/13/bLiB5Q.png", money: "132" }, { name: "北京欢乐谷游乐园", state: "交易成功", time: "2022-03-13 18:00-20:00", status: "未开始", url: "https://s1.ax1x.com/2022/03/13/bLiB5Q.png", money: "205" }]
    })
  },
 
  waitPayShow:function(){
    this.setData({
      waitPayOrder: [{ name: "北京环球影城游乐场", state: "待付款", time: "2022-02-13 14:00-16:00", status: "未开始", url: "https://s1.ax1x.com/2022/03/13/bLFpRA.jpg", money: "186" }],
    })
  },
 
  lostShow: function () {
    this.setData({
      lostOrder: [{ name: "重庆欢乐谷游乐场", state: "已取消", time: "2021-03-04 10:00-12:00", status: "未开始", url: "https://s1.ax1x.com/2022/03/13/bLFQs0.jpg", money: "122" }],
    })
  },
 
  
})
// pages/map/map.js
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmap;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:"IZZBZ-XLAWO-4F5WJ-SXC2J-SU2VE-4XBPU",
    latitude: "40.037994",
    longitude: "116.347117",
    speed:'',
    accuracy:'',
    scale: 17,
    scrollTop: 0,
    isChecked: true,
    isSpread: true,
    polygon:[{

    }],
    markers:[{
      id:1,
      latitude: 40.03797,
      longitude: 116.34802,
      width:30,
      height:30,
      iconPath: 'https://s4.ax1x.com/2021/12/12/oLpfPg.png',
      callout:{
        content:"霸天虎过山车",
        bgColor:"#fff",
        padding:"5px",
        borderRadius:"2px",
        borderWidth:"1px",
        borderColor:"#07c160",
        display:'ALWAYS'
      }
    },{
      id:2,
      latitude: 40.03858,
      longitude: 116.34674,
      width:30,
      height:30,
      iconPath: 'https://s4.ax1x.com/2021/12/12/oLpfPg.png',
      callout:{
        content:"擎天柱乐园",
        bgColor:"#fff",
        padding:"5px",
        borderRadius:"2px",
        borderWidth:"1px",
        borderColor:"#07c160",
        display:'ALWAYS'
      }
    },{
      id:3,
      latitude: 40.03639,
      longitude: 116.34576,
      width:30,
      height:30,
      iconPath: 'https://s4.ax1x.com/2021/12/12/oLpfPg.png',
      callout:{
        content:"小黄人世界",
        bgColor:"#fff",
        padding:"5px",
        borderRadius:"2px",
        borderWidth:"1px",
        borderColor:"#07c160",
        display:'ALWAYS'
      }
    },{
      id:4,
      latitude: 40.04085,
      longitude: 116.34751,
      width:30,
      height:30,
      iconPath: 'https://s4.ax1x.com/2021/12/12/oLpfPg.png',
      callout:{
        content:"火种争夺战",
        bgColor:"#fff",
        padding:"5px",
        borderRadius:"2px",
        borderWidth:"1px",
        borderColor:"#07c160",
        display:'ALWAYS'
      }
    },{
      id:5,
      latitude: 40.03962,
      longitude: 116.34373,
      width:30,
      height:30,
      iconPath: 'https://s4.ax1x.com/2021/12/12/oLpfPg.png',
      callout:{
        content:"侏罗纪世纪大冒险",
        bgColor:"#fff",
        padding:"5px",
        borderRadius:"2px",
        borderWidth:"1px",
        borderColor:"#07c160",
        display:'ALWAYS'
      }
    },{
      id:6,
      latitude: 40.03666,
      longitude: 116.34888,
      width:30,
      height:30,
      iconPath: 'https://s4.ax1x.com/2021/12/12/oLpfPg.png',
      callout:{
        content:"欢乐风火轮",
        bgColor:"#fff",
        padding:"5px",
        borderRadius:"2px",
        borderWidth:"1px",
        borderColor:"#07c160",
        display:'ALWAYS'
      }
    }
  ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var _this = this
    // 实例化API核心类
    qqmap = new QQMapWX({
      key: _this.data.key
    })
    app.authorization()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('mmap')
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

  },
  //回到自己位置
  locationing: function () {

    wx.getLocation({
      type: 'gcj02',
      altitude: true, //高精度定位
      //定位成功，更新定位结果
      success: res=> {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        this.setData({
          longitude: longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy
        })
      }
    })
  },
})
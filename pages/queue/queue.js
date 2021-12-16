// pages/queueonline/queue.js
var util = require('../../utils/util.js');
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmap = new QQMapWX({
  key: 'IZZBZ-XLAWO-4F5WJ-SXC2J-SU2VE-4XBPU'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inter:'',
    distances: [], //项目距离
    waittimes:[],  //等候时间
    isBindExpert: "none",
    mask: "none",
    background: "rgba(129, 127, 127, 0.979)",
    img: "https://s4.ax1x.com/2021/12/15/TpZjgJ.png",
    img1: 'https://s4.ax1x.com/2021/12/15/TpeSD1.png',
    num: 0,  //预约项目个数
    project: [], //界面显示预约项目
    pretend: [], //预约项目列表
    choose: [], //预选队列
    locations: [{
            latitude: 40.03797,
            longitude: 116.34802,
          }, {
            latitude: 40.03858,
            longitude: 116.34674,
          }, {
            latitude: 40.03639,
            longitude: 116.34576,
          }, {
            latitude: 40.04085,
            longitude: 116.34751,
          }, {
            latitude: 40.03962,
            longitude: 116.34373,
          }, {
            latitude: 40.03666,
            longitude: 116.34888,
          }],
  },
  onLoad: function () {
          wx.removeStorageSync('oldLocation')
          wx.removeStorageSync('oldTime')
          this.getinfo()
          wx.startLocationUpdate({
            success: (res) => {
              wx.onLocationChange((data) => {
                //获取当前时间
                var currentTime = new Date().getTime();
                //获取上次保存的位置信息
                var oldLocation = wx.getStorageSync('oldLocation');
                //获取上次执行的时间
                var oldTime = wx.getStorageSync('oldTime');
                //将经纬度拼接
                var newLocation = data.latitude + "" + data.longitude;
                //判断当前的位置是否和上次位置不一致
              
                if (oldLocation != newLocation || oldLocation==null) {
                  //缓存当前最新位置
                  wx.setStorageSync('oldLocation', newLocation);
                  //缓存当前执行的时间
                  wx.setStorageSync('oldTime', currentTime);
                  //如果本次执行时间距离上次时间超过5s，将位置信息上传后台
                 
                  if ((currentTime - oldTime) > 2000 || oldTime==null) {
                    this.getDistance()
                  }
                }
              });
            
              console.log('startLocationUpdate-res', res)
            },
            fail: (err) => {
              this.setData({
                modalName: 'DialogModal1'
              });
            }
          })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onHide:function(){
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
     wx.offLocationChange()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     wx.stopLocationUpdate({
            success: (res) => {
              wx.offLocationChange()
            },
          })
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
  /** 
   * 页面处理事件
   * 
   */
  //点击预约按钮
  bindbook: function (e) {
    var choice = this.data.choose;
    choice.push(e.currentTarget.dataset.index * 1);//获取用户点击预约项目编号，加入预选队列
    this.setData({
      isBindExpert: "block",
      choose: choice
    })
  
  },
  //用户再次确定是否预约时取消
  cancel: function () {
    var choice = [];
    this.setData({
      isBindExpert: "none",
      choose: choice  //点击取消，预选队伍队列清空
    })
  },
  stopTouch: function () {},
  //用户确定选择预约该项目
  add: function () {
    var pretending = this.data.pretend;
    pretending.push(this.data.choose[0]);  //将预选项目加入预约项目列表
    this.setData({
      isBindExpert: "none",
      background: "blue",
      num: this.data.num + 1,
      pretend: pretending,
      choose: []
    });
    console.log(this.data.pretend);
  },
  quit: function (e) {
    var droparray = this.data.pretend;
    droparray.splice(e.currentTarget.dataset.cancel * 1, 1);
    this.setData({
      pretend: droparray,
      num: this.data.num - 1
    });
    console.log(this.data.pretend);
  },
  //获取距离
  //获得两点步行距离和时间
    getDistance: function (e) {
       
        var that=this
        qqmap.calculateDistance({
          //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
          //from参数不填默认当前地址
          //获取表单提交的经纬度并设置from和to参数（示例为string格式）
          from: '', //若起点有数据则采用起点坐标，若为空默认当前地址
          to: that.data.locations, //终点坐标
          success: res => { //成功后的回调
            var res = res.result
            var distancess = [{distance:'',walktime:''},{distance:'',walktime:''},{distance:'',walktime:''},{distance:'',walktime:''},{distance:'',walktime:''},{distance:'',walktime:''}]
            for (var i = 0; i < res.elements.length; i++) {
              distancess[i].distance = res.elements[i].distance //将返回数据存入对应的distances数组的distance，
              distancess[i].walktime = parseInt(res.elements[i].distance / 50)+1 //将到达目的地大概需要的时间存入对应的distances数组的walktime
            }
            console.log(distancess)
            this.setData({
              distances: distancess
            })
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {}
        })
      },
  getwaittime:function(arr){

  },
  getinfo:function(){
    console.log("right")
    var self=this
    wx.request({
      url: 'http://localhost:8080/OlineLine/book', //请求连接数据库
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);    //打印获取到的数据（项目列表）
      },
      complete:function(res){
        /*获取等候时间
        */
        var waittime=[];     
        var project=res.data
        var endtime=util.formatTime(new Date()) //获取当前系统时间
        console.log(endtime)  //打印现在时间
        
        for(var i=0;i<project.length;i++){
              var starttime=project[i].begintime;  //获取项目开始时间
            
              //调用函数计算等候时间
               waittime[i]=util.waittime(starttime,endtime, 
                project[i].number,project[i].seating,project[i].runtime)

        }
        self.setData({
          //将获取到的数据赋值给data
          project: res.data,
          waittimes:waittime
        })
        
      }
    })
  }
})
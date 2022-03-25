// pages/queueonline/queue.js
//引入用来发表请求的方法
import {
  request
} from "../../request/request.js";

var util = require('../../utils/util.js');
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmap = new QQMapWX({
  key: 'IZZBZ-XLAWO-4F5WJ-SXC2J-SU2VE-4XBPU'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distances: [], //项目距离
    waittimes: [], //等候时间
    left: [15, 15, 15, 15, 15], //滑动效果调整
    isBindExpert: ["none", "none", "none"], //确认弹窗显现
    mask: "none", //弹出框背景
    background: "rgba(129, 127, 127, 0.979)",
    img: "https://s4.ax1x.com/2021/12/15/TpZjgJ.png",
    img1: 'https://s4.ax1x.com/2021/12/15/TpeSD1.png',
    num: 0, //预约项目个数
    project: [], //界面显示预约项目
    chance: 0, //用户可预约次数
    pretend: [], //预约项目列表
    choose: [], //预选队列
    touch_x: 0, //滑动x距离
    touch_y: 0, //滑动y距离
    viewitem: -1, //处于左滑状态的项目编号
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
    }],
  },
  onLoad: function () {
    this.getinfo()
    wx.startLocationUpdate({
      success: (res) => {
        wx.onLocationChange((data) => {
          //获取当前时间
          var currentTime = new Date().getTime();
          //获取上次保存的位置信息
          var oldLocation = wx.getStorageSync('oldLocation');
          //获取上次执行的时间
          var oldTime = wx.getStorageSync('oldTime');
          //将经纬度拼接
          var newLocation = data.latitude + "" + data.longitude;
          //判断当前的位置是否和上次位置不一致

          if (oldLocation != newLocation || oldLocation == null) {
            //缓存当前最新位置
            wx.setStorageSync('oldLocation', newLocation);
            //缓存当前执行的时间
            wx.setStorageSync('oldTime', currentTime);
            //如果本次执行时间距离上次时间超过5s，将位置信息上传后台

            if ((currentTime - oldTime) > 2000 || oldTime == null) {
              this.getDistance()
            }
          }
        });

        console.log('startLocationUpdate-res', res)
      },
      fail: (err) => {
        this.setData({
          modalName: 'DialogModal1'
        });
      }
    })
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
    wx.offLocationChange()
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
    var isBindExpert = ["block", "none", "block"];
    var choice = this.data.choose;
    choice.push(e.currentTarget.dataset.index * 1); //获取用户点击预约项目编号，加入预选队列
    this.setData({
      isBindExpert: isBindExpert,
      choose: choice
    })
  },
  //用户再次确定是否预约时取消
  cancel: function () {
    var choice = [];
    var isBindExpert = ["none", "none", "none"];
    this.setData({
      isBindExpert: isBindExpert,
      choose: choice //点击取消，预选队伍队列清空
    })
  },
  stopTouch: function () {},
  //用户确定选择预约该项目
  add: function () {
    var choose = this.data.choose[0] - 1;
    var pretending = this.data.pretend;
    var isBindExpert = ["none", "none", "none"];
    var openid = ''; //预约用户id
    var proid = ''; //预约项目id
    var waittimes = this.data.waittimes;
    pretending.push(this.data.choose[0]); //将预选项目加入预约项目列表
    waittimes[choose] = "已经预约";
    this.setData({
      isBindExpert: isBindExpert,
      background: "blue",
      num: this.data.num + 1,
      pretend: pretending,
      choose: [],
      waittimes: waittimes
    });
    openid = wx.getStorageSync("openid") //从缓存中获取用户id
    proid = this.data.project[choose].proid //获取项目id
    //向数据库后台提交预约项目请求
    request({
      url: "http://localhost:8080/OlineLine/book",
      method: "POST",
      data: {
        openid: openid,
        proid: proid,
        type: 'add'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
      console.log(result)
    })
  },
  quit: function (e) {
    var choice = this.data.choose;
    var isBindExpert = ["none", "block", "block"];
    choice.push(e.currentTarget.dataset.index * 1); //获取用户点击预约项目编号，加入预选队列
    this.setData({
      isBindExpert: isBindExpert,
      choose: choice
    })
  },
  delete: function (e) {
    var isBindExpert = ["none", "none", "none"]; //背景控制
    var droparray = this.data.pretend;
    var del = this.data.choose[0] //获取用户想要删除的项目
    var openid = ''; //预约用户id
    var proid = ''; //预约项目id
    var chance = 0;
    openid = wx.getStorageSync("openid") //从缓存中获取用户id
    proid = this.data.project[del - 1].proid //获取项目id
    chance = this.data.chance;
    for (var i = 0; i < droparray.length; i++) { //获取用户想要删除项目的索引
      if (droparray[i] == del)
        del = i
    }
    droparray.splice(del, 1); //将项目从预约列表中移除

    this.setData({
      pretend: droparray,
      num: this.data.num - 1,
      isBindExpert: isBindExpert,
      choose: [],
      chance: chance - 1 //可以取消的次数减一
    });
    //向数据库后台提交删除项目的请求
    request({
      url: "http://localhost:8080/OlineLine/book",
      method: "POST",
      data: {
        openid: openid,
        proid: proid,
        type: 'delete'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
      console.log(result)
      this.getinfo()
    })
  },
  //获取距离
  //获得两点步行距离和时间
  getDistance: function (e) {
    var that = this
    qqmap.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
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
  getwaittime: function (arr) {},
  getinfo: function () {

    var self = this
    var openid = wx.getStorageSync("openid"); //获取预约用户id
    wx.removeStorageSync("oldLocation");
    wx.removeStorageSync('oldTime');

    wx.request({
      url: 'http://localhost:8080/OlineLine/book', //请求连接数据库
      method: 'get',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res); //打印获取到的数据（项目列表）
      },
      complete: function (res) {
        var chance = 0;
        var waittime = [];
        var project = res.data.project; //获取游乐园项目
        var orderpro = res.data.orderpro; //获取已经预约项目列表
        var pretend = []
        var endtime = util.formatTime(new Date()) //获取当前系统时间

        if (orderpro.length != 0) {
          for (var j = 0; j < orderpro.length; j++) {
            pretend.push(orderpro[j].proid * 1); //将已经预约项目写入数据data
          }
        }
        for (var i = 0; i < project.length; i++) {
          if (pretend.length == 0) {
            var starttime = project[i].begintime; //获取项目开始时间
            if (starttime == "")
              starttime = endtime
            //调用函数计算等候时间
            waittime[i] = util.waittime(starttime, endtime,
              project[i].number, project[i].seating, project[i].runtime)
          }
          for (var j = 0; j < pretend.length; j++) {
            if (project[i].proid * 1 == pretend[j]) {
              waittime[i] = "已经预约"
              break;
            } else {
              var starttime = project[i].begintime; //获取项目开始时间
              if (starttime == "")
                starttime = endtime
              //调用函数计算等候时间
              waittime[i] = util.waittime(starttime, endtime,
                project[i].number, project[i].seating, project[i].runtime)
            }
          }
        }
        //向数据库后台提交获取用户可以取消次数数据请求
        request({
          url: "http://localhost:8080/OlineLine/info",
          method: "GET",
          data: {
            openid: openid
          }
        }).then(result => {
          chance = result.data.user.chance
        })
        self.setData({
          //将获取到的数据赋值给data
          project: res.data.project,
          waittimes: waittime,
          chance: chance,
          pretend: pretend
        })
      }
    })
  },
  /**
   * 
   * 滑动优化
   */
  touchStart(e) {
    /**获取开始滑动坐标 */
    // console.log(e)
    this.setData({
      touch_x: e.changedTouches[0].clientX,
      touch_y: e.changedTouches[0].clientY
    });
  },
  touchEnd(e) { // 获取滑动结束坐标并按情形进行判断
    var self = this;
    var same = '';
    var touch_x = self.data.touch_x;
    var touch_y = self.data.touch_y;
    var item = e.currentTarget.dataset.index * 1 - 1; //目前被点击的项目(组件所在项目)
    var contentstyle = self.data.left;
    let x = e.changedTouches[0].clientX; //滑动后横坐标
    let y = e.changedTouches[0].clientY; //滑动后纵坐标

    if (self.data.viewitem == -1 || self.data.viewitem == item) { //没有项目处于左滑状态或正在被点击的项目左滑
      same = 'true'
    } else if (self.data.viewitem != item && self.data.viewitem != -1) { //左滑项目与正在被点击的项目不同
      same = 'false';
      item = self.data.viewitem; //暂存处于左滑的项目
    }
    if (util.getTouchData(x, y, touch_x, touch_y, same) == 'left') {
      contentstyle[item] = -18; //  项目左滑
      this.setData({
        left: contentstyle,
        viewitem: item //记录处于左滑的项目
      })
    } else {
      contentstyle[item] = 18; //项目右滑
      this.setData({
        left: contentstyle,
        viewitem: -1 //记录没有项目处于左滑状态
      })
    }
  }
})
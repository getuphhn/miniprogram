// index.js
// 获取应用实例
import {
  request
} from "../../request/request.js";
var util = require('../../utils/util.js');
const app = getApp()
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmap = new QQMapWX({
  key: 'D5ZBZ-F4MC6-UMPSS-ERGAS-K5FZQ-A4BYN'
})
const myaudio = wx.createInnerAudioContext({});
Page({
  data: {
    orderData: [], //预约信息
    userInfo: {},
    modalName: '', //开启前台发送位置消息返回的错误信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    isplay:false,
    music:[{src:'https://dl.stream.qqmusic.qq.com/C400000gQTGI04cssH.m4a?guid=462258966&vkey=A0E673DD4D9448321BF0BB6749273134D36A5A47A138A845ACDDC29E81EB3825E98020B2181937C115A29BC74AB02379115B83434BA9B1A5&uin=&fromtag=66',name:'一路生花'}],
    id:'wxf08c894b885b7ff0',
    secret:'324755076a07332abb5521790b2f2f78',
    access_token:'55_0sSdV2DdQt3QIJhs5atns1XGn8E4YqrYp4x2bcnW4BOERyketseOLaQIzdvSCOuUHjdp-x8h36Taku78Qe5bDnNfhm7zUnty-pWDlXmtJd5WzVVLaZ4YGsrpNaV5bwCRPKG_iHx88NF5Hu7jZGGgAGAKRR',
    template_id:'MZAX8XO1dMMXdZgWy2yZeL1v8x7yNjnt4GN8aRg7aWw',
    emptysit:[],
    subscribe:false,
    scarce:false
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
    
    wx.removeStorageSync('oldLocation')
    
    wx.startLocationUpdate({
      success: (res) => {
        this.getOrderData()
        var that=this
        that.data.setInter = setInterval(function () {that.getOrderData()
        }, 60000) //循环间隔 单位ms
        //setTimeout(function(){
        //  that.getOrderData()},
       //  1000);
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
  //转到在线排队
  queue() {
    console.log("hello")
    console.log(wx.getStorageSync("openid"))
    if(wx.getStorageSync("openid")==null||wx.getStorageSync("openid").length==0||wx.getStorageSync("openid")=="undefined"){
      wx.showToast({
        title: '请先登录',//提示文字
        duration:2000,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'error'//图标，支持"success"、"loading"  
       })
      }else{
        var subscribe=this.data.subscribe
        if(subscribe==false){
          var template_id=this.data.template_id
          wx.requestSubscribeMessage({
          tmplIds: [template_id],//这里填写模板id
          success (res) {
            console.log("res--->",res)
           },
           fail:err=>{
             console.log("err---",err)
           }
        })
        this.setData({ subscribe:true  })
        }
        wx.navigateTo({
          url: '../queue/queue',
        })
      }
    
  },
  ticketpurchase(){
    wx.navigateTo({
      url: '../ticketpurchase/ticket'
    })
  },
  project(){
    wx.navigateTo({
      url: '../project/project',
    })
  },
  activitytime(){
    wx.navigateTo({
      url: '../activitytime/activity',
    })
  },

  route(){
    wx.navigateTo({
      url: '../playway/playway',
    })
  },
  play:function(){
    var orderdata=this.data.orderData
    var music=this.data.music
    var isplay=this.data.isplay;
    var waitime=orderdata[0].waittime.substring(3,4)
    var openid = wx.getStorageSync("openid")
    var proid=orderdata[0].proid
    console.log(orderdata[0].waittime.substring(3,4))
    console.log(orderdata[0].walktime);
    if(waitime-orderdata[0].walktime*1==4){
       myaudio.src=music[0].src;
       myaudio.play();
       isplay=true;
       wx.showToast({
        title: 'TIME IS UP',
        icon:'error',
        duration: 4000
      })
      this.setData({
        isplay: isplay
      })
    }
    if(waitime<=0){
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
      })
    }
  },
  stop:function(){
    myaudio.pause();
    console.log("停止播放")
    this.setData({ isplay: false });
    setTimeout(() => {
      myaudio.stop()
    }, 1000);
  },
  getaccess:function(){
    var id=this.data.id
    var secret=this.data.secret
    request({
      url: "http://localhost:8080/OlineLine/access",
      method: "POST",
      data: {
        id:id,
        secret:secret
      },
      header: {
         'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(result => { 
       console.log(result.data.substring(3,result.data.length-2))
       var access_token=result.data.substring(3,result.data.length-2)
       this.setData({
          access_token:access_token
       })
       console.log(access_token)
    })
},
  sendMsg:function(e){
    var openid=wx.getStorageSync("openid")
    console.log(openid)
    var template_id=this.data.template_id
    var emptysit=this.data.emptysit
    this.getaccess();
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + this.data.access_token,
      method: 'POST',
      data: {
        "touser": 'oYW6S5dn4s_ZTkZ-HrR2xZC87jSs', //接收者（用户）的 openid
        "template_id":template_id, //所需下发的订阅模板id
        "page": '/pages/index/index', //点击模板卡片后的跳转页面
        "data": {
          "thing1": {
            "value":emptysit[0].proname
          },
          "number2": {
            "value": emptysit[0].emptysit
          },
          "thing3": {
            "value": "以预约先后顺序填补"
          }
        }, //模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
        "miniprogram_state": "developer" //跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
      },
      success: (res) => {
        console.log(res.data);
      },
      fail: (e) => {
        console.log("sorry")
      }
    })
  },
  //获取预约信息
  getOrderData: function () {
    //从数据库获取
    wx.request({
      url: "http://localhost:8080/OlineLine/miniIndex",
      method: "POST",
      data: {
        openid: wx.getStorageSync('openid'),
        type: 'orderData'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        if (res.data.length != 0) {
        
          //把已预约的项目名称存入pronames
          var pronames = []
          var proid=[]
          for (var i = 0; i < res.data.length; i++) {
            pronames[i] = res.data[i].proname;
            proid[i]=res.data[i].proid;
          }
        
          //把距离已预约项目开始的时间存入waittimes
          var waittimes = []
          //获取系统时间
          var endtime = util.formatTime(new Date())
          for (var i = 0; i < res.data.length; i++) {
            var starttime = res.data[i].begintime; //获取项目开始时间
            if (starttime == "")
              starttime = endtime
            //调用函数计算等候时间
            waittimes[i] = util.waittime(starttime, endtime,
              res.data[i].prevNum, res.data[i].seating, res.data[i].runtime)
          }
          //把已预约项目的坐标存入locations
          var locations = []
          for (var i = 0; i < res.data.length; i++) {
            locations[i] = {
              'latitude': res.data[i].latitude,
              'longitude': res.data[i].longitude
            }
          }
          
            var orderdata = [] //存放预约信息
            //获取当前时间
            var currentTime = new Date().getTime();
            //获取上次保存的位置信息
            var oldLocation = wx.getStorageSync('oldLocation');
            //获取上次执行的时间
           // var oldTime = wx.getStorageSync('oldTime');
            //将经纬度拼接
           // var newLocation = data.latitude + "" + data.longitude;
            
          //实时监听位置变化
         // wx.onLocationChange((data) => {
            //获取当前时间
            //var currentTime = new Date().getTime();
            //获取上次保存的位置信息
           // var oldLocation = wx.getStorageSync('oldLocation');
            //获取上次执行的时间
            //var oldTime = wx.getStorageSync('oldTime');
            //将经纬度拼接
            //var newLocation = data.latitude + "" + data.longitude;
            //判断当前的位置是否和上次位置不一致
           // if (oldLocation != newLocation || oldLocation == null) {
              //缓存当前最新位置
           //   wx.setStorageSync('oldLocation', newLocation);
              //缓存当前执行的时间
           //   wx.setStorageSync('oldTime', currentTime);
              //如果本次执行时间距离上次时间超过5s，将位置信息上传后台
             // if ((currentTime - oldTime) > 5000 || oldTime == null) {
                qqmap.calculateDistance({
                  from: '', //若起点有数据则采用起点坐标，若为空默认当前地址
                  to: locations, //终点坐标
                  success: ress => { //成功后的回调
                    var ress = ress.result
                    
                    
                    for (var i = 0; i < ress.elements.length; i++) {
                      orderdata[i] = {
                        'proname': pronames[i],
                        'distance': ress.elements[i].distance,
                        'walktime': 1,//parseInt(ress.elements[i].distance / 50) + 1,
                        'waittime': waittimes[i],
                        'proid':proid[i]
                      }
                    }
                     this.setData({
                      orderData: orderdata
                    })
                    this.play()
                  },
                  fail: function (error) {
                    console.error(error);
                  },
                  complete: function (res) {
                   
                  }
                })
             // }
           // }
         // })
        }else{
          this.setData({
            orderData:null
          })
        }

      }
    })
    console.log("验证项目有无空缺")
    request({
      url: "http://localhost:8080/OlineLine/access",
      method: "POST",
      data: {
        openid: wx.getStorageSync('openid'),
        type: 'sendMsg'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
        console.log(result)
        var scarce=this.data.scarce
        if(result.data.emptysit!=false ||scarce==false){
          this.setData({
            emptysit:result.data.emptysit,
            scarce:true
          })
          this.sendMsg()
        }
    })
  },
})
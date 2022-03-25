// pages/route/route.js
import {
  request
} from "../../request/request.js";
const myaudio = wx.createInnerAudioContext({});
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
        poster:'https://s4.ax1x.com/2022/02/21/HjI9ht.jpg',
        name:'no more no more',
        author:'Tysm',
        src:'https://music.163.com/#/song?id=1440570723&market=baiduqk',
        isplay:false,
        id:'wxf08c894b885b7ff0',
        secret:'324755076a07332abb5521790b2f2f78',
        access_token:'54_wZpJr-rmYIGmbp2coMQuk2VtekX05x4WIjJ24vs-Zi2G6lI85e8lR4RNRW6rt2Vvbg2Txd6hLGiI1piqqyZpSQOLK7IcKQFVklzh6KyUsphYho2QyRp_7naU0HqAawPNowIqZ5FJ5pRgaonxAVKjAAAVQF',
        template_id:'Y5RlsT5nSJLf9jMdFpFixtee5XDd-jZope9QfOpRVpA',
        words:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
      myaudio.src = "https://ca-sycdn.kuwo.cn/382b241bcf6817bcf36247e0a88d8fd8/6213a2f1/resource/n1/36/66/568409668.mp3"
      myaudio.onPause(function(){
        console.log('hello')
        wx.showToast({
          title: '已暂停',
        })
      })
       
    
  },
  // login.js
requestMsg(){
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
  /**
   * return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: ["Y5RlsT5nSJLf9jMdFpFixtee5XDd-jZope9QfOpRVpA"],
      success: (res) => {
        if (res['Y5RlsT5nSJLf9jMdFpFixtee5XDd-jZope9QfOpRVpA'] === 'accept'){
          wx.showToast({
            title: '订阅OK！',
            duration: 1000,
            success(data) {
              //成功
              resolve()
            }
          })
        }
      },
      fail(err) {
        //失败
        console.error(err);
        reject()
      }
    })
  })
   * 
   */
  
},
choseimage:function(){
    console.log("hello");
    const that = this
    wx.chooseImage({
      success: (res) => {
        //获取图片的临时路径
        const tempFilePath = res.tempFilePaths[0]
        //根据官方的要求  用base64字符编码获取图片的内容
        wx.getFileSystemManager().readFile({
          filePath: tempFilePath,
          encoding: 'base64',
          success: function (res) {
            //调用方法
            that.getImgInfo(res.data)
          },
        })
      },
    })
},
getImgInfo: function (imageData) {
  wx.showLoading({
    title: '识别中...',
  })
  var that = this
  that.getBaiduToken().then(res => {
    console.log(res)
    //获取token
    const token = res.data.access_token
    console.log(token)
    const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=${token}` // baiduToken是已经获取的access_Token      
    wx.request({
      url: detectUrl,
      data: {
        image: imageData,
        id_card_side:"front"
      },
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 必须的        
      },
      success: function (res, resolve) {
        console.log(res)
        //将 res.data.words_result数组中的内容加入到words中           
        that.setData({
          words: res.data.words_result
        })
        console.log('识别后： ' + res.data.words_result.姓名.words)
        wx.hideLoading()
      },
      fail: function (res, reject) {
        console.log('get word fail：', res.data);
        wx.hideLoading()
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
},
getBaiduToken: function () {
  return new Promise(resolve => {
    var APIKEY = "83FzM1LsmFcGTjzksixFQae9"  //自己的key
    var SECKEY = "ebhTN4MHeVimqEzIEFOMtBos1T574o8C" //自己的secret
    var tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${APIKEY}&client_secret=${SECKEY}`
    var that = this;
    console.log("hello")
    wx.request({
      url: tokenUrl,
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/json; charset-UTF-8'
      },
      success: function (res) {
        console.log("[BaiduToken获取成功]", res);
        return resolve(res)
      },
      fail: function (res) {
        console.log("[BaiduToken获取失败]", res);
        return resolve(res)
      }
    })
  })
},
sendMsg:function(e){
  var openid=wx.getStorageSync("openid")
  console.log(openid)
  var template_id=this.data.template_id
  var Nowtime = util.formatTime(new Date())
  wx.request({
    url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + this.data.access_token,
    method: 'POST',
    data: {
      "touser": 'oYW6S5dn4s_ZTkZ-HrR2xZC87jSs', //接收者（用户）的 openid
      "template_id":template_id, //所需下发的订阅模板id
      "page": '/pages/index/index', //点击模板卡片后的跳转页面
      "data": {
        "name1": {
          "value": "霸天虎过山车"
        },
        "thing2": {
          "value": "空缺2人"
        },
        "date3": {
          "value": Nowtime
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
  getaccess:function(){
      var id="wxf08c894b885b7ff0"
      var secret="324755076a07332abb5521790b2f2f78"
      
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
         console.log(result)
      })
  },

  play: function () {
    myaudio.play();
    console.log(myaudio.duration);
    this.setData({ isplay: true });
  },
  stop: function () {
    myaudio.pause();
    this.setData({ isplay: false });
  },
  send:function(){
   
           

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
   
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
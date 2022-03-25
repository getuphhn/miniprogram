// pages/OrderInfo/OrderInfo.js
//引入用来发表请求的方法
import {
   request
 } from "../../request/request.js";
 var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
          goods:[],
          money_count:'',
          choose_date:'',
          number:'',
          condition:'false',
          tourist:[],
          tourist_play:[],
          identity:'',
          updx:'',
          drop:'',
          payfor:'false',
          name:'',
          id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var choose_date=options.choose_date
     var goods=JSON.parse(options.goods)
     var chose=choose_date.substring(0,2)
     var date=new Date()
     var year=date.getFullYear()
     var month=date.getMonth()+1
     var day=date.getDate()
     if(chose=='今天'){
        choose_date=year+'-'+month+'-'+day
     }else if(chose=='明天'){
        choose_date=year+'-'+month+'-'+(day+1)
     }else if(chose=='后天'){
        choose_date=year+'-'+month+'-'+(day+2)
     }
     console.log(goods)
     this.setData({
         goods:goods,
         money_count:options.money_count,
         choose_date:choose_date,
         number:options.number
     })
     this.getplayerinfo()
  },
  edit:function(e){
   var condition='true';
   this.setData({
      condition:condition
   })
  },
  cancelfill:function(){
   var condition='false';
   this.setData({
      condition:condition,
      updx:'',
      name:'',
      id:''
   })
  },
  radiochange:function(e){
   var identity=e.detail.value
   this.setData({
      identity:identity
   })
  },
  submitForm:function(data){
   var condition='false';
   var drop=this.data.drop;
   var infodata=data.detail.value;
   var openid = wx.getStorageSync("openid");
   var tourist_play=this.data.tourist_play;
   var date = util.formatTime(new Date())
   var updx=this.data.updx;
   var type='';
   infodata.identity=this.data.identity
   infodata.openid=openid
   if(updx.length==0){
     
       type='add';
       infodata.date=date;
       tourist_play.push(infodata);
   }else if(drop.length==0){
      
       type='update';
       tourist_play.splice(updx,1);
       tourist_play.push(infodata);
   }else{
      type='delete';
      tourist_play.splice(updx,1)
   }
   console.log(infodata)
   this.setData({
      condition:condition,
      tourist_play:tourist_play,
      drop:'',
      name:'',
      id:''
   })
   request({
      url: "http://localhost:8080/OlineLine/tourist",
      method: "POST",
      data: {
        name:infodata.name,
        id:infodata.id,
        phone:infodata.phone,
        identity:infodata.identity,
        openid:infodata.openid,
        date:infodata.date,
        type: type
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
        this.getplayerinfo()
    })
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
         name: res.data.words_result.姓名.words,
         id:   res.data.words_result.公民身份号码.words
       })
       console.log('识别后' + that.data.name)
       console.log('识别后'+that.data.id)
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
   getplayerinfo:function(){
      
       var openid = wx.getStorageSync("openid");
       request({
         url: "http://localhost:8080/OlineLine/tourist",
         method: "GET",
         data: {
           openid:openid,
           type: 'find'
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded'
         }
       }).then(result => {
          console.log(result.data)
           var tourist=result.data.tourist;
           console.log(tourist)
           this.setData({
              tourist:tourist,
              updx:''
           })
       })
   },
   addplayer:function(e){
       var index=e.currentTarget.dataset.index;
       var tourist_play=this.data.tourist_play;
       var tourist=this.data.tourist;
       tourist_play.push(tourist[index])
       this.setData({
          tourist_play:tourist_play
       })
   },
   removeplayer:function(e){
      var index=e.currentTarget.dataset.index;
      var tourist_play=this.data.tourist_play;
      var tourist=this.data.tourist;
      var del=0;
      for(var i=0;i<tourist_play.length;i++){
          if(tourist_play[i].id==tourist[index].id){
              del=i
          }
      }
      tourist_play.splice(del,1)
      this.setData({
          tourist_play:tourist_play
      })
   },
   updateplayer:function(e){
      var index=e.currentTarget.dataset.index;
     
      var condition='true';
      this.setData({
         updx:index,
         condition:condition
      })
      var tourist_play=this.data.tourist_play
      console.log("helloooo"+tourist_play[index].name)
   },
   deleteplayer:function(){
      var drop='1';
      this.setData({
            drop:drop
      })
   },
   remind:function(){
       this.setData({
           payfor:'true'
       })
   },
   cancel:function(){
      this.setData({
         payfor:'false'
      })
   },
   add:function(){
      var number=this.data.number;
      var choose_date=this.data.choose_date;
      var tourist_play=this.data.tourist_play;
      let newDate={
         players:JSON.stringify(tourist_play)
      }
      request({
         url: "http://localhost:8080/OlineLine/teamlist",
         method: "POST",
         data: {
           number:number,
           choose_date:choose_date,
           tourist_play:newDate.players,
           type: 'add'
         },
         header: {
            'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
         }
       }).then(result => { 
         this.setData({
            payfor:'false'
         })
       })
       
        wx.switchTab({
         url: '../index/index',
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
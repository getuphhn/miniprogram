// pages/childpagesofme/myteam.js
import {
  request
} from "../../request/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    teamname: '',
    teamnumber: '',
    teamlabel: '',
    team:[],
    groupname:'',
    userlist:[],
    search:'',
    Inputemp:'',
    sendmember:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var openid=wx.getStorageSync("openid");
       this.getInfo()
      
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
  addmember:function(e){
      var index=e.currentTarget.dataset.index;
      var openid=wx.getStorageSync("openid");
      var teammate=[]
      var tourist_play=this.data.userlist[index];
      var sendmember=this.data.sendmember;
      sendmember.push(index)
      teammate.push(tourist_play)
      let newDate={
        players:JSON.stringify(teammate)
     }
     request({
        url: "http://localhost:8080/OlineLine/teamanage",
        method: "POST",
        data: {
          tourist_play:newDate.players,
          openidS:openid,
          type: 'add'
        },
        header: {
           'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(result => { 
         console.log(result)
         this.setData({
           sendmember:sendmember
         })
      })
  },
  getInfo:function(){
    var openid=wx.getStorageSync("openid");
    console.log("进入测试阶段")
    console.log(openid)
    request({
      url: "http://localhost:8080/OlineLine/teamlist",
      method: "GET",
      data: {
        openid:openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
      console.log(result)
      var team=result.data.team;
      var groupname=result.data.groupname[0].teamname
        console.log(team)
        if(team.length!=0)
        this.setData({
          team: team,
          groupname:groupname
        })
    })
    /** 
    wx.request({
      url: 'http://localhost:8080/OlineLine/teamlist',
      method: 'GET',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        console.log(res.data)
        var team=res.data.team;
        console.log(team)
        var groupname=res.data.teamname;
        if(team.length!=0)
        this.setData({
          team: team,
          groupname:groupname
        })
      }
    })
    */
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
  //取消搜索
  cancelsearch:function(){
     this.setData({
        search:'',
        Inputemp:''
     })
  },
 //输入昵称搜索
  search:function(e){
      console.log(e.detail.value)
      var Inputemp=e.detail.value.nickname
      request({
        url: "http://localhost:8080/OlineLine/teamanage",
        method: "POST",
        data: {
          nickname:e.detail.value.nickname
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(result => {
        console.log(result)
        var userlist=result.data.userlist
        this.setData({
             userlist:userlist,
             search:userlist.length,
             Inputemp:Inputemp
        })
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
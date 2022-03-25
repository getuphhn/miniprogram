// pages/project/project.js
import {
  request
} from "../../request/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'wxf08c894b885b7ff0',
    secret:'324755076a07332abb5521790b2f2f78',
    access_token:'54_wZpJr-rmYIGmbp2coMQuk2VtekX05x4WIjJ24vs-Zi2G6lI85e8lR4RNRW6rt2Vvbg2Txd6hLGiI1piqqyZpSQOLK7IcKQFVklzh6KyUsphYho2QyRp_7naU0HqAawPNowIqZ5FJ5pRgaonxAVKjAAAVQF',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
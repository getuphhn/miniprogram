// pages/person/person.js
const myaudio = wx.createInnerAudioContext({});
const myaudio1 = wx.createInnerAudioContext({});
Page({

  /**
   * 页面的初始数据
   */
  data: {
        duration:'',
        mode:"60000",
        music:"0",
        time:"4",
        musics:["https://dl.stream.qqmusic.qq.com/C400000gQTGI04cssH.m4a?guid=462258966&vkey=A0E673DD4D9448321BF0BB6749273134D36A5A47A138A845ACDDC29E81EB3825E98020B2181937C115A29BC74AB02379115B83434BA9B1A5&uin=&fromtag=66",
                "https://dl.stream.qqmusic.qq.com/C400002LbzzD3E3Rpj.m4a?guid=1084686445&vkey=6EF506CD944896A6A074E6160B3631B815E56D6FE4ACDD12EFCE1D1DD3CFE18038D929887DA40FF54572231E33C70EB8FD5426B2E2A6E3A6&uin=&fromtag=66",
                "http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=54916976&httpsStatus=1&reqId=f35a0bf0-a44b-11ec-8913-c37997fe62e0"
        ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  modechange:function(e){
    var mode=e.detail.value
    this.setData({
      mode:mode
    })
  },
  timechange:function(e){
    var time=e.detail.value
    this.setData({
      time:time
    })
  },
  musichange:function(e){
    var music=e.detail.value
    console.log(music)
    var musics=this.data.musics;
    if(music*1==0){
      myaudio1.stop()
      myaudio.src=musics[music*1]
      setTimeout(() => {
        myaudio.stop()
      }, 10000);
      myaudio.seek(1/3*228-1)
      myaudio.play();
    }else{
       myaudio.stop()
       myaudio1.src=musics[music*1]
       setTimeout(() => {
        myaudio1.stop()
      }, 10000);
       myaudio1.seek(1/3*228-1)
       myaudio1.play()
    }
    this.setData({
      music:music
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
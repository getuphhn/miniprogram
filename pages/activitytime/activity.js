Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: [],
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    days: [],
    year: 0,
    mouth: 0,
    nowDate:'',
    activities:[],
    listdate:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.dateData();
    var myDate = new Date();//获取系统当前时间
    var nowDate = myDate.getDate();
    wx.request({
      url:'http://localhost:8080/OlineLine/servlet/activity',
      data:{
        date:"listdate"
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res.data)

        console.log(res.data[0].date.substring(8,10))
        that.setData({
          listdate:res.data,
        })
      }
    })


    that.setData({
      nowDate:nowDate,
      color:1
    })
    console.log(nowDate)
  },
  // 点击日期事件
  selDate:function(e){
    let that = this
    // 日期 年月日
    var seldate = e.currentTarget.dataset.date
    // 天
    var selday = e.currentTarget.dataset.day
    console.log(seldate)
    wx.request({
      url:'http://localhost:8080/OlineLine/servlet/activity',
      data:{
        date:seldate,
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        //console.log(res.data[1].time)
        that.setData({
          activities:res.data,
        })
      }
    })
    that.setData({
      nowDate: selday
    })
  },

  //用户点击减少月份
  minusMouth: function () {
    var mouth;
    var year;
    mouth = this.data.mouth
    year = this.data.year
    mouth--
    if (mouth < 1) {
      mouth = 12
      year--
    }
    this.updateDays(year, mouth)
  },
  //用户点击增加月份
  plusMouth: function () {
    var mouth;
    var year;
    mouth = this.data.mouth
    year = this.data.year
    mouth++
    if (mouth > 12) {
      mouth = 1
      year++
    }
    this.updateDays(year, mouth)
  },
  dateData: function () {
    var date = new Date();
    var days = [];
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    this.updateDays(year, mouth)

  },
  updateDays: function (year, mouth) {
    var days = [];
    var dateDay, dateWeek;
    // 根据日期获取每个月有多少天
    var getDateDay = function (year, mouth) {
      return new Date(year, mouth, 0).getDate();
    }
    //根据日期获取这天是周几
    var getDateWeek = function (year, mouth) {

      return new Date(year, mouth - 1, 1).getDay();
    }

    dateDay = getDateDay(year, mouth)
    dateWeek = getDateWeek(year, mouth)

    // console.log(dateDay);
    // console.log(dateWeek);
    //向数组中添加天
    for (let index = 1; index <= dateDay; index++) {
      days.push(index)
    }
    //向数组中添加，一号之前应该空出的空格
    for (let index = 1; index <= dateWeek; index++) {
      days.unshift(0)
    }
    this.setData({
      days: days,
      year: year,
      mouth: mouth,
    })
  }
})
 
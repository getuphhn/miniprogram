// pages/ticketpurchase/ticket.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      images:['https://s4.ax1x.com/2022/02/03/HEvBgU.jpg',
              'https://s4.ax1x.com/2022/02/03/HEvTDH.jpg',
              'https://s4.ax1x.com/2022/02/03/HEvoKe.jpg',
              'https://s4.ax1x.com/2022/02/03/HEvL5t.jpg',
               'https://s4.ax1x.com/2022/02/03/HViXj0.jpg'],//轮播图片
      currentData:0,      //滑块赋值
      prices:[278,200,180,500,560,700],    //各种门票价格
     
      num:[0,0,0,0,0,0],   //各种商品数量
      showdate:[],  //显示的日期
      now_date:[],  //今天的日期
      hasEmptyGrid: false,  //判断星期
      cur_year: '', //当前选择的年份
      cur_month: '',  //当前选择的月份
      condition:'none', //当前日期选项卡状态
      money_count:0,  //总计价格
      choose_date:'', //预定的日期
      ticketskind:['单人票','学生票','儿童票','白金年卡','黄金年卡','至尊年卡'],
      goods:[],    //预定的商品
      showbuckets:'false'
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setNowDate();
    this.show_date();
  },
//获取当前滑块index
bindchange:function(e){
  const that  = this;
  that.setData({
    currentData: e.detail.current
  })
},
choose_date:function(e){
     console.log(e.currentTarget.dataset.date)
     this.setData({
        choose_date:e.currentTarget.dataset.date
     })
},
show_date:function(){
   var today=`今天${this.data.cur_month}月${this.data.todayIndex + 1}日`;
   var tomorrow=`明天${this.data.cur_month}月${this.data.todayIndex + 2}日`;
   var dayaftertomorrow=`后天${this.data.cur_month}月${this.data.todayIndex + 3}日`;
   var showdate=[today,tomorrow,dayaftertomorrow]
   var now_month= this.data.cur_month
   var now_day=this.data.todayIndex
   var now_year=this.data.cur_year
   var showdate=[today,tomorrow,dayaftertomorrow]
   var now_date=[now_year,now_month,now_day]
   this.setData({
     showdate:showdate,
     now_date:now_date
   })
},
//点击切换，滑块index赋值
checkCurrent:function(e){
      const that=this;
      if(that.data.currentDta==e.target.dataset.current){
          return false;
      }else{
        that.setData({
           currentData:e.target.dataset.current
        })
      }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
   moredate:function(){
      this.setData({
         condition:'flex'
      }) 
   },
   selectdate:function(){
    var choose_date=''
    var today= `${this.data.cur_year}-${this.data.cur_month}-${this.data.todayIndex + 1}`
    var tomorrow=`${this.data.cur_year}-${this.data.cur_month}-${this.data.todayIndex + 2}`;
    var dayaftertomorrow=`${this.data.cur_year}-${this.data.cur_month}-${this.data.todayIndex+ 3}`;
    if(this.data.cur_year==this.data.now_date[0]
      &&this.data.cur_month==this.data.now_date[1]
      &&this.data.now_date[2]<=this.data.todayIndex
      &&this.data.todayIndex<=this.data.now_date[2]+2){
        today=`今天${this.data.now_date[1]}月${this.data.now_date[2] + 1}日`;
        tomorrow=`明天${this.data.now_date[1]}月${this.data.now_date[2] + 2}日`;
        dayaftertomorrow=`后天${this.data.now_date[1]}月${this.data.now_date[2] + 3}日`;
        if(this.data.todayIndex==this.data.now_date[2]){
          choose_date=today
        }else if(this.data.todayIndex==this.data.now_date[2]+1){
          choose_date=tomorrow
        }else{
          choose_date=dayaftertomorrow
        }
     
      }
    var showdate=[today,tomorrow,dayaftertomorrow]
   if(choose_date==''){
     choose_date=today
   }
     this.setData({
       showdate:showdate,
       condition:'none',
       choose_date:choose_date
     })
   },
    //选择预定日期
    dateSelectAction: function (e) {
      var cur_day = e.currentTarget.dataset.idx;
      var cur_year=this.data.cur_year;
      var cur_month=this.data.cur_month;
      var now_date=this.data.now_date;
      if((cur_day>=now_date[2]&&cur_year==now_date[0]&&cur_month==now_date[1])||cur_year>now_date[0]||(cur_year==now_date[0]&&cur_month>now_date[1]))
      this.setData({
        todayIndex: cur_day
      })
       
    },
   
    setNowDate: function () {
      const date = new Date();
      const cur_year = date.getFullYear();
      const cur_month = date.getMonth() + 1;
      const todayIndex = date.getDate() - 1;
      //星期
      const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
      this.calculateEmptyGrids(cur_year, cur_month);
      this.calculateDays(cur_year, cur_month);
      this.setData({
        cur_year: cur_year,
        cur_month: cur_month,
        weeks_ch,
        todayIndex,
      })
    },
    getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    },
    //当年当月第一天是星期几
    getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },
    calculateEmptyGrids(year, month) {
      const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
      let empytGrids = [];
      if (firstDayOfWeek > 0) {
        for (let i = 0; i < firstDayOfWeek; i++) {
          empytGrids.push(i);
        }
        this.setData({
          hasEmptyGrid: true,
          empytGrids //未知
        });
      } else {
        this.setData({
          hasEmptyGrid: false,
          empytGrids: []
        });
      }
    },
    calculateDays(year, month) {
      let days = [];
    //获取本月天数
      const thisMonthDays = this.getThisMonthDays(year, month);
      
      for (let i = 1; i <= thisMonthDays; i++) {
        days.push(i);
      }
   
      this.setData({
        days
      });
    },
    handleCalendar(e) {
      const handle = e.currentTarget.dataset.handle;
      const cur_year = this.data.cur_year;
      const cur_month = this.data.cur_month;
      var now_date=this.data.now_date;
      if (handle === 'prev') {
        let newMonth = cur_month - 1;
        let newYear = cur_year;
        if (newMonth < 1) {
          newYear = cur_year - 1;
          newMonth = 12;
        }
        if(newYear==now_date[0]&&newMonth>=now_date[1]||newYear>now_date[0]){
        this.calculateDays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);
        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        })
        }
      } else {
        let newMonth = cur_month + 1;
        let newYear = cur_year;
        if (newMonth > 12) {
          newYear = cur_year + 1;
          newMonth = 1;
        }
   
        this.calculateDays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);
        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        })
      }
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
  reduce:function(e){
    var index=e.currentTarget.dataset.index
    var num=this.data.num
    var prices=this.data.prices
    var ticketskind=this.data.ticketskind
    var goods=this.data.goods
    if(num[index]>0){
       num[index]=num[index]-1
       if(num[index]==0)
          for(var i=0;i<goods.length;i++){
                if(goods[i].name==ticketskind[index])
                 goods.splice(i,1)
          }
        else{
          for(var j=0;j<goods.length;j++){
             if(goods[j].name==ticketskind[index])
                goods[j].number=num[index]
          }
        }
    } 
    var money_count=0
       for(var i=0;i<prices.length;i++){
           money_count=money_count+prices[i]*num[i]
       }
    
    this.setData({
       num:num,
       money_count:money_count,
       goods:goods
    })
  },
  add:function(e){
    var index=e.currentTarget.dataset.index
    var num=this.data.num
    var prices=this.data.prices
    var goods=this.data.goods
    var ticketskind=this.data.ticketskind
    var flag='false'
    num[index]=num[index]+1
    
    for(var i=0;i<goods.length;i++){
        if(goods[i].name==ticketskind[index]){
            goods[i].number=num[index]
            flag='true'
            break;
        
       }
    }
    if(flag=='false'){
      var new_goods={name:ticketskind[index],number:1,price:prices[index]}
      goods.push(new_goods)
    }
    var money_count=0
    for(var i=0;i<prices.length;i++){
        money_count=money_count+prices[i]*num[i]
    }
    
    this.setData({
      num:num,
      money_count:money_count,
      goods:goods
   })
  },
  checkbuckets:function(){
    var num=this.data.num
    var showbuckets=this.data.showbuckets
    if(num[0]+num[1]+num[2]!=0){
      showbuckets='true'
    }
    this.setData({
      showbuckets:showbuckets
    })
  },
  backpage:function(){
    var showbuckets='false'
    this.setData({
      showbuckets:showbuckets
    })
  },
  getInfo:function(){
    var goods=this.data.goods
    var num=this.data.num
    var money_count=this.data.money_count
    var number=num[0]+num[1]+num[2]
    var choose_date=this.data.choose_date
    if(goods.length==0||choose_date==''){
      
    }else{
      wx.navigateTo({
        url: '../OrderInfo/OrderInfo?goods='+JSON.stringify(goods)+'&money_count='+money_count+'&choose_date='+choose_date+'&number='+number
      })
    }
  }
})
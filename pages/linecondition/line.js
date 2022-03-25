// pages/linecondition/line.js
import * as echarts from '../../ec-canvas/echarts';

let chart = null;
let data = [];
let now = new Date();
let oneDay = 3600 * 1000;
let value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
        data.push(randomData());
}
function randomData() {
  now = new Date(+now + oneDay);
  value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(),now.getMonth()+1, now.getDate()].join('/'),
      Math.round(value)
    ]
  };
}
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var  option = {
    title: {
      text: '各项目排队人数',
      left: "center",
      top: "4%",
      textStyle: {
        fontSize: 20,
      },
    },
    legend:{
       show:true
    },
    grid:{
       left:'25%'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    yAxis: {
      type: 'category',
      data: ['霸天虎过山车', '擎天柱乐园', '小黄人世界', '恐龙大冒险', '火种争夺战'],
      axisLabel: {
        color: 'black',
        fontSize:10
      },
    },
    xAxis: {
      type: 'value',
      max:500,
      axisLine: {
        show: true
      },
      interval: 100
    },
    series: [
      {
        data: [123, 290, 340, 420, 500],
        type: 'bar',
        itemStyle: {
                normal: {
                     color: function(params) {
                  // 给出颜色组
                            var colorList = ['blue','blue','blue','red','red'];
                            return colorList[params.dataIndex]
                     },
                     label: {
                            show: true, //开启显示
                            position: 'right', //在上方显示
                            textStyle: { //数值样式
                            color: 'black',
                            fontSize: 10
                      }
                    }
                }
        }
      }
    ]
  };
  chart.setOption(option);
  return chart;
}
function getScatterOption(canvas, width, height, dpr) {
  const scatterChart = echarts.init(canvas, null, {
         width: width,
         height: height,
         devicePixelRatio: dpr // new
       });
      canvas.setChart(scatterChart);
      var option = {
        title: {
          text: '同时段预约人数',
          left: "center",
          top: "4%",
          textStyle: {
             fontSize: 20,
          },
        },
        grid:{
          left:'15%'
       },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              '/' +
              (date.getMonth() + 1) +
              '/' +
              date.getFullYear() +
              ' : ' +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: true
          },
          show:true,
          axisLine: {show:true},
          axisTick: {show:false},
        },
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ]
      };
      setInterval(function () {
        for (var i = 0; i < 5; i++) {
          data.shift();
          data.push(randomData());
        }
        scatterChart.setOption({
          series: [
            {
              data: data
            }
          ]
        });
      }, 1000);
      scatterChart.setOption(option);
      return  scatterChart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    ecScatter: {
      onInit:getScatterOption
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
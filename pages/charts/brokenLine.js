import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '不同时段园区内游客数量',
      left: 'center'
    },
    grid: {
       left:'15%'

    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
      // show: false
    },
    yAxis: {
      type: 'value',
      show:true,
      scale:true,
      axisLine: {show:true},
      axisTick: {show:false},
   },
    series: [{
      name: '游客数量',
      type: 'line',
      smooth: true,
      data: [56000, 65000, 63000, 64300, 60000,62000, 58000]
    }]
  };
  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});

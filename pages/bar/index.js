import * as echarts from '../../ec-canvas/echarts';
let chart = null;
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['擎天柱乐园', '小黄人乐园', '霸天虎过山车', '火种争夺战', '恐龙大冒险'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: 'black',
          fontSize:10
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190],
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
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
  var option;

option = {
  title:{
    text: "好评度比较",
    left: "4%",
    top: "4%",
  },
  legend: {
    top: 'bottom'
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [20, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle : {
        //普通样式设置 重置一些样式
        normal : {
            //取消指示提示文字
            label : {
                show : false
            },
            //取消指示提示线
            labelLine : {
                show : false,
                length:20,
                length2:23
            }
        },
        emphasis : {
          label : {
              show : false
          },
          labelLine : {
              show : true,
              shadowBlur: 10,
              shadowOffsetX: 0,
          }
      }
      },
      data: [
        { value: 0.3, name: '恐龙大冒险' },
        { value: 0.2, name: '火种争夺战' },
        { value: 0.1, name: '霸天虎过山车' },
        { value: 0.3, name: '小黄人世界' },
        { value: 0.1, name: '擎天柱乐园' }
      ]
    }
  ]
};
  scatterChart.setOption(option);
  return  scatterChart;
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
    }, 
    ecScatter: {
      onInit:getScatterOption
    }
    
  },
  
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  }
});

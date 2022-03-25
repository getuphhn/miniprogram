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
      text: '游乐园可视化数据',
      left: "center",
      top: "4%",
      textStyle: {
        fontSize: 30,
        color:"rgba(45, 99, 237, 1)"
      },
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        force:{
            repulsion:3000,
            edgeLength:50
        },
        symbolSize: 50,
        roam: true,
        scaleLimit:{                       //所属组件的z分层，z值小的图形会被z值大的图形覆盖
         min:0.5,                          //最小的缩放值
         max:3, 
        },
        label: {
          normal: {
            show: true
          }
        },
        lineStyle:{
           normal:{
             opacity:0.9,
             width:5,
             curveness:0
           }
        },
        categories:[{
           name:'0'  
        },{
           name:'1'
        },{
          name:'2'
        },{
          name:'3'
        }],
        // edgeSymbol: ['circle', 'arrow'],
        // edgeSymbolSize: [4, 10],
        
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 20
            }
          }
        },
        data: [{
          name: '园区人流',
          symbolSize:50,
          draggable:true,
          x:150,
          y:350,
          category:0,
          itemStyle: {
            normal:{
              color: '#001c43',
              shadowColor:'#04f2a7',
              shadowBlur:20,
              borderColor:'#04f2a7',
              borderWidth:4,
            }
          }
        }, {
          name: '项目热度',
          x:50,
          y:250,
          symbolSize:50,
          draggable:true,
          category:1,
          itemStyle: {
            normal:{
              color: '#001c43',
              shadowColor:'#04f2a7',
              shadowBlur:20,
              borderColor:'#04f2a7',
              borderWidth:4
            }
          }
        }, {
          name: '排队情况',
          x:350,
          y:150,
          symbolSize:50,
          draggable:true,
          category:2,
          itemStyle: {
            normal:{
              color: '#001c43',
              shadowColor:'#04f2a7',
              shadowBlur:20,
              borderColor:'#04f2a7',
              borderWidth:4
            }
          }
        }, {
          name: '历史数据',
          x:300,
          y:250,
          symbolSize:50,
          draggable:true,
          category:3,
          itemStyle: {
            normal:{
              color: '#001c43',
              shadowColor:'#04f2a7',
              shadowBlur:20,
              borderColor:'#04f2a7',
              borderWidth:4
            }
          }
        }],
        links: [{
          source: "历史数据",
          target: "园区人流",
          label: {
            normal: {
              show: false
            }
          },
          lineStyle: {
            normal: {
              width: 4,
              curveness: 0.2
            }
          }
        }, {
          source: '排队情况',
          target: '项目热度',
          label: {
            normal: {
              show: false
            }
          },
          lineStyle: {
            normal: {
              width: 4,
              curveness: 0.2
            }
          }
        }, {
          source: '项目热度',
          target: '历史数据'
        }, {
          source: '园区人流',
          target: '排队情况'
        }],
        lineStyle: {
          normal: {
            width: 4,
            curveness: 0.2
          }
        }
      }
    ]
  };

  chart.setOption(option);
  chart.on('click', function (params) {
  if(params.name!=null){
       if(params.name=="历史数据"){
             wx.navigateTo({
                url: '../project/project',
             })
       }else if(params.name=="项目热度"){
              wx.navigateTo({
                  url: '../bar/index',
              })
       }else if(params.name=="园区人流"){
              wx.navigateTo({
                 url: '../charts/brokenLine',
              })
       }else if(params.name=="排队情况"){
               wx.navigateTo({
                  url: '../linecondition/line',
              })
       }
  }
   
});
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

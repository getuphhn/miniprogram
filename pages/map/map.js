// pages/map/map.js
var QQMapWX = require('../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
    key: 'D5ZBZ-F4MC6-UMPSS-ERGAS-K5FZQ-A4BYN'
});
var app = getApp()
var maps = [
    [{
            id: 1,
            latitude: 39.867227,
            longitude: 116.490111
        }, {
            id: 2,
            latitude: 39.866674,
            longitude: 116.490678
        }, {
            id: 3,
            latitude: 39.867632,
            longitude: 116.491154
        }, {
            id: 4,
            latitude: 39.867997,
            longitude: 116.491321
        }, {
            id: 5,
            latitude: 39.86905,
            longitude: 116.492659
        }, {
            id: 6,
            latitude: 39.868596,
            longitude: 116.493894
        }, {
            id: 7,
            latitude: 39.869035,
            longitude: 116.494215
        },
        {
            id: 8,
            latitude: 39.86854,
            longitude: 116.494721
        }, {
            id: 9,
            latitude: 39.869297,
            longitude: 116.495782
        }, {
            id: 10,
            latitude: 39.869316,
            longitude: 116.497855
        }, {
            id: 11,
            latitude: 39.868346,
            longitude: 116.497628
        }, {
            id: 12,
            latitude: 39.866774,
            longitude: 116.497994
        }, {
            id: 13,
            latitude: 39.86585,
            longitude: 116.496954
        }, {
            id: 14,
            latitude: 39.866442,
            longitude: 116.495299
        }, {
            id: 15,
            latitude: 39.866452,
            longitude: 116.493162
        }, {
            id: 16,
            latitude: 39.867907,
            longitude: 116.495501,
        },
    ],
    [{
        id: 1,
        latitude: 39.868032,
        longitude: 116.490997
    }, {
        id: 2,
        latitude: 39.867505,
        longitude: 116.490852
    }, {
        id: 3,
        latitude: 39.866245,
        longitude: 116.492967
    }, {
        id: 4,
        latitude: 39.866232,
        longitude: 116.495107
    }, {
        id: 5,
        latitude: 39.867767,
        longitude: 116.494895
    }],
    [{
        id: 1,
        latitude: 39.867071,
        longitude: 116.490858
    }, {
        id: 2,
        latitude: 39.865932,
        longitude: 116.495757
    }, {
        id: 3,
        latitude: 39.869038,
        longitude: 116.494343
    }],
    [{
        id: 1,
        latitude: 39.866086,
        longitude: 116.493771
    }, {
        id: 2,
        latitude: 39.865904,
        longitude: 116.494607
    }, {
        id: 3,
        latitude: 39.865808,
        longitude: 116.496307
    }, {
        id: 4,
        latitude: 39.86683,
        longitude: 116.497532
    }, {
        id: 5,
        latitude: 39.866964,
        longitude: 116.496206
    }]
]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        scrollLeft: 0,
        key: "D5ZBZ-F4MC6-UMPSS-ERGAS-K5FZQ-A4BYN",
        latitude: "39.867629",
        longitude: "116.494583",
        speed: '',
        accuracy: '',
        scale: 16,
        scrollTop: 0,
        isChecked: true,
        isSpread: true,
        polygon: [{

        }],
        markers: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        clearInterval(this.data.setInter)
        app.authorization()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.mapCtx = wx.createMapContext('mmap')
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
        clearInterval(this.data.setInter)
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
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
            markers: maps[e.currentTarget.dataset.id]
        })
    },
    //点击标记点事件
    bindmarkertap(e) {
        var _this = this;
        //获取标记点id
        var markerId = Number(e.markerId)
        //获取标记点坐标
        var location = _this.data.markers[markerId - 1].latitude + ',' + _this.data.markers[markerId - 1].longitude
        console.log(location)
        //存储当前点击标记点的坐标，供下一步导航使用
        _this.setData({
            markerLocation: location
        })
        qqmapsdk.calculateDistance({
            //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
            //from参数不填默认当前地址
            from: '', //若起点有数据则采用起点坐标，若为空默认当前地址
            to: location, //终点坐标
            success: function (res) { //成功后的回调
                var res = res.result;
                var dis = res.elements[0].distance; //返回的距离
                _this.setData({ //设置并更新distance数据
                    distance: dis
                });
            },
            fail: function (error) {
                console.error(error);
            },
            complete: function (res) {
                console.log(res);
            }
        });
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    //导航规划路线
    navigate() {
        var _this = this
        wx.startLocationUpdate({
            success: (res) => {
                _this.navigation()
                _this.data.setInter = setInterval(function () {
                    _this.navigation()
                }, 10000) //循环间隔 单位ms
                console.log('startLocationUpdate-res', res)
            },
            fail: (err) => {
                console.log(err)
            }
        })
    },
    navigation(e) {
        var _this = this;
        _this.hideModal()
        //调用距离计算接口
        qqmapsdk.direction({
            mode: 'walking', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
            //from参数不填默认当前地址
            from: '',
            to: _this.data.markerLocation,
            success: function (res) {
                console.log(res);
                var ret = res;
                var coors = ret.result.routes[0].polyline,
                    pl = [];
                //坐标解压（返回的点串坐标，通过前向差分进行压缩）
                var kr = 1000000;
                for (var i = 2; i < coors.length; i++) {
                    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                }
                //将解压后的坐标放入点串数组pl中
                for (var i = 0; i < coors.length; i += 2) {
                    pl.push({
                        latitude: coors[i],
                        longitude: coors[i + 1]
                    })
                }
                console.log(pl)
                //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
                _this.setData({
                    latitude: pl[0].latitude,
                    longitude: pl[0].longitude,
                    polyline: [{
                        points: pl,
                        color: '#FF0000DD',
                        width: 4
                    }]
                })
            },
            fail: function (error) {
                console.error(error);
            },
            complete: function (res) {
                console.log(res);
            }
        });
    },
    //回到自己位置
    locationing: function () {

        wx.getLocation({
            type: 'gcj02',
            altitude: true, //高精度定位
            //定位成功，更新定位结果
            success: res => {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                this.setData({
                    longitude: longitude,
                    latitude: latitude,
                    speed: speed,
                    accuracy: accuracy
                })
            }
        })
    },
})
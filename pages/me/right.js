Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardCur: 0,
        level: 0,
        leveldata: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getLevel()
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

    },
    // cardSwiper
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },
    //获取用户等级和成长值
    getLevel() {
        wx.request({
            url: 'http://localhost:8080/OlineLine/info',
            method: 'GET',
            data:{
                openid:wx.getStorageSync('openid')
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success:res=>{
                this.setData({
                    level:res.data.user.level,
                    leveldata:res.data.user.leveldata
                })
            }
        })
    }
})


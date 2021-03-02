// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mappreviewImg:['https://6368-chongyou-j5687-1301931077.tcb.qcloud.la/handmap1.gif?sign=ac4450b4d19b4a04c5e94723628b6a1e&t=1591980394'],
    mapImg:['https://6368-chongyou-j5687-1301931077.tcb.qcloud.la/handmap123.jpg?sign=35faaeb1d70d802b0e2d7b852cdddb08&t=1591980546'],
  },
  previewImage: function (e) {  
    var current=this.data.mappreviewImg;
    wx.previewImage({
          current:current,
          urls:this.data.mappreviewImg // 需要预览的图片https链接列表
    })
},
  goToUs:function(e){
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  },
  goToInt:function(e){
    wx.navigateTo({
      url: '/pages/introduce/introduce',
    })
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
    this.app = getApp()
    this.app.slideupshow(this,'slide_up1', -30,1)
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  //页面隐藏时，触发渐出动画
  onHide: function () {
    this.app.slideupshow(this,'slide_up1',30, 0)
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
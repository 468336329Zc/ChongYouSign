// pages/replace/replace.js
const db = wx.cloud.database()
const accountCollection = db.collection("location")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju:'',
    istoright: true,
    scrollHeight:'',
    inputValue: '',
    viewShow:''
  },
  Beitihuan:function(e){
    var id=e.currentTarget.dataset.id;
    //替换服务消息通知
    db.collection('location').where({
      _id:id,
    }).get({
      success:function(res){
        var user_id=res.data;
        that.send(-1,user_id); // -1是失败  2是被推荐  1是成功
      }
    })
    var that=this;
    let tongguo=that.data.shuju
    //console.log(tongguo)

    var xiuyi1=that.data.shuju;
   //var xiuyi11=that.data.shuju.store_pics
   var total=60
   const batchTimes = Math.ceil(total / 20)
    for(let cc=0; cc<xiuyi1.length;cc++)
    {
      if(that.data.shuju[cc]["_id"]==id)
      {
        console.log("数据库id",that.data.shuju[cc]["_id"])
        console.log("前端的id",id)
        for(let pic=0; pic<that.data.shuju[cc].store_pics.length;pic++)
        {
          wx.cloud.deleteFile({
            fileList:[that.data.shuju[cc].store_pics[pic].path],
          }).then(res => {
          }).catch(error => {
          })
        }
        }
  }
  
      for(let j=0;j<tongguo.length;j++){
        if(tongguo[j]["_id"]==id){
          tongguo.splice(j,1)
        }
      }
      this.setData({
        shuju:tongguo
      })

  for(let i=0 ;i<batchTimes;i++){
    accountCollection.skip(i*20).where({
      _id:id
    }).remove()
  }

  
  
  },

  
  //发送消息
  send:function(type,user_id){
    wx.cloud.callFunction({
      name:'msgpost',
      data:{
        user:user_id,
        type:type,
      }
    }).then(res=>{
      
      console.log("发送消息成功",res)
    }).catch(res=>{
      console.log("推送消息发送失败",res)
    })
  
  },
  Top:function(e){
    var id=e.currentTarget.dataset.id;
    //被推荐top服务消息通知
    db.collection('location').where({
      _id:id,
    }).get({
      success:function(res){
       var  user_id=res.data;
        that.send(2,user_id)  //被推荐top
      }
    })
    var that=this
    let tongguo=that.data.shuju
    console.log(tongguo)
    for(let j=0;j<tongguo.length;j++){
      if(tongguo[j]["_id"]==id){
        tongguo.splice(j,1)
      }
    }
    this.setData({
      shuju:tongguo
    })
    var total=60
    const batchTimes = Math.ceil(total / 20)
    for(let i=0 ;i<batchTimes;i++){
     
      accountCollection.skip(i*20).where({
        _id:id
      }).update({
       data:{
        status_p1: '1',
       }
       })
    }

 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var total=60
    var x=0
    const batchTimes = Math.ceil(total / 20)
    console.log("需要查询次数",batchTimes)   //获取需要获取几次 
    var arraypro=[]          // 定义空数据 用来存储之后的数据
    wx.getSystemInfo({
      success: function (res) {
        
        that.setData({
          scrollHeight: res.screenHeight
        })
      }
    });
  
    //查询全部
   for(let i=0 ;i<batchTimes;i++){
     x++
    accountCollection.skip(i*20).where({
      status_l: '1',
    }).get().then(rs => {
      for (let j = 0; j <rs.data.length; j++) {
        arraypro.push(rs.data[j])
      }
      if(x==3){
        this.setData({
          shuju:arraypro
        })
        console.log("打印arraypro",arraypro)     
      }
    });
   }
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
    clearTimeout(Delay1)
    clearTimeout(Delay2)
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
// const db = wx.cloud.database()
// const accountCollection = db.collection("location")
App({
  data:{
    shuju:'',
    istoright: true,
    inputValue: '',
    viewShowed: false, //显示结果view的状态
    inputVal: "", // 搜索框值
    catList: [], //搜索渲染推荐数据
   // list1: "", //从云数据库存储的值
    list1: "",
    shenhe1:'' ,//中间值
    id:''

  },
  globalData:{
    arrayprotop:'',
    arraypro:'',
    json:'',
    arrayprojd:'',
    arrayprokd:'',
    arrayproxy:'',
    arrayprojxl:'',
    arrayprost:'',
    arrayproqt:'',
    list1:'',
    screenHeight:'',
    screenWidth:'',
    global1:'',
    globalzan:[],
    areacount:'',
  },
  //渐入，渐出实现 
  show : function(that,param,opacity){
    var animation = wx.createAnimation({
      //持续时间1500ms
      duration: 1500,
      timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

   //滑动渐入渐出
   slideupshow:function(that,param,px,opacity){
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}';
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },
   //向上滑动渐入渐出
   slideupshow1:function(that,param,px,opacity){
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.opacity(opacity).translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}';
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  onLaunch: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var screenWidth = res.windowWidth;
        var screenHeight = res.windowHeight;
        that.globalData.screenWidth = screenWidth;
        that.globalData.screenHeight = screenHeight
      }

    });
    if (wx.cloud) {
      wx.cloud.init({
        env: "chongyou-j5687",//云环境的名字，这里写云环境名对应的id；
        traceUser: true,  //用户跟踪，看谁使用了我的云环境


      })
    }  
  },



})

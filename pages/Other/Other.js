// pages/Other/Other.js
const db = wx.cloud.database()
const accountCollection = db.collection("location")
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  //var app=getApp(),
  data: {
   
    shuju:'',
    istoright: true,
    scrollHeight:'',
    inputValue: '',
    viewShowed: false, //显示结果view的状态
    inputVal: "", // 搜索框值
    catList: [], //搜索渲染推荐数据
   // list1: "", //从云数据库存储的值
    //list1: "",
  //  shenhe1:'' ,//中间值
    id:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    tap_ch: function (e) {
      if (this.data.open) {
        this.setData({
          open: false
        });
      } else {
        this.setData({
          open: true
        });
      }
    },
    tap_start: function (e) {
      // touchstart事件
      this.data.mark = this.data.newmark = e.touches[0].pageX;
    },
    tap_drag: function (e) {
      // touchmove事件

      /*
       * 手指从左向右移动
       * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
       */
      this.data.newmark = e.touches[0].pageX;
      if (this.data.mark < this.data.newmark) {
        this.istoright = true;
      }
      /*
       * 手指从右向左移动
       * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
       */
      if (this.data.mark > this.data.newmark) {
        this.istoright = false;

      }
      this.data.mark = this.data.newmark;

    },
    tap_end: function (e) {
      // touchend事件
      this.data.mark = 0;
      this.data.newmark = 0;
      if (this.istoright) {
        this.setData({
          open: true
        });
      } else {
        this.setData({
          open: false
        });
      }
    },
    //点击搜索事件
    goToDetail1: function (e) {
      //获取携带data-id的数据
      var that=this;
      let area = e.currentTarget.dataset.area;
      var app=getApp()
      var didian=app.globalData.arraypro
      for(let bb=0;bb<didian.length;bb++){
        if(area==didian[bb].store_area)
        {
          wx.navigateTo({
        url: '../detail/detail?id=' + didian[bb]["_id"],
      })
      break;
        }
      }
    },
    goToDetail: function (e) {
      //获取携带data-id的数据
      var that=this;
      let area = e.currentTarget.dataset.area;
      var app=getApp()
      var didian=app.globalData.arrayproqt
      for(let bb=0;bb<didian.length;bb++){
        if(area==didian[bb].store_area)
        {
          wx.navigateTo({
        url: '../detail/detail?id=' + didian[bb]["_id"],
      })
      break;
        }
      }

   
    },


    Favorite:function(e){
      var count= e.currentTarget.dataset.count;
      var app=getApp();
      var top1=app.globalData.arrayproqt
      var count1=count
      let iddzan="xxx"
      var idd=app.globalData.globalzan
      for(let i=0;i<idd.length;i++){
        if(count1==idd[i].count){
           iddzan=idd[i]._id
        }
      }
      for(let i=0;i<top1.length;i++){
        if(count1==top1[i].count){
          if(top1[i].status_z==0){
          app.globalData.arrayproqt[i].store_like+=1
           app.globalData.arrayproqt[i].status_z=1
           wx.cloud.callFunction({
            name:"updatazan",
            data:{
              flag:1,
              _id: iddzan
            },
          })
          //修改locationn
          wx.cloud.callFunction({
            name:"updatellike",
            data:{
              store_like:app.globalData.arrayproqt[i].store_like,
              _id:app.globalData.arrayproqt[i]._id 
            },
          })
          }else{
            app.globalData.arrayproqt[i].store_like-=1
           app.globalData.arrayproqt[i].status_z=0
           wx.cloud.callFunction({
            name:"updatazan",
            data:{
              flag:0,
              _id:iddzan   
            },
          })
          //修改locationn
          wx.cloud.callFunction({
            name:"updatellike",
            data:{
              store_like:app.globalData.arrayproqt[i].store_like,
              _id:app.globalData.arrayproqt[i]._id 
            },
          })
          }
          this.setData({
            shuju:app.globalData.arrayproqt,
          })
        }
      }

      var animation = wx.createAnimation({
        duration: 50,
        timingFunction: 'ease',
        delay: 10
       });
       animation.scale(1, 2).step().rotate(30).step().rotate(0).step().scale(1,1).step()
      this.setData({
        animation:animation.export()
      })
  },





    goToAdmin:function(e){
      wx.navigateTo({
        url:  '/pages/jump/jump',
      })
  },
    goToEditor:function(e){
      wx.navigateTo({
        url:'../editor/editor',
      })
    },
    goToJingDian:function(e){
      wx.reLaunch({
        url: '/pages/JingDian/JingDian',
      })
    },
    goToTeachBuild:function(e){
      wx.reLaunch({
        url: '/pages/TeachBuild/TeachBuild',
      })
    },
    goToXueYuan:function(e){
      wx.reLaunch({
        url: '/pages/XueYuan/XueYuan',
      })
    },
    goToKuaiDi:function(e){
      wx.reLaunch({
        url: '/pages/KuaiDi/KuaiDi',
      })
    },
    goToShiTang:function(e){
      wx.reLaunch({
        url: '/pages/ShiTang/ShiTang',
      })
    },
    goToOther:function(e){
      wx.reLaunch({
        url: '/pages/Other/Other',
      })
    },
     
    bindKeyInput: function (e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    goToTop:function(e){
      wx.reLaunch({
        url:"/pages/top/top",
      })
    },
    
    // 隐藏搜索框样式
    hideInput: function () {
      this.setData({
        inputVal: "",
        viewShowed: false,
      });
    },
    // 键盘抬起事件2
  inputTyping: function(e) {
    var value = e.detail.value
    var that = this;
    var app=getApp()

    var list1 = app.globalData.list1
    if (value == '') {
      that.setData({
        viewShowed: false,
      });
    } else {
      if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
        var arr = [];
        for (var i = 0; i < list1.length; i++) {
          if (list1[i].indexOf(value) >= 0) {
            arr.push(list1[i]);
          }
        }
        that.setData({
          viewShowed: true,
          carList: arr
        });
      }
    }
  },
    // 获取选中推荐列表中的值
    name: function (res) {
      var index = res.currentTarget.dataset.index
      var that = this;
      that.setData({
        inputVal: that.data.carList[index],
        viewShowed: false,
      })
    },
    onShow: function () {
      this.app.slideupshow(this,'slide_up1', -30,1)
    },
    //页面隐藏时，触发渐出动画
    onHide: function () {
      this.app.slideupshow(this,'slide_up1',30, 0)
    },
    onLoad: function (options) {
      this.app=getApp();
      let that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            scrollHeight: res.screenHeight
          })
        }
      });
      var app=getApp()
     this.setData({
       shuju:app.globalData.arrayproqt,
     })
     var screenWidth = that.app.globalData.screenWidth;
     var screenHeight = that.app.globalData.screenHeight;
     var imageWidth = screenWidth;
     var imageHeight = screenHeight;
     this.setData({
         imageHeight: imageHeight-120,
         imageWidth: imageWidth
     });
    },
  
  }
    
})
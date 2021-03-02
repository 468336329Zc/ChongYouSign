// pages/detail/detail.js
const db = wx.cloud.database()
const accountCollection = db.collection("locationn")
wx.cloud.init();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    shuju:{
      psData:[]
    },
    list1:[],
    id:'',
    hiddenmodalput: true,
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    modalinput: function () {
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    },


//留言检测通过之后的操作  
    addafterliuyan:function(){
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
      if(this.data.inputVal!=null){
        wx.showToast({
          title: '留言成功',
          icon:"success",
          duration:500
        })
        var app=getApp()
        var that=this;
        var liuyana=[]
       // console.log("打印快递数据",app.globalData.arraypro) 
        var kuai=that.data.list1
        var d= {FirstName:this.data.inputVal};//前端获取的值
       //获取参数弄如数组
        for(let i=0;i<kuai.length;i++){
          if(this.data._id==kuai[i]._id){
            liuyana=kuai[i].store_cmt
            if(kuai[i].store_cmt.length==10){
              kuai[i].store_cmt.splice(9,1)
            }
            //liuyana.push(d) 
            liuyana.unshift(d)
            
            kuai[i].store_cmt=liuyana
            that.setData({
              list1:kuai
            })
            //app.globalData.arrayprokd[i].store_cmt=liuyana
            wx.cloud.callFunction({
              name:"updatecmt",
              data:{
                store_cmt:that.data.list1[i]. store_cmt,
                _id:that.data.list1[i]._id
              },
              success(res){
               // console.log("修改赞数据成功",res)
            }, fail(err){
             // console.log("修改赞失败",err)
            }
            })
              }    
        }
      }
    },

    //输入留言触发的函数
    addCmt:function(res){
      var num=res.detail.value.length;
      var that=this;
      if(num>=14 ){
        wx.showToast({
          title: '字数大于13,重新输入',
          icon:"none"
        })
      }else{
        that.setData({
          tmp_comments:res.detail.value
        })
    }
    },

    //留言点击确定之后的操作
    addConf:function(res){
      if(this.data.tmp_comments==null){
          wx.showToast({
            title: '留言不能为空',
            icon:'none',
            duration:500
          })
      }else{
        var that=this;
        wx.request({
          url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=uncibpD6mbVQYSLHpC8gRguI&client_secret=qeja5g5w2QasdmFbtC2Ax4kzKGnUgmc2',
          method:'get',
          success(res){
            wx.request({
              url: 'https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token='+res.data.access_token,
              method:"post",
              data:{
                text:JSON.stringify(that.data.tmp_comments)
              },
              header:{
                "Content-Type":"application/x-www-form-urlencoded"
              },
              success(res){
                console.log(res)
                if(res.data.conclusionType==1 || res.data.conclusionType==3  ){
                  wx.showToast({
                    title: '留言成功',
                    icon:"success",
                    duration:500
                  })
                  that.setData({
                    inputVal:that.data.tmp_comments
                  })
                  //点击确定留言通过之后的操作
                  that.addafterliuyan();
                }else{
                  wx.showToast({
                    title: '内容不合规',
                    icon:'none',
                    image:'../../images/jg.png',
                    duration:1000,
                    mask:true   //遮罩
  
                  })
                }
              }
            }) 
          }
        })
      }
     
    },


    /** 
     * 预览图片
     */
    previewImage: function (e) {  
      var imageList= new Array();
      var current=e.target.dataset.src;
      for(let  x=0;x<this.data.list1[0].store_pics.length;x++){
        imageList.push(this.data.list1[0]["store_pics"][x].path)
      }
    
      wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: imageList // 需要预览的图片http链接列表
      })
  },
    getNavigation: function () {
      let plugin = requirePlugin('routePlan');
      let key = 'ABABZ-RLYCR-R47WM-W674A-H5O5Q-HFBBZ';  //使用在腾讯位置服务申请的key
      let referer = '校园地图-用户端';   //调用插件的app的名称
      let mode = 'walking';
      let startPoint = JSON.stringify({  //终点
        'name': '当前位置',
        'latitude': 29.53460232204861,
        'longitude': 106.6064954969618
    });
      let endPoint = JSON.stringify({  //终点
        'name': this.data.list1[0]["store_area"],
        'latitude': this.data.list1[0]["store_lat"],
        'longitude': this.data.list1[0]["store_lon"]
      });
      wx.navigateTo({
        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&mode=' + mode
      });
    },
    
    onLoad:function(options){
      var that = this;
      let id = options.id;
      console.log("id",id);
      //后端查询当前id的所有信息
      var app=getApp();
      var array1=new Array();//中间变量
      var vv=app.globalData.arraypro
      for(let i=0;i<vv.length;i++){
        if(id==vv[i]._id)
        array1.push({
          "_id":vv[i]._id,
          "store_area":vv[i].store_area,
          "store_info":vv[i].store_info,
          "status_l":vv[i].status_l,
          "store_pics":vv[i].store_pics,
          "store_lon":vv[i].store_lon,
          "store_lat":vv[i].store_lat,
          "store_cmt":vv[i].store_cmt
        })
        this.setData({
          list1:array1,  //获取该id的所有信息
          _id:id
        })
      }

        
        var that = this;
        this.app = getApp();
      //   accountCollection.where({
      //     _id:id
      // }).get().then(res=>{
      //    this.setData({
      //      shuju: res.data
      //    })
      //    console.log(res.data)
      //     })
    
      },
      onShow: function () {
        this.app.slideupshow(this,'slide_up1', -30,1)
      },
      //页面隐藏时，触发渐出动画
      onHide: function () {
        this.app.slideupshow(this,'slide_up1',30, 0)
      },
  }
})

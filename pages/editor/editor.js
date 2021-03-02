wx.cloud.init()
const db = wx.cloud.database()//初始化一个数据库

Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    type:['教学楼','学院','快递点','景点','食堂','其他'],
    store_pics:[], //店铺图片
    store_area:[],
    store_info:[],//地点的简单地理位置描述
    location:"正在获取定位",
    store_ms:'',//综合评价  
    tem_pictures:[],//存放临时的图片地址
    pic_num:0,//控制图片添加显示
    ispic_upload:1, //图片默认检测合格  
    count: '' //
  

  
   
},
//定位获取
regetLocation:function () {
  const that=this;
  //获取经纬度
  wx.getLocation({
    type: 'gcj02',
    isHighAccuracy:true,//开启高精度定位
    success:function(res) { 
      that.setData({
        latitude:res.latitude,
         longitude:res.longitude,
         location:"定位成功"
       })
},
  fail:function(){
    that.setData({
      location:"重新定位"
    })
    wx.showModal({
      title: '定位失败',
      content: '请确保网络畅通，并允许微信获取位置信息',
      success: function (res) {
        if (res.confirm) {  
          console.log('点击确认回调')
        } else {   
          console.log('点击取消回调')
        }
      }
    })
  }
})
},

get_time:function(chose){
  var date=new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var min=date.getMinutes();
  var seconds=date.getSeconds();
  var  seperatpr='-';
  if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
  if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if(chose==1){   //choese==1时候  时间格式为  2020/08/11
      var currentdate = year +seperatpr+ month +seperatpr+strDate+seperatpr+min+seperatpr+seconds;
      return currentdate
    }
    if(chose==2){  //chose=2时候  时间格式为 2020年08月11日
      var currentdate=year+'年'+month+'月'+strDate+'日';
      return currentdate
    }
  
},


//图片审核  
PicConfirm:function(e){
  var that=this;
  wx.request({
    url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=uncibpD6mbVQYSLHpC8gRguI&client_secret=qeja5g5w2QasdmFbtC2Ax4kzKGnUgmc2',
    method:'get',
    success:res=>{
      //每张图片审核检测
      for(let i=0;i<e.tempFilePaths.length;i++){
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined?access_token='+res.data.access_token,
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data:{
            'image':wx.getFileSystemManager().readFileSync(e.tempFilePaths[i],'base64')  //base64编码
          },
          success:res=>{
            console.log(res.data,"图片检测审核")
            //图片审核不通过
            if(res.data.conclusionType==2 ){
              that.setData({
                ispic_upload:-1    
              })
          
            
            }
           },   
        })
      }
      //图片审核通过
      if(that.data.ispic_upload!=-1){
        console.log(that.data.ispic_upload,"ispic——upload等于多少")
        that.setData({
          tem_pictures:e.tempFilePaths, //存放临时的图片第地址
          pic_num:e.tempFilePaths.length //pic_num图片数量  控制添加图片按钮是否展示
         });
          console.log("图片临时地址",that.data.tem_pictures)
          that.uploadPicture()
      }else{
        wx.showToast({
          title: '图片违规',
          icon:'none',
          image:'../../images/jg.png',
          duration:1000
        })
      }
    }
  })
},




//类型
addType:function(res){
  this.setData({
    index:res.detail.value
  })
},
//地点
addArea:function(res){
  this.setData({
    store_area:res.detail.value
  })
},

//图片上传
chooseImage:function(){
  let that = this;
  wx.showActionSheet({
    itemList: ['从相册中选择', '拍照'],
    itemColor: "#000000",
    success: function(res) {
      if (!res.cancel) {
        if(res.tapIndex == 0){
          that.addPicInfo('album')
          console.log("选择相册上传图片")
        }else if(res.tapIndex == 1){
          that.addPicInfo('camera')
          console.log("选择得相机上传图片")
        }
      }
    }
  })
},
//店铺图片
addPicInfo:function(type){
  const that = this;
  if(that.data.store_area.length!=0){
    wx.chooseImage({
      count: 3,//上传一次3张照片 最多为9
      sizeType: [ 'compressed'],//压缩上传
      sourceType: [type],
      success: function (e) {
        that.setData({
          tem_pictures:e.tempFilePaths, //存放临时的图片第地址
          pic_num:e.tempFilePaths.length //pic_num图片数量  控制添加图片按钮是否展示
         });
          console.log("图片临时地址",that.data.tem_pictures)
          that.uploadPicture()
  },
  })
  }
  else{
    wx.showToast({
      title: '类型，地点不能为空',
      icon:"none"
    })
  }
 
},

//删除图片
deleteImg:function(e){
  var imgs = this.data.tem_pictures;
  var index = e.currentTarget.dataset.index;
  imgs.splice(index, 1);
  this.setData({
        tem_pictures: imgs,  //删除图片  
        pic_num:this.data.pic_num-1   //每次删除一张数量减去1
      }); 
  console.log("删除之后剩下:",imgs)
  console.log("长度",imgs.length)
  
},

// 放大预览图片
previewImg: function (e) {
  //获取当前图片的下标
 var index = e.currentTarget.dataset.index;
  //所有图片
 var imgs = this.data.tem_pictures;
 wx.previewImage({
  //当前显示图片
  current: imgs[index],
  //所有图片
  urls: imgs
 })
},



//地点简单描述
addAreaInfo:function(res){
  this.setData({
    store_info:res.detail.value
  })
 
},
//综合评价
addPingjia:function(res){
  var num=res.detail.value.length
  if(num>9){
    wx.showToast({
      title: '字数大于9请重新输入',
      icon:"none"
    })
  }else{
    this.setData({
      store_ms:res.detail.value
    })
  }
},

//上传到云存储
uploadPicture:function(){
  const that=this;
  var array=new Array();
for(let  i=0;i<that.data.tem_pictures.length;i++){
  wx.cloud.uploadFile({//上传到云存储
    cloudPath:that.data.store_area+i+'-'+that.get_time(1)+'.png',//云端存储路径
    filePath:that.data.tem_pictures[i], //图片的临时路径
    success:res=>{
      array.push({"status_p":'0',
      "path":res.fileID
    })
    that.setData({
    store_pics:array,
})
console.log("store_pics",that.data.store_pics)
}
  })
}
},


//快递点信息添加到数据库
addLocationInfo:function(){
  var app=getApp()
  const that=this;
  const accountCollection = db.collection("location");
  const accountCollection1 = db.collection("areacount");
//获得上传的位置
accountCollection1.where({idd:1}).update({
  data:{
    areacount:app.globalData.areacount
  }

})


  //获取前面的值 如果为空 不能提交
 if(that.data.type[that.data.index]!=null && that.data.location=='定位成功' && that.data.store_area.length!=0  && that.data.store_info.length!=0){
  accountCollection.add({//添加数据到数据库
    data:{
     type:that.data.type[that.data.index],//类别   景点，教学楼，学院等  
     store_area:that.data.store_area,//地点
     store_lat:that.data.latitude,//精度
     store_lon:that.data.longitude,//维度
     store_pics:that.data.store_pics,//图片
     store_info:that.data.store_info,//地点简单描述
    status_l:'0',//地理位置状态审核
    status_p1:'0',
    status_z:0,
    store_cmt:[],//留言内容
    store_like:0 ,//点赞量
    store_ms:that.data.store_ms,//综合评价 
    time:that.get_time(2) ,//上传时间
    count:app.globalData.areacount  //上传的先后序号
    
  },
    success:function(){
      wx.showToast({
        title: '等待审核',
      });
     
   setTimeout(function(){wx.reLaunch({url: '/pages/top/top',})},500) //成功提交600毫秒秒后条跳转
    },
  })
 }
 else{
  wx.showToast({
    title: '信息没有填完整or定位获取失败',
    icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
    duration: 2000     
  })  
 };

},

onLoad:function(){
  this.app = getApp();
  var app=getApp();
  const accountCollection1 = db.collection("areacount");
  accountCollection1.get().then(res=>{
    console.log("count的",res.data[0].areacount)
    app.globalData.areacount=parseInt(res.data[0].areacount)+1
  })

},
onShow: function () {
  this.app.slideupshow(this,'slide_up1', -30,1)
},
//页面隐藏时，触发渐出动画
onHide: function () {
  this.app.slideupshow(this,'slide_up1',30, 0)
},


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
    this.regetLocation()
  
   
},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		this.regetLocation()
	},


})

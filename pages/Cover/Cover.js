// pages/Cover/Cover.js
const db = wx.cloud.database()
const accountCollection = db.collection("location")
Page({
  data:{
    text:"Page animation",
    animation: '',
    openid:'',
   
  },

  onLoad:function(options){
    let that = this;
    that.app = getApp();
    that.isAdminShow(); 
    var arraypro=[]          // 定义空数据 用来存储之后的数据
    var arrayprojd=[] //景点数据
    var arrayprojxl=[]
    var arrayprokd=[]
    var arrayproxy=[]
    var arrayprost=[]
    var arrayproqt=[]
    var arrayprotop=[]
    var x=0
  wx.cloud.callFunction({
    name:"cxdata",
    success(res){
      var rs=res.result
      //console.log("打印r1s",rs.data.length)
      for(let j=0;j<rs.data.length;j++){
        x++;
        if(rs.data[j].status_l=="1"){
        arraypro.push(rs.data[j])
          if(rs.data[j]["type"]=='景点'){
            arrayprojd.push(rs.data[j])
          }
         else if(rs.data[j]["type"]=='教学楼'){
           arrayprojxl.push(rs.data[j])
         }
         else if(rs.data[j]["type"]=='快递点'){
           arrayprokd.push(rs.data[j])
         }
        else if(rs.data[j]["type"]=='食堂'){
           arrayprost.push(rs.data[j])
         }
         if(rs.data[j]["type"]=='其他'){
           arrayproqt.push(rs.data[j])
         }
         if(rs.data[j]["type"]=='学院'){
           arrayproxy.push(rs.data[j])
         }
         if(rs.data[j]["status_p1"]=='1'){
          arrayprotop.push(rs.data[j])
        }
        if(x==rs.data.length-1){
          var app=getApp()
          app.globalData.arrayprotop=arrayprotop
          app.globalData.arraypro=arraypro
          app.globalData.arrayprojd=arrayprojd
          app.globalData.arrayprokd=arrayprokd
          app.globalData.arrayproxy=arrayproxy
          app.globalData.arrayprojxl=arrayprojxl
          app.globalData.arrayprost=arrayprost
          app.globalData.arrayproqt=arrayproqt
           var array = new Array();
           for ( let a=0; a< arraypro.length;a++) {
             var list1 = arraypro[a]["store_area"]
             array.push(list1);
           } 
           app.globalData.list1=array
         }
        }
    }
  } 
  })
  var app=getApp()
   var Delay1=setTimeout(function(){
    that.app.slideupshow1(that, 'slide_up1', -200,1)
    that.app.show(that, 'slide_show', 1)
   },500)

setTimeout(function(){

  this.app = getApp();
  //添加记录
  let that = this;
  var app = getApp();
  for(let i=0;i<app.globalData.arraypro.length;i++){
    const db = wx.cloud.database();
    wx.cloud.callFunction({
      name: 'querydata',
      data:{
      openid1:" ",
      count:app.globalData.arraypro[i].count,//传入的编号或位置
      },
      success:res=>{
        if(res.result.data.length==0){
          app.globalData.arraypro[i].status_z=0
          const db = wx.cloud.database();
          wx.cloud.callFunction({
            name: 'addzanjilu',
            data: {
              count:app.globalData.arraypro[i].count,
              flag:0,
            }
            ,success: rs => {
              const db = wx.cloud.database();
              wx.cloud.callFunction({
                name: 'querydata',
                data:{
                count:app.globalData.arraypro[i].count,//传入的编号或位置
                }
                ,success: rs1 => {
                  app.globalData.globalzan.push(rs1.result.data[0])
                }, 
                fail: err => {
                  console.error
                }
              })
            }, 
            fail: err => {
              console.error
            }
          })
        }else{
          app.globalData.globalzan.push(res.result.data[0]) //可能有点问题
          app.globalData.arraypro[i].status_z=res.result.data[0].flag
        }
      },
      fail: err => {
        console.error
      }          
    }) 
  }    

},3000)

   var Delay = setTimeout(function () {
    wx.switchTab({
      url: '/pages/top/top',
    })
  },3500) //成功提交4000毫秒秒后条跳转

  },
 onShow: function () {
  },
//页面隐藏时，触发渐出动画
onHide: function () {
  this.app.slideupshow1(this, 'slide_up1',-200, 1)
  this.app.show(this, 'slide_show', 1)
  clearTimeout(Delay1)
  clearTimeout(Delay)
},


//管理员就展示
 isAdminShow:function(){
    const that=this;
    var app=getApp();
    var adminList=[ "oNOI75AOmDSbeywdHhP7nZUOd6j8","oNOI75M3Am1weQ_UdZsXNvqHu2rU","oNOI75NyguKrA0gXWMUE_wt6V8Sk"]
  
    //调用云函数getOpenid
    wx.cloud.callFunction({
      name:'getOpenid',
     complete:res=>{
           that.setData({
          openid:res.result.openid
        })
       wx.setStorageSync('openid', res.result.openid) //存入缓存openid
        for(let i=0;i<adminList.length;i++){
          if(adminList[i]==that.data.openid) {
              app.globalData.isAdmin=true
              //console.log("是否是管理员",i,app.globalData.isAdmin)
              break;
          }
        }
        
      }
    });
 }
})
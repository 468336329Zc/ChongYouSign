// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// event 就是小程序端调用云函数时传入的参数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //地点上传时间
  var date=new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
  if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
  var currentdate = year +'年'+ +month + '月' + strDate+'日'; //审核通过的时间
  var create_time='20xx年xx月xx日';
  var res="地点创建成功";
  var area='  ';
  if(event.user[0].time!=null){
      create_time=event.user[0].time;//创建上传地点时候的时间)
  } 
  if(event.user[0].store_area!=null){
    area=event.user[0].store_area; //上传的地点
  }
  if(event.type==1){
     res=res;
  }else if(event.type==2){
     res="你上传的地点被管理员top推荐"
  }else if(event.type==-1){
       res="地点审核不通过,不符合要求"
  }
 
  try{
    const result=await cloud.openapi.subscribeMessage.send({
      touser:wxContext.OPENID, //接收者（用户）的 openid
      page:'../../pages/top/top.wxml', //接收通知后进入详情页地址
      data:{
        'thing2':{
          value:'上传新位置'+area
        },
        //地点创建上传时间
        'date3':{
          value:create_time,

        },
        //审核处理时间
        'date4':{
          value: currentdate
        },
        //审核处理结果
        'thing19':{
          value:res
        }
      },
      templateId:'nawTg-Fg_vTPDH2-qzo8b6Xp4Az12ErOwjDP9cItDSk',//模板id
      miniprogramState: 'developer'  //跳转为正式版
    })
    return {result}
}catch(err){
    return  event
  }
}

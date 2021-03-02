// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()//目的：获取_openid
  try {
    return await db.collection("zan").add({
      data: {
        openid1:wxContext.OPENID,
        flag:event.flag,
        count:event.count
      },
      success: res => {
      }, fail: err => {
      }
    })
  } catch (e) {
    console.log(e)
  }
}

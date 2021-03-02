
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    return await db.collection('location').doc(event._id).update({
      data: {
       store_like:event.store_like
      }
    }) 
}
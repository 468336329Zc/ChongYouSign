// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    //这里的update依据是event._id
    return await db.collection('location').doc(event._id).update({
      data: {
       store_cmt:event.store_cmt
      }
    })
}






// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// cloud.init()
// const db = cloud.database()
// const MAX_LIMIT = 100
// // 云函数入口函数
// exports.main = async (event, context) => {
//   const countResult = await db.collection('zan').count()
//   const total = countResult.total
//   const batchTimes = Math.ceil(total / 100)
//   for (let i = 0; i < batchTimes; i++) {
//     try {
//       return await db.collection("zan").where({
//         openid1:wxContext.OPENID,
//         count:event.count}).update({
//         data: {
//           flag:event.flag
//         }
//       })
//     } catch (e) {
//       console.error(e)
//     }
//   }
// }



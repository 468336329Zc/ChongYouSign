// 云函数入口文件
const cloud = require('wx-server-sdk')
 cloud.init()
 const db = cloud.database()
// const MAX_LIMIT = 100
// // 云函数入口函数
exports.main = async (event, context) => {
//   //先取出集合记录总数

 return await db.collection("location").where({status_l:"1"}).get()
// //  const countResult = await db.collection('locationn').count()
// //  const total = countResult.total
// //  // 计算需分几次取
// //   const batchTimes = Math.ceil(total /20)
// //   //承载所有读操作的 promise 的数组
// //   const tasks = []
// //   //for (let i = 0; i < batchTimes; i++) {
// //     const promise = db.collection('locationn').aggregate().sort({count:1}).end()
// //     tasks.push(promise)
// //  // }
// //   return (await Promise.all(tasks)).reduce((acc, cur) => {
// //     return {
// //       data: acc.data.concat(cur.data),
// //       errMsg: acc.errMsg,
// //     }
// //   })
 }

// // 云函数入口文件
// const cloud = require('wx-server-sdk')
// cloud.init()
// const db = cloud.database()
// const MAX_LIMIT = 100
// // 云函数入口函数
// exports.main = async (event, context) => {

//   // 先取出集合记录总数
//   const countResult = await db.collection('locationn').count()
//   const total = countResult.total

//   // 计算需分几次取
//   const batchTimes = Math.ceil(total / 100)
//   // 承载所有读操作的 promise 的数组
//   console.log("需要查询的次数",batchTimes)
//   const tasks = []
//   for (let i = 0; i < batchTimes; i++) {
//     const promise = db.collection('locationn').aggregate().sort({count:1}).end()
//     tasks.push(promise)
//   }
//   // 等待所有
//   return (await Promise.all(tasks)).reduce((acc, cur) => {
//     return {
//       data: acc.data.concat(cur.data),
//       errMsg: acc.errMsg,
//     }
//   })

// }
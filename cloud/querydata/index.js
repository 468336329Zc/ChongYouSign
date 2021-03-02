// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
 const countResult = await db.collection('zan').count()
 const total = countResult.total
 const batchTimes = Math.ceil(total / 100)
 const tasks = []
 for (let i = 0; i < batchTimes; i++) {
   const promise = db.collection('zan').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
    openid1:wxContext.OPENID,
     count:event.count
   }).get()
   tasks.push(promise)
 }
 return (await Promise.all(tasks)).reduce((acc, cur) => {
   return {
     data: acc.data.concat(cur.data),
     errMsg: acc.errMsg,
   }
 })
}
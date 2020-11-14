const mongoose = require('mongoose')
const { Schema } = mongoose
const moment = require('moment')
mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true });

const holidaySchema = new Schema({
    h_Name:{
        type:String
    },
    h_Start:{
        type:Date,
        get: v => moment(v).format('YYYY-MM-DD HH:mm')
    },
    h_End:{
        type:Date,
        get: v => moment(v).format('YYYY-MM-DD HH:mm')
    },
    h_Day:{
        type:Number
    }

})
module.exports=mongoose.model('Holiday',holidaySchema)
// const Borrow = mongoose.model('Borrow', borrowSchema)

//新增数据
// var user = new User({
//   u_Type: '学生',
//   u_Name: '李华',
//   u_No: '201709601300',
//   u_Password: '123456',
//   b_limit: '10',
//   b_Massage: [{
//     u_Name: '李华',
//     u_No: '201709601300',
//     b_No: '11',
//     b_Name: '《三体》',
//     bor_Time: '2020-9-10',
//     ret_Time: '2020-10-20',
//     status: '逾期',
//     money: '2'
//   }]
// })
// user.save(function (err, result) {
//   if (err) {
//     // console.log("存储失败")
//     console.log(err)
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })
// var user1 = new User({
//   u_Type: '教师',
//   u_Name: '李三',
//   u_No: '111111111110',
//   u_Password: '123456',
//   b_limit: '30',
//   b_Massage: [{
//     u_Name: '李三',
//     u_No: '111111111110',
//     b_No: '10',
//     b_Name: '《红楼梦》',
//     bor_Time: '2020-9-10',
//     ret_Time: '2020-9-15',
//     status: '未逾期',
//     money: '0'
//   }]
// })
// user1.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })


// var book = new Book({
//   b_Type: '科幻小说',
//   b_Name: '《三体》',
//   b_Author: '刘慈欣',
//   b_pulic: '重庆出版社',
//   b_Num: '50',
//   b_Rest: '40'
// })
// book.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })
// var book1 = new Book({
//   b_Type: '经典文学',
//   b_Name: '《红楼梦》',
//   b_Author: '曹雪芹',
//   b_pulic: '人民文学出版社',
//   b_Num: '100',
//   b_Rest: '40'
// })
// book1.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })


// var book_item = new Book_item({
//   b_No: '10',
//   b_Type: '经典文学',
//   b_Name: '《红楼梦》',
//   b_Author: '曹雪芹',
//   b_pulic: '人民文学出版社'
// })
// book_item.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })
// var book_item1 = new Book_item({
//   b_No: '11',
//   b_Type: '科幻小说',
//   b_Name: '《三体》',
//   b_Author: '刘慈欣',
//   b_pulic: '重庆出版社'
// })
// book_item1.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })

// var admin = new Admin({
//   a_Type: '普通管理员',
//   a_Name: '铁球',
//   a_No: '120000',
//   a_Password: '111111',
//   a_limit: ''
// })
// admin.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })


// var admin1 = new Admin({
//   a_Type: '超级管理员',
//   a_Name: '奥特曼',
//   a_No: '130000',
//   a_Password: '222222',
//   a_limit: ''
// })

// admin1.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })

// var log = new Log({
//   a_No: '120000',
//   oper_Content: '添加图书',
//   oper_Time: '2020-10-21'
// })

// log.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })

// var log1 = new Log({
//   a_No: '130000',
//   oper_Content: '添加图书',
//   oper_Time: '2020-10-21'
// })

// log1.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })

// var borrow = new Borrow({
//   u_Name: '李华',
//   u_No: '201709601300',
//   b_No: '11',
//   b_Name: '《三体》',
//   bor_Time: '2020-9-10',
//   ret_Time: '2020-10-20',
//   status: '逾期',
//   money: '2'
// })
// borrow.save(function (err, result) {
//   if (err) {
//     // console.log("存储失败")
//     console.log(err)
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })

// var borrow1 = new Borrow({
//   u_Name: '李三',
//   u_No: '111111111110',
//   b_No: '10',
//   b_Name: '《红楼梦》',
//   bor_Time: '2020-9-10',
//   ret_Time: '2020-9-15',
//   status: '未逾期',
//   money: '0'
// })
// borrow1.save(function (err, result) {
//   if (err) {
//     console.log("存储失败")
//   } else {
//     console.log("存储成功")
//     console.log(result)
//   }
// })




/*module.exports=mongoose.model('Library',studentsSchema)*/
// module.exports = mongoose.model('Borrow', borrowSchema)

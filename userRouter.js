var express = require("express");

// var Students = require('./student')
// 创建路由
var router = express.Router();

// const Library = require('./sudentsMongoose')
const Users = require("./mongo/users");
const Books = require("./mongo/books");
const Logs = require("./mongo/logs");
const Borrows = require("./mongo/borrows");
const BookItems = require("./mongo/bookItems");
const Admins = require("./mongo/admins");
const Holidays = require("./mongo/holiday");

var counts = require("./myFunction");
const borrows = require("./mongo/borrows");

// 把所有的路由挂载在router上

// 用户信息界面整合
router.get("/users", function (req, res) {
  Users.find({ u_No: req.query.No }, function (err, students) {
    if (err) {
      console.log(err);
      return res.send("Server error");
    }

    Borrows.find({ u_No: req.query.No, already: "否" }, function (
      err,
      borrows
    ) {
      if (err) {
        console.log(err);
        return res.send("Server error");
      }

      Holidays.find({}, function (err, holidays) {
        if (err) {
          return res.send("Server error");
        }
        let masg = counts.holidayTime(students, holidays, borrows);
        masg = counts.counts(masg.students, masg.borrows);

        res.render("userManager/personal.html", {
          students: masg.students,
          borrows: masg.borrows,
        });
      });
    });
  });
});
// 点击修改密码触发
router.get("/students/changePassword", function (req, res) {
  // console.log(req.query.No)
  res.render("userManager/changePassword.html", {
    userNo: req.query.No,
  });
});

// 接收ajax异步请求，处理后返回结果
router.get("/students/verification", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  Users.find({ u_No: req.query.userNo }, function (err, students) {
    if (err) {
      return res.send("Server error");
    }
    let verification = false;
    // console.log(students[0])
    if (students[0].u_Password == req.query.p) {
      verification = true;
    }
    res.send(verification);
  });
});

// 接收表单的数据并修改用户密码
router.post("/students/changePassword", function (req, res) {
  // console.log(req.body)

  Users.updateOne(
    { u_No: req.body.userNos },
    { u_Password: req.body.newpass },
    function (err, result) {
      if (err) {
        console.log("err");
      } else {
        // console.log('success')
        // console.log(result)
        res.redirect("/users?No=" + req.body.userNos);
      }
    }
  );

  // res.render('userManager/changePassword.html')
});

/*********************借阅信息*******************/

//获取书籍信息
router.get("/users/books", function (req, res) {
  Books.find(
    {},
    null,
    {
      sort: { b_No: 1 },
    },
    function (err, book) {
      if (err) {
        return res.send("Server error");
      }
      res.render("book_itemManager/book.html", {
        book: book,
        userNo: req.query.No,
      });
    }
  );
});

// 添加借阅信息
router.get("/borrows/new", function (req, res) {
  console.log(req.query.No);
  res.render("book_itemManager/new.html", {
    userNo: req.query.No,
  });
});

router.post("/borrows/new", function (req, res) {
  //1、获取表单数据
  // console.log(req.body);
  new Borrows(req.body).save(function (err) {
    console.log(err);
    if (err) {
      return res.send("Server error");
    }
    res.redirect("/borrows?No=" + req.body.u_No);
  });
});

// 我的借阅
router.get("/borrows", function (req, res) {
  Borrows.find({ u_No: req.query.No }, function (err, mybook) {
    if (err) {
      return res.send("Server error");
    }
    res.render("book_itemManager/borrows.html", {
      mybook: mybook,
      userNo: req.query.No,
    });
  });
});

// 导出
module.exports = router;

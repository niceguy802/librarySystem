var express = require("express");
const path = require("path"); //路径模块
const url = require("url"); //url模块
// 创建路由
var router = express.Router();
let obj = url.parse("http://localhost:3000", true); //解析url
const Users = require("./mongo/users");
const Books = require("./mongo/books");
const Logs = require("./mongo/logs");
const Borrows = require("./mongo/borrows");
const BookItems = require("./mongo/bookItems");
const Admins = require("./mongo/admins");
const borrows = require("./mongo/borrows");

// 把所有的路由挂载在router上
// 管理员信息页面
router.get("/admin", function (req, res) {
  Admins.findOne({ a_No: req.query.No }, function (err, result) {
    console.log(req.query.No);
    console.log(obj);
    console.log("管理员登录" + result);
    if (err) {
      console.log(err);
      return res.send("server err");
    }
    Logs.find(function (err, logs) {
      if (err) {
        return res.send("server error");
      }
      res.render("admin/index.html", {
        logs: logs,
        result: result,
        admin_No: req.query.No,
      });
    });
  });
});

// // 删除日志
// router.get("/admin/deleteLog", function (req, res) {
//   Logs.findByIdAndDelete(req.query.id, function (err) {
//     console.log(req.query.id);
//     if (err) {
//       return res.send("server error");
//     }
//     res.redirect("/admin?No=" + req.query.No);
//   });
// });

// 修改管理员密码
router.get("/admin/editPassword", function (req, res) {
  Admins.findOne({ a_No: req.query.No }, function (err, password) {
    if (err) {
      console.log(err);
      return res.send("server error");
    }
    res.render("admin/users/editPassword.html", {
      password: password,
      admin_No: req.query.No,
    });
    // console.log(password);
  });
});

router.post("/admin/editPassword", function (req, res) {
  Admins.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      console.log("更新错误" + err);
      return res.send("server error");
    }
    console.log(req.body);
    console.log("更新账号" + req.body.a_No);
    res.redirect("/admin?No=" + req.body.a_No);
  });
});

// 用户信息
router.get("/admin/userInformation", function (req, res) {
  Users.find(function (err, users) {
    if (err) {
      console.log(err);
      return res.send("server error");
    }
    res.render("admin/users/users.html", {
      users: users,
      admin_No: req.query.No,
    });
  });
});

// 查询用户
router.post("/admin/findUser", function (req, res) {
  let u_Name = req.body.u_Name;
  let u_Type = req.body.u_Type;
  let u_No = req.body.u_No;
  console.log(u_Type);
  console.log(req.body);
  Users.find(
    {
      $or: [
        // { u_Name: u_Name},
        { u_Type: u_Type },
        { u_No: u_No },
      ],
    },
    function (err, users) {
      if (err) {
        console.log(err);
        return res.send("server error");
      }
      console.log("用户查询成功");
      res.render("admin/users/users.html", {
        users: users,
        admin_No: req.query.No,
      });
    }
  );
});

// 添加用户
router.get("/admin/addUser", function (req, res) {
  res.render("admin/users/addUser.html", {
    admin_No: req.query.No,
  });
});

router.post("/admin/addUser", function (req, res) {
  // 1获取表单数据
  new Users(req.body).save(function (err) {
    if (err) {
      console.log(err);
      alert("添加失败");
      // return res.send('server error')
    }
    res.redirect("/admin/userInformation?No=" + req.body.admin_No);
  });
});

// 编辑用户权限
router.get("/admin/editUserLimit", function (req, res) {
  console.log("III" + req.query.id);
  Users.findById(req.query.id, function (err, users) {
    console.log(req.query.id);
    if (err) {
      return res.send("server error");
    }
    console.log("编辑用户成功");
    res.render("admin/users/editLimit.html", {
      users: users,
      admin_No: req.query.No,
    });
  });
});

router.post("/admin/editUserLimit", function (req, res) {
  console.log(req.body);
  console.log(req.body.id);
  Users.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      console.log(err);
      return res.send("server error");
    }
    res.redirect("/admin/userInformation?No=" + req.body.admin_No);
  });
});

// 删除用户
router.get("/admin/deleteUser", function (req, res) {
  Users.findByIdAndDelete(req.query.id, function (err) {
    console.log(req.query.id);
    if (err) {
      return res.send("server error");
    }
    res.redirect("/admin/userInformation?No=" + req.query.No);
  });
});

// 书籍信息
router.get("/admin/bookInformation", function (req, res) {
  Books.find({}, null, { sort: { b_No: 1 } }, function (err, books) {
    if (err) {
      return res.send("server error");
    }
    res.render("admin/books/books.html", {
      books: books,
      admin_No: req.query.No,
    });
  });
});

// 删除书籍
router.get("/admin/deleteBooks", function (req, res) {
  Books.findByIdAndDelete(req.query.id, function (err) {
    console.log(req.query.id);
    if (err) {
      return res.send("server error");
    }
    res.redirect("/admin/bookInformation?No=" + req.query.No);
  });
});

//添加图书
router.get("/admin/bookInformation/addBook", function (req, res) {
  res.render("admin/books/addBook.html", {
    admin_No: req.query.No,
  });
});

router.post("/admin/bookInformation/addBook", function (req, res) {
  // 1获取表单数据
  new Books(req.body).save(function (err) {
    if (err) {
      console.log(err);
      return res.send("server error");
    }
    res.redirect("/admin/bookInformation?No=" + req.body.admin_No);
  });
});

//修改书籍
router.get("/admin/bookInformation/editBook", function (req, res) {
  console.log(req.query.id);
  Books.findById(req.query.id, function (err, book) {
    if (err) {
      return res.send("server error");
    }
    console.log(book);
    console.log("查询成功" + book);
    console.log(req.query.No);
    console.log(req.query.id);
    res.render("admin/books/editBook.html", {
      book: book,
      admin_No: req.query.No,
    });
  });
});

router.post("/admin/bookInformation/editBook", function (req, res) {
  console.log(req.body.id);
  Books.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      return res.status(500).send("server error");
    }
    console.log("编辑成功");
    res.redirect("/admin/bookInformation?No=" + req.body.admin_No);
  });
});

// 借书信息
/****获取借阅管理界面****/
router.get("/admin/userBorrow", function (req, res) {
  Borrows.find({}, null, { sort: { b_No: 1 } }, function (err, borrows) {
    if (err) {
      return res.send("Server error");
    }

    res.render("admin/borrow/borrow.html", {
      borrows: borrows,
      admin_No: req.query.No,
    });
  });
});

// 查看用户借阅信息
router.get("/admin/findUserBorrow", function (req, res) {
  let u_No = req.query.u_No;
  console.log(u_No);
  Borrows.find({ u_No: u_No }, null, { sort: { b_No: 1 } }, function (
    err,
    borrows
  ) {
    if (err) {
      console.log(err);
      return res.send("server error");
    }
    console.log("用户查询成功");
    res.render("admin/borrow/borrow.html", {
      borrows: borrows,
      admin_No: req.query.No,
    });
  });
});

// 编辑用户借阅信息
router.get("/admin/editUserBorrow", function (req, res) {
  console.log("III" + req.query.id);
  borrows.findById(req.query.id, function (err, borrows) {
    console.log(req.query.id);
    if (err) {
      console.log(err);
      return res.send("server error");
    }
    console.log("编辑用户借阅成功");
    res.render("admin/borrow/editBorrow.html", {
      borrows: borrows,
      admin_No: req.query.No,
    });
  });
});

router.post("/admin/editUserBorrow", function (req, res) {
  console.log(req.body);
  console.log(req.body.id);
  borrows.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      console.log(err);
      return res.send("server error");
    }
    res.redirect("/admin/userBorrow?No=" + req.body.admin_No);
  });
});

// 删除用户借阅信息
router.get("/admin/deleteUserBorrow", function (req, res) {
  borrows.findByIdAndDelete(req.query.id, function (err) {
    console.log(req.query.id);
    if (err) {
      return res.send("server error");
    }
    res.redirect("/admin/userBorrow?No=" + req.query.No);
  });
});

// 登录
router.get("/login", function (req, res) {
  res.render("login/login.html");
});

router.post("/login", function (req, res) {
  var u_No = req.body.u_No;
  var u_Password = req.body.u_Password;
  var a_No = req.body.u_No;
  var a_Password = req.body.u_Password;

  var u_Rad = req.body.u_Rad || req.body.rad;
  console.log(u_No, u_Rad, req.body);
  res.cookie("userName", u_No, { maxAge: 20000, httpOnly: true });
  if (u_Rad == "1") {
    console.log(req.body.u_No);
    Users.findOne({ u_No: u_No }, function (err, result) {
      console.log("返回结果" + result);
      if (err) {
        return res.status(500).send("Server error.");
      } else if (result == null) {
        console.log("错误");
        res.redirect("/login");
      } else if (u_Password == result.u_Password) {
        res.redirect("/users?No=" + u_No);
      } else {
        res.redirect("/login");
      }
    });
  } else if (u_Rad == "2") {
    console.log(req.body.u_No);
    Admins.findOne({ a_No: a_No }, function (err, result) {
      console.log("返回结果" + result);
      var thisa_No = result.a_No;
      var thisa_Name = result.a_Name;
      var thisa_Password = result.a_Password;
      console.log(thisa_No + "$" + thisa_Name + "$" + thisa_Password);

      if (err) {
        return res.status(500).send("Server error.");
      } else if (result == null) {
        console.log("错误");
        res.redirect("/login");
      } else if (a_Password == result.a_Password) {
        res.redirect("/admin?No=" + a_No);
      } else {
        res.redirect("/login");
      }
    });
  } else if (u_Rad == "3") {
    console.log(req.body.u_No);
    Admins.findOne({ a_No: a_No }, function (err, result) {
      console.log("返回结果" + result);
      var thisa_No = result.a_No;
      var thisa_Name = result.a_Name;
      var thisa_Password = result.a_Password;
      console.log(thisa_No + "$" + thisa_Name + "$" + thisa_Password);

      if (err) {
        return res.status(500).send("Server error.");
      } else if (result == null) {
        res.redirect("/login");
      } else if (a_Password == result.a_Password) {
        console.log("超级管理员登录成功");
        res.redirect("/admins?No=" + a_No);
      }
    });
  }
});

// 导出
module.exports = router;

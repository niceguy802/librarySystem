var express = require("express");

const Logs = require("./mongo/logs");
const Borrows = require("./mongo/borrows");

var Holiday = require("./mongo/holiday");
const Admins = require("./mongo/admins");

// 1、创建一个路由容器
var router = express.Router();

// 2、把所有的路由都挂载在router上

/*-------------------------------------------------------------------------*/
//管理员
router.get("/admins", function (req, res) {
  console.log("初始页" + req.query.No);
  var a_No = req.query.No;

  Admins.findOne({ a_No: a_No }, (err, superAdmin) => {
    console.log(superAdmin);
    if (err) {
      return res.send("Server error");
    }
    Admins.find(function (err, admins) {
      if (err) {
        return res.send("Server error");
      }
      // console.log({admins:admins})
      res.render("superManager/adminManager/admin.html", {
        admins: admins,
        superAdmin: superAdmin,
        super_No: req.query.No,
      });
    });
  });
});

/****获取借阅管理界面****/
router.get("/superManager/borrow", function (req, res) {
  Borrows.find(function (err, borrows) {
    if (err) {
      return res.send("Server error");
    }
    // console.log({ borrows: borrows })
    res.render("superManager/borrowPages/borrow.html", {
      borrows: borrows,
      super_No: req.query.No,
    });
  });
});

/****获取日志管理界面****/
router.get("/superManager/viewLog", function (req, res) {
  var data = {
    logs: [],
    page: Number(req.query.page || 1),
    limit: 4,
    pages: 1,
    count: 0,
  };
  Logs.find()
    .then((logs) => {
      data.logs = logs;
      // 获取读取内容的总记录
      return logs.length;
    })
    .then((count) => {
      //为了方便,存入data
      data.count = count;

      //计算总页数，向上取整数, 取最大值
      data.pages = Math.ceil(data.count / data.limit);
      // 页数取值不能超过总页数的值或小于1
      data.page = Math.min(data.page, data.pages);
      data.page = Math.max(data.page, 1);

      var skip = (data.page - 1) * data.limit;

      return Logs.find().sort({ _id: -1 }).limit(data.limit).skip(skip);
    })
    .then((logs) => {
      data.logs = logs;

      // console.log({
      //   logs: data.logs
      // })
      /**最后渲染 */
      console.log("日志" + req.query.No);

      res.render("superManager/logPages/viewLog.html", {
        logs: data.logs,
        page: data.page,
        limit: data.limit,
        pages: data.pages,
        count: data.count,
        super_No: req.query.No,
      });
    });
});

/****日志管理 添加日志界面****/
router.get("/superManager/newLog", function (req, res) {
  res.render("superManager/logPages/newLog.html", {
    super_No: req.query.No,
  });
});

/****日志管理 添加日志提交数据操作****/
router.post("/superManager/newLog", function (req, res) {
  new Logs(req.body).save(function (err) {
    if (err) {
      return res.send("Server error");
    }
    res.redirect("/superManager/viewLog?No=" + req.body.super_No);
  });
});

/****日志管理 日志通过姓名搜索操作****/
router.post("/superManager/findLog", function (req, res) {
  // console.log(req.body)
  // res.render('superManager/findLog.html')
  Logs.find({ a_Name: req.body.a_Name }, function (err, logs) {
    if (err) {
      return res.send("Server error");
    }
    res.render("superManager/logPages/findLog.html", {
      logs: logs,
      super_No: req.query.No,
    });
  });
});

/*****假期编辑******/

router.get("/holiday/edit", function (req, res) {
  Holiday.findById(req.query.id, function (err, holiday) {
    if (err) {
      return res.send("server error");
    }

    res.render("superManager/holidayPages/newHoliday.html", {
      holiday: holiday,
      super_No: req.query.No,
    });
  });
  //3.渲染编辑页面
});

router.post("/holiday/edit", function (req, res) {
  console.log(req.body);
  Holiday.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      return res.send("serrver error");
    }
    res.redirect("/superManager/holiday?No=" + req.body.super_No);
  });
});

/******假期管理 获取假期管理页面*******/

router.get("/superManager/holiday", function (req, res) {
  var data = {
    holidays: [],
    page: Number(req.query.page || 1),
    limit: 4,
    pages: 1,
    count: 0,
  };
  // console.log(req.query.page)
  Holiday.find()
    .then((holidays) => {
      data.holidays = holidays;
      // 获取读取内容的总记录
      return holidays.length;
    })
    .then((count) => {
      //为了方便,存入data
      data.count = count;

      //计算总页数，向上取整数, 取最大值
      data.pages = Math.ceil(data.count / data.limit);
      // 页数取值不能超过总页数的值或小于1
      data.page = Math.min(data.page, data.pages);
      data.page = Math.max(data.page, 1);

      var skip = (data.page - 1) * data.limit;

      return Holiday.find().sort({ _id: -1 }).limit(data.limit).skip(skip);
    })
    .then((holidays) => {
      data.holidays = holidays;

      // console.log({
      //   holidays: data.holidays
      // })
      /**最后渲染 */
      res.render("superManager/holidayPages/holiday.html", {
        holidays: data.holidays,
        page: data.page,
        limit: data.limit,
        pages: data.pages,
        count: data.count,
        super_No: req.query.No,
      });
    });
});

/******设置假期********/

router.post("/superManager/holiday", function (req, res) {
  new Holiday(req.body).save(function (err) {
    if (err) {
      return res.send("Server error");
    }
    res.redirect("/superManager/holiday?No=" + req.body.super_No);
    // res.render('superManager/borrowPages/borrow.html')
  });
});

//删除假期
router.get("/holiday/delete", function (req, res) {
  Holiday.findByIdAndDelete(req.query.id, function (err) {
    if (err) {
      return res.send("server error");
    }
    res.redirect("/superManager/holiday?No=" + req.query.No);
  });
});

//添加管理员
router.get("/admins/newAdmin", function (req, res) {
  res.render("superManager/adminManager/newAdmin.html", {
    super_No: req.query.No,
  });
});

router.post("/admins/newAdmin", function (req, res) {
  //1、获取表单数据
  console.log(req.body);
  new Admins(req.body).save(function (err) {
    if (err) {
      return res.send("Server error");
    }
    res.redirect("/admins?No=" + req.body.super_No);

    //跳转回admin页面，重新读(更新后的)文件
  });
});

//更新管理员
router.get("/admins/editAdmin", function (req, res) {
  //1、在客户端列表页中处理链接问题(要有id)
  //2、获取要编辑的用户
  console.log(req.query.id);
  Admins.findById(req.query.id, function (err, admin) {
    if (err) {
      return res.send("Server error");
    }
    console.log("王企鹅" + admin);
    res.render("superManager/adminManager/editAdmin.html", {
      admin: admin,
      super_No: req.query.No,
    });
  });
  //3、渲染编辑页面
});

router.post("/admins/editAdmin", function (req, res) {
  console.log(req.body, req.body.id);
  Admins.findByIdAndUpdate(req.body.id, req.body, function (err) {
    if (err) {
      return res.send("Server error");
    }
    res.redirect("/admins?No=" + req.body.super_No);
  });
});

//删除用户
router.get("/admins/delete", function (req, res) {
  console.log(req.query.id);

  Admins.findByIdAndDelete(req.query.id, function (err) {
    if (err) {
      return res.status(500).send("Server error");
    }
    res.redirect("/admins?No=" + req.query.No);
  });
});

// 3、导出
module.exports = router;

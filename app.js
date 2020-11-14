
var superRouter = require('./superRouter')
var commonRouter = require('./commonRouter')
var userRouter = require('./userRouter')

var express = require('express');
var app = express()
var bodyParser = require('body-parser')

// 放开静态资源
app.use('/node_modules', express.static('./node_modules'))
app.use('/public', express.static('./public'))

// express-art-template   使用{{each xxx}} {{/each}},使用render()
app.engine('html', require('express-art-template'))

//配置模板引擎body-parser一定要在app.use(router)挂载路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// 使用router
app.use(superRouter)
app.use(commonRouter)
app.use(userRouter)

app.listen(3000, function () {
  console.log('running 3000...')
})


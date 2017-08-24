var express = require('express')
var path = require('path')
//  var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var index = require('./routes/index')
var todos = require('./routes/todos')

var app = express()

//  view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//  uncomment after placing your favicon in /public
//  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', cors(), index)
app.use('/todos', cors(), todos)

//  catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

//  error handler
app.use(function (err, req, res, next) {
  //  set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  //  render the error page
  res.status(err.status || 500)
  res.render('error')
})

//  调用MySQL模块
var mysql = require('mysql')

//  创建一个connection
var connection = mysql.createConnection({
  host: '127.0.0.1',       // 主机
  user: 'root',               // MySQL认证用户名
  password: 'tiger',        // MySQL认证用户密码
  port: '3306'                   // 端口号
})

// 创建一个connection
connection.connect(function (err) {
  if (err) {
    console.log('[query] - :' + err)
    return
  }
  console.log('[connection connect]  succeed!')
})

// 执行SQL语句
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) {
    console.log('[query] - :' + err)
    return
  }
  console.log('The solution is: ', rows[0].solution)
})

// 关闭connection
connection.end(function (err) {
  if (err) {
    return
  }
  console.log('[connection end] succeed!')
})

module.exports = app

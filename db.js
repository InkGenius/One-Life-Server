var mysql = require('mysql')

var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'tiger',
  port: '3306',
  database: 'onelife'
})
// 创建一个connection
pool.getConnection(function (err, connection) {
  if (err) {
    console.log('[query] - :' + err)
    return
  }
  console.log('[connection connect]  succeed!')
})

var db = {}
// callback是回调函数，连接建立后的connection作为其参数
db.con = function (callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      throw err
    } else {
      callback(connection)
    }
    connection.release()
  })
}
module.exports = db

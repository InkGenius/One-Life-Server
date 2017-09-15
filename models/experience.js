const db = require('../db')

module.exports = db.defineModel('experience', {
  name: db.STRING // 经历名称
})

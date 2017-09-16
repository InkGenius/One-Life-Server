const db = require('../db')

module.exports = db.defineModel('recordpicture', {
  // recordId: db.ID, // 所属记录ID
  url: db.STRING, // 图片名
  type: db.INTEGER // 图片类型
})

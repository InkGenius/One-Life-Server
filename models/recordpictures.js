const db = require('../db')

module.exports = db.defineModel('recordpictures', {
  recordId: db.ID, // 所属记录ID
  url: db.STRING, // 图片地址
  type: db.INTEGER // 图片类型
})

const db = require('../db')

module.exports = db.defineModel('todos', {
  name: db.STRING,
  userType: db.INTEGER,
  class: db.INTEGER,
  province: db.STRING,
  city: db.STRING,
  location: db.STRING,
  description: db.TEXT,
  gender: db.BOOLEAN,
  remark: db.TEXT,
  avatar: db.STRING,
  star: db.INTEGER,
  creditScore: db.INTEGER,
  userAbility: db.INTEGER
})

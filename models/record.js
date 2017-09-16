const db = require('../db')

module.exports = db.defineModel('record', {
  context: db.TEXT,
  mood: db.INTEGER
})

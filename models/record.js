const db = require('../db')

module.exports = db.defineModel('record', {
  userId: db.ID,
  context: db.TEXT,
  experienceId: db.ID,
  mood: db.INTEGER
})

const db = require('../db')

module.exports = db.defineModel('record', {
  context: db.TEXT,
  experienceId: db.ID,
  mood: db.INTEGER
})

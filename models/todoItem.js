const db = require('../db')

module.exports = db.defineModel('todos', {
  typeId: db.ID,
  context: db.TEXT,
  status: db.BOOLEAN,
  finishedAt: db.BIGINT
})

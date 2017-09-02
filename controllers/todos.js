const todoItem = require('../model').todoItem
const moment = require('moment')
moment.locale('zh-cn')

function findAll (req, res) {
  todoItem.findAll().then(todos => {
    var ans = {}
    var todoNum = 0
    var doneNum = 0
    todos.forEach(obj => {
      obj.createdAt = moment(obj.createdAt).fromNow()
      if (obj.status) {
        doneNum++
      } else {
        todoNum++
      }
    })
    ans.todoNum = todoNum
    ans.doneNum = doneNum
    ans.list = todos
    res.send(ans)
  })
}
exports.create = function (req, res) {
  var newTodo = req.body.data
  todoItem.create({
    typeId: newTodo.type,
    context: newTodo.context,
    status: false,
    finishedAt: 0
  }).then(item => {
    findAll(req, res)
  })
}

exports.list = function (req, res) {
  findAll(req, res)
}

exports.done = function (req, res) {
  todoItem.findById(req.body.data).then(todo => {
    if (!todo) {
      return res.status(404).send({
        message: 'Todo Not Found'
      })
    }
    todo.update({
      status: true
    }).then(() => {
      findAll(req, res)
    })
  }).catch((error) => res.status(400).send(error))
}

exports.delete = function (req, res) {
  todoItem.findById(req.body.data).then(todo => {
    if (!todo) {
      return res.status(404).send({
        message: 'Todo Not Found'
      })
    }
    todo.destroy().then(
      () => findAll(req, res)).catch(
      (error) => res.status(400).send(error))
  })
}

var express = require('express')
const model = require('../model')
var router = express.Router()

var todoList = []

var todoNum = 0
var doneNum = 0

/* GET todos listing. */
router.get('/list', function (req, res, next) {
  // db.con(function (connect) {
  //   connect.query('SELECT a.id,a.context,a.public_time,a.finished_time,b.name as type,a.status FROM todos a,todostype b WHERE a.type_id = b.id', [], function (err, result) {
  //     if (err) {
  //       return err
  //     }
  //     todoList = result
  //     console.log(result)
  //   })
  // })
  let todoItem = model.todoItem
  todoItem.findAll().then(items => {
    console.log(items)
  })
  todoNum = 0
  doneNum = 0
  todoList.forEach(obj => {
    if (obj.status === 1) {
      doneNum++
    } else {
      todoNum++
    }
  })

  var ans = {}
  ans.todoNum = todoNum
  ans.doneNum = doneNum
  ans.list = todoList
  res.send(ans)
})

router.post('/done', function (req, res, next) {
  var doneId = req.body.data
  todoList.forEach(obj => {
    if (obj.id === doneId) {
      obj.done = true
      doneNum++
      todoNum--
    }
  })

  var ans = {}
  ans.todoNum = todoNum
  ans.doneNum = doneNum
  ans.list = todoList
  res.send(ans)
})

module.exports = router

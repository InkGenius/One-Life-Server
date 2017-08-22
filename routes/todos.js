var express = require('express')
var router = express.Router()

var todoList = [
  {id: '1', itemContext: '铲土', fromNow: '一天前', type: '工作', done: false},
  {id: '2', itemContext: '浇花', fromNow: '一时前', type: '生活', done: false},
  {id: '3', itemContext: '打怪', fromNow: '5分钟前', type: '娱乐', done: false},
  {id: '4', itemContext: '送花', fromNow: '1年前', type: '娱乐', done: true}
]

var todoNum = 0
var doneNum = 0

/* GET todos listing. */
router.get('/list', function (req, res, next) {
  todoNum = 0
  doneNum = 0
  todoList.forEach(obj => {
    if (obj.done) {
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

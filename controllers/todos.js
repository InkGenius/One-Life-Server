const todoItem = require('../model').todoItem

var todoList = []

var todoNum = 0
var doneNum = 0

exports.create = function (req, res) {
  var newTodo = req.body.data
  todoItem.create({
    typeId: newTodo.type,
    context: newTodo.context,
    status: 0,
    finishedAt: 0
  }).then(item => {
    todoNum = 0
    doneNum = 0
    todoItem.findAll().then(todos => {
      var ans = {}
      todos.forEach(obj => {
        if (obj.status === 1) {
          doneNum++
        } else {
          todoNum++
        }
      })
      todoList = todos
      ans.todoNum = todoNum
      ans.doneNum = doneNum
      ans.list = todos
      res.send(ans)
    })
  })
}

exports.list = function (req, res) {
  todoNum = 0
  doneNum = 0
  todoItem.findAll().then(todos => {
    var ans = {}
    todos.forEach(obj => {
      if (obj.status === 1) {
        doneNum++
      } else {
        todoNum++
      }
    })
    todoList = todos
    ans.todoNum = todoNum
    ans.doneNum = doneNum
    ans.list = todos
    res.send(ans)
  })
}

exports.done = function (req, res) {
  var doneId = req.body.data
  // todoItem.findById(req.body.data, {
  //   include: [{
  //     model: TodoItem,
  //     as: 'todoItems',
  //   }],
  // })
  // .then(todo => {
  //   if (!todo) {
  //     return res.status(404).send({
  //       message: 'Todo Not Found',
  //     });
  //   }
  //   return todo
  //     .update({
  //       title: req.body.title || todo.title,
  //     })
  //     .then(() => res.status(200).send(todo))
  //     .catch((error) => res.status(400).send(error));
  // })
  // .catch((error) => res.status(400).send(error));

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
}

// module.exports = {
  // retrieve(req, res) {
  //   return Todo
  //     .findById(req.params.todoId, {
  //       include: [{
  //         model: TodoItem,
  //         as: 'todoItems',
  //       }],
  //     })
  //     .then((todo) => {
  //       if (!todo) {
  //         return res.status(404).send({
  //           message: 'Todo Not Found',
  //         });
  //       }
  //       return res.status(200).send(todo);
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },
  // update(req, res) {
  //   return Todo
  //     .findById(req.params.todoId, {
  //       include: [{
  //         model: TodoItem,
  //         as: 'todoItems',
  //       }],
  //     })
  //     .then(todo => {
  //       if (!todo) {
  //         return res.status(404).send({
  //           message: 'Todo Not Found',
  //         });
  //       }
  //       return todo
  //         .update({
  //           title: req.body.title || todo.title,
  //         })
  //         .then(() => res.status(200).send(todo))
  //         .catch((error) => res.status(400).send(error));
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },
  // destroy(req, res) {
  //   return Todo
  //     .findById(req.params.todoId)
  //     .then(todo => {
  //       if (!todo) {
  //         return res.status(400).send({
  //           message: 'Todo Not Found',
  //         });
  //       }
  //       return todo
  //         .destroy()
  //         .then(() => res.status(204).send())
  //         .catch((error) => res.status(400).send(error))
  //     })
  //     .catch((error) => res.status(400).send(error))
  // },
// }

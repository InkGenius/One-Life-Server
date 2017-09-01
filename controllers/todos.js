const todoItem = require('../model').todoItem

var todoList = []

var todoNum = 0
var doneNum = 0

module.exports = {
  create (req, res) {
    var newTodo = req.body.data
    return todoItem.create({
      typeId: newTodo.typeId,
      context: newTodo.context,
      status: 0,
      finishedAt: 0
    }).then((todo) => res.status(201).send(this.list(req, res)))
      .catch((error) => res.status(400).send(error))
  },
  findAll (req, res) {
    return todoItem.findAll({
      include: [{
        model: todoItem,
        as: 'todoItems'
      }],
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then((todos) => res.status(200).send(todos))
    .catch((error) => res.status(400).send(error))
  },
  list (req, res) {
    todoList = this.findAll(req, res)
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
  },
  done (req, res) {
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
  }
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
}

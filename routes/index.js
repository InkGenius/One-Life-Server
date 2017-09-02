var express = require('express')
const todosController = require('../controllers/todos')
var router = express.Router()

router.get('/todos/list', todosController.list)
router.post('/todos/done', todosController.done)
router.post('/todos/add', todosController.create)
router.post('/todos/delete', todosController.delete)

module.exports = router

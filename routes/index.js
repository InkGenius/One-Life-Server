var express = require('express')
const todosController = require('../controllers/todos')
var router = express.Router()

/* GET todos listing. */
router.get('/todos/list', todosController.list)
router.post('/todos/done', todosController.done)
router.post('/todos/add', todosController.create)

module.exports = router

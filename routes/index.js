var express = require('express')
const todosController = require('../controllers/todos')
const recordsController = require('../controllers/records')
const userController = require('../controllers/user')
var router = express.Router()
var multer = require('multer')
var uploadFolder = './public/images/record'

// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)              // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    var type = /\.[^.]+$/.exec(file.originalname)
    cb(null, file.fieldname + '_' + Date.now() + type)
  }
})
var upload = multer({ storage: storage })

router.get('/todos/list', todosController.list)
router.post('/todos/done', todosController.done)
router.post('/todos/add', todosController.create)
router.post('/todos/delete', todosController.delete)

router.post('/record/add', upload.single('recordpic'), recordsController.create)
router.get('/record/list', recordsController.list)

router.get('/user/currentUser', userController.currentUser)
module.exports = router

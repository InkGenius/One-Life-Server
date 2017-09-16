const Record = require('../model').record
const Recordpicture = require('../model').recordpicture
const User = require('../model').user
const Experience = require('../model').experience

const moment = require('moment')
moment.locale('zh-cn')

function findAll (req, res) {
  Record.findAll({
    include: [{
      model: User
    }, {
      model: Experience
    }, {
      model: Recordpicture,
      as: 'Recordpictures'
    }]
  }).then(record => {
    console.log(JSON.stringify(record))
    res.send(record)
  })
}
exports.create = function (req, res) {
  var recordpic = req.file

  Record.create({
    userId: req.body.userid,
    experienceId: req.body.experienceid,
    context: req.body.context,
    mood: req.body.mood
  }).then(record => {
    Recordpicture.create({
      recordId: record.id,
      url: 'http://localhost:3001/images/record/' + recordpic.filename,
      type: 1
    }).then(item => {
      findAll(req, res)
    })
  })
}

exports.list = function (req, res) {
  findAll(req, res)
}

exports.done = function (req, res) {
  Record.findById(req.body.data).then(todo => {
    if (!todo) {
      return res.status(404).send({
        message: 'Todo Not Found'
      })
    }
    todo.update({
      status: true,
      finishedAt: Date.now()
    }).then(() => {
      findAll(req, res)
    })
  }).catch((error) => res.status(400).send(error))
}

exports.delete = function (req, res) {
  Record.findById(req.body.data).then(todo => {
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

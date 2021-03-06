const express = require('express')
const Todo = require('../models/todo.js')
const router = express.Router()

router.get('/', (req, res) => {
  Todo.find({}, function (err, todos) {
    if (err) {
      return res.status(422).json({ 'error message': 'Not Successful'})
    }
    res.json(todos)
  })
})

router.get('/:id', (req, res) => {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return res.status(422).json({ 'error message': 'Not Successful'})
    res.json(todo)
  })
})

router.delete('/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) return res.status(422).json({ 'error message': 'Not Successful'})
    res.json({ 'message': 'deleted' })
  })
})

router.post('/', (req, res) => {
  Todo.create(req.body, (err, todo) => {
    if (err) return res.status(422).json({ 'error message': 'Not Successful'})
    res.json(todo)
  })
})

router.put('/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) {
      res.status(422).json({ 'error message': 'Not Successful'})
      return
    }
    res.redirect(200, '/')
  })
})

router.delete('/', (req, res) => {
  Todo.remove({}, function (err) {
    if (err) return res.status(422).json({ 'error message': 'Not Successful'})
    res.json({ 'message': 'deleted' })
  })
})

//
//
//
//
// function create (params) {
//   //if (typeof (params) === Object) {
//     Todo.create(params, function (err, todo) {
//       if (err) return console.log(err)
//       console.log(todo)
//     })
//   //}
// }
//
// function list () {
//
// }
//
// function show (id) {
//   Todo.findById(id, function (err, todo) {
//     if (err) return console.log(err)
//     console.log(todo)
//   })
// }
//
// function update (id, params) {
// //  if (typeof (params) === Object) {
//     Todo.findByIdAndUpdate(id, params, function (err) {
//       if (err) return console.log(err)
//       console.log(`Todo _id ${id} has been updated.`)
//       console.log(show(id))
//     })
//   //}
// }
//
// function destroy (id) {
//   Todo.findByIdAndRemove(id, function (err) {
//     if (err) return console.log(err)
//     console.log(`Todo _id ${id} has been removed.`)
//   })
// }
//
// function destroyAll () {
//   Todo.remove({}, function (err) {
//     if (err) return console.log(err)
//     console.log('All Todos has been removed.')
//   })
// }

module.exports = router

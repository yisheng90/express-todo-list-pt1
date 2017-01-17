const express = require('express')
const Todo = require('../models/todo.js')
const router = express.Router({mergeParams: true})

router.get('/new', (req, res) => {
  res.render('todos/new', {todo: {name: 'Task Name', description: 'Description', completed: 'false', list_id: req.params.id }})
})

router.get('/', (req, res) => {
  Todo.find({list_id: req.params.id}).populate('list_id').exec(  (err, todos) => {
    if (err) {
      return res.status(422).json({ 'error message': 'Not Successful'})
    }
    res.render('todos/index', {todos: todos})
  })
})

router.get('/:id', (req, res) => {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return res.status(422).json({ 'error message': 'Not Successful'})
    console.log(todo)
    res.render('todos_id', {todo: todo})
  })
})

router.get('/:id/edit', (req, res) => {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return res.status(422).json({ 'error message': 'Not Successful'})
    console.log(todo)
    res.render('todos_id_edit', {todo: todo, path: req.path})
  })
})

router.delete('/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) return res.status(422).json({ 'error message': 'Not Successful'})
    res.redirect('/todos')
  })
})

router.post('/new', (req, res) => {
  Todo.create(req.body, (err, todo) => {
    if (err) return res.status(422).json({ 'error message': 'Not Successful'})
    res.redirect(`${todo._id}`)
  })
})

router.put('/:id/edit', (req, res) => {
  if (req.body.name.length < 5) {
    res.redirect(`/todos/${req.params.id}/edit`)
  } else {
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err) {
      if (err) {
        res.status(422).json({ 'error message': 'Not Successful'})
        return
      }
      res.redirect(`/todos/${req.params.id}`)
    })
  }
})

router.delete('/', (req, res) => {
  Todo.remove({}, function (err) {
    if (err) return res.status(422).json({ 'error message': 'Not Successful'})
    res.redirect('/todos')
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

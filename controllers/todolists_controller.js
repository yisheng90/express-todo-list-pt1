const express = require('express')
const Todo = require('../models/todo.js')
const TodoList = require('../models/todolist.js')
const todoController = require('./todos_controller')
const router = express.Router()

router.use('/:id/todos', todoController)

router.get('/new', (req, res) => {
  res.render('todolist/new')
})

router.get('/', (req, res) => {
  TodoList.find({}, (err, list) => {
    res.render('todolist/index', {list: list})
  })
})

router.post('/new', (req, res) => {
  TodoList.create(req.body, (err, list)=>{
      res.redirect(`/todolists/${list._id}`)
  })
})

router.get('/:id/todos', (req, res) => {
  TodoList.findById(req.params.id, (err, list) => {
    // res.render('todolist/todolist_id', {list: list})
    res.redirect(`/todolists/${list._id}/todos`)
  })
})

router.get('/:id/edit', (req, res) => {
  TodoList.findById(req.params.id, (err, list) => {
    res.render('todolist/edit', {list: list})
  })
})

router.put('/:id/edit', (req, res) => {
  TodoList.findOneAndUpdate({_id:req.params.id},req.body, (err, list) => {
    res.redirect(`/todolists/${list._id}`)
  })
})

router.delete('/:id', (req, res) => {
  TodoList.findByIdAndRemove(req.params.id, (err) => {
    res.redirect('/todolists')
  })
})




module.exports = router

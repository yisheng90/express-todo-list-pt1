const mongoose = require('mongoose')
const TodoList = require('./todolist.js')
const todoSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 5},
  description: { type: String},
  completed: {type: Boolean},
  list_id: {type: mongoose.Schema.ObjectId, ref: 'TodoList'}
})
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo

const mongoose = require('mongoose')
const Todo = require('./todo.js')
const todoListSchema = new mongoose.Schema({
  name: {type:String},
  color: {type:String},
  todos: [{type: mongoose.Schema.ObjectId, ref: 'Todo'}]
})

const TodoList = mongoose.model('TodoList', todoListSchema)

module.exports = TodoList

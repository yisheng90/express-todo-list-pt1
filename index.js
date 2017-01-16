const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const todoController = require('./controllers/todos_controller')

mongoose.connect('mongodb://127.0.0.1/todo-app')
mongoose.Promise = global.Promise
// app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/todos', todoController)

let server = app.listen(3000, () => {
  console.log('Serving listening on port 3000')
})

module.exports = server

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const todoController = require('./controllers/todos_controller')
const todolistsController = require('./controllers/todolists_controller')
const ejsLayouts = require('express-ejs-layouts')
const path = require('path')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/todo-app')
mongoose.Promise = global.Promise
// app.set('view engine', 'ejs');
app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(ejsLayouts)

app.use('/todolists', todolistsController)

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  res.redirect(`/todos`)
})



let server = app.listen(3000, () => {
  console.log('Serving listening on port 3000')
})

module.exports = server

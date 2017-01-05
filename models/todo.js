const uuidGenerator = require('uuid/v4')
const fs = require('fs')

// load todos from the file
var todos = require('../data.json').todos

// save todos to the file
function save () {
  const json = JSON.stringify({ todos: todos })
  fs.writeFile('data.json', json, 'utf8')
}
// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  todos.push({
    _id: uuidGenerator(),
    name: params.name
  })
  save()
  return true
}

// READ (list & show)
function list () {
  return todos
}
function show (id) {
  return todos.filter((elem) => {
    return elem._id === id
  })[0] || null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, updatedParams) {
  const todo = todos.filter((elem) => {
    return elem._id === id
  })[0]
  if (todo) {
    todo.name = updatedParams.name
    todo.description = updatedParams.description
    todo.completed = updatedParams.completed
    save()
    return true
  }
  return false
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  todos = todos.filter((elem) => {
    return elem._id !== id
  })
  save()
  return true
}
function destroyAll () {
  todos = []
  save()
  return true
}

module.exports = {
  create: create,
  list: list,
  show: show,
  update: update,
  destroy: destroy,
  destroyAll: destroyAll
}

const expect = require('chai').expect
const request = require('supertest')
const app = require('../index.js')
const Todo = require('../models/todo.js')

describe('GET /todos', () => {
  it('should return a 200 response when request GET/Todos', (done) => {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an array', (done) => {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(response.body).to.be.an('array')
      done()
    })
  })
  it('should return an Object with property "name"', (done) => {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(response.body[0]).to.have.property('name')
      done()
    })
  })
  it('should return an Object with property "description"', (done) => {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(response.body[0]).to.have.property('description')
      done()
    })
  })
  it('should return an Object with property "completed"', (done) => {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(response.body[0]).to.have.property('completed')
      done()
    })
  })
  it('should return all the record in the database', (done) => {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    .end((error, response) => {
      Todo.find({}, (err, todos) => {
        expect(response.body.length).to.be.equal(todos.length)
        done()
      })

    })
  })
})

Todo.find({}).exec(function (err, todos) {
  let id = todos[0]._id
  let length = todos.length

  describe('GET /todos/:id', () => {
    it('should return a 200 response', (done) => {
      request(app).get(`/todos/${id}`)
      .set('Accept', 'application/json')
      .expect(200, done)
    })
    it('should return an Object containing "Name", "Description", "Completed"', (done) => {
      request(app).get(`/todos/${id}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body).to.have.property('name') &&
        expect(response.body).to.have.property('description') &&
        expect(response.body).to.have.property('completed')
        done()
      })
    })
  })

  describe('POST /todos', () => {
    it('should return a 200 response', (done) => {
      request(app).post('/todos')
     .set('Accept', 'applcation/json')
     .send({
       name: 'This is for testing',
       description: 'This is for testing',
       completed: true
     })
     .expect(200, done)
    })
    it('should return 422 response if field name is wrong', (done) => {
      request(app).post('/todos')
     .set('Accept', 'applcation/json')
     .send({
       name: 'T',
       description: 'This is for testing',
       completed: true
     })
     .expect(422, done)
    })
    it('should return an error message if field name is wrong', (done) => {
      request(app).post('/todos')
     .set('Accept', 'applcation/json')
     .send({
       name: 'T',
       description: 'This is for testing',
       completed: true
     })
     .end((err, response) => {
       expect(response.body).to.have.property('error message')
       done()
     })
    })
    it('should add a new todo to the database', (done) => {
      request(app).post('/todos')
     .set('Accept', 'applcation/json')
     .send({
       name: 'This is for testing',
       description: 'This is for testing',
       completed: true
     })
     .end(() => {
       Todo.find({}, (err, todos) => {
         expect(todos.length).to.be.equal(length + 2)
         done()
       })
     })
    })
  })

  describe('PUT /todos/:id', () =>{
    it('should return a 200 response', (done) => {
      request(app).put(`/todos/${id}`)
      .set('Accept', 'application/json')
      .send({
        name: "Edited"
      })
      .expect(200, done)
    })
    it('should update a todo document', (done) => {
      request(app).put(`/todos/${id}`)
      .set('Accept', 'application/json')
      .send({
        name: "Edited"
      })
      .end(()=> {
        Todo.findById(id, (err, todo)=> {
          expect(todo.name).to.be.equal('Edited')
          done()
        })
      })
    })
  })

  describe('DELETE /todos/:id', () =>{
    it('should remove a todo document', (done) => {
      request(app).delete(`/todos/${id}`)
      .end(()=> {
        Todo.findById(id, (err, todo) =>{
          expect(todo).to.be.equal(null)
          done()
        })
      })
    })
  })

})

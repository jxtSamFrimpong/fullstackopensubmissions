/* eslint-disable indent */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
}, 10000)

describe('/api/notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(2)
  }, 10000)

  test('the first note is about the ease of HTML', async () => {
    const response = await api.get('/api/notes')

    expect(response.body[0].content).toBe('HTML is easy')
  }, 10000)

  test('the second note is about HTTP methods', async () => {
    const response = await api.get('/api/notes')

    expect(response.body[1].content).toEqual('Browser can execute only JavaScript')
    expect(response.body[1].important).toEqual(true)
  }, 10000)

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
  }, 10000)

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain('Browser can execute only JavaScript')
  }, 10000)


  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('a valid note can be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  }, 10000)

})

afterAll(async () => {
  await mongoose.connection.close()
})
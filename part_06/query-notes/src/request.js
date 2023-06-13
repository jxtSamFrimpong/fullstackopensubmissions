import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export const getNotes = () =>
  axios.get(`${baseUrl}/notes`).then(res => res.data)

export const createNote = newNote =>
  axios.post(`${baseUrl}/notes`, newNote).then(res => res.data)

export const updateNote = updatedNote =>
  axios.put(`${baseUrl}/notes/${updatedNote.id}`, updatedNote).then(res => res.data)
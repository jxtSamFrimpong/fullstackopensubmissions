import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export const getDotes = () =>
  axios.get(`${baseUrl}/anecdotes`).then(res => res.data)

export const createDote = newDote =>
  axios.post(`${baseUrl}/anecdotes`, newDote).then(res => res.data)

export const updateDote = updatedDote =>
  axios.put(`${baseUrl}/anecdotes/${updatedDote.id}`, updatedDote).then(res => res.data)
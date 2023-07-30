const express = require('express')
require('express-async-errors')
blogsRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const { unknownEndpoint, errorHandler } = require('./middlewares/errorHandlers')

app.use(cors())
app.use(express.json())


// app.use(unknownEndpoint)
// app.use(errorHandler)

app.use('/api/blogs', blogsRouter)


app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app;
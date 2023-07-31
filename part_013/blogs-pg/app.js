const express = require('express')
require('express-async-errors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const cors = require('cors')
const { unknownEndpoint, errorHandler } = require('./middlewares/errorHandlers')

app.use(cors())
app.use(express.json())


// app.use(unknownEndpoint)
// app.use(errorHandler)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)


app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app;
const express = require('express')
const mongoose = require('mongoose')
//const Blog = require('./models/blogs')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const { unknownEndpoint, errorHandler, requestLogger } = require('./middlewares/middle')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/', (req, res) => {
    res.send('<h1>Hello, Welcome to my blog</h1>')
})
app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app;
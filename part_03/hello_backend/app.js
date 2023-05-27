/* eslint-disable indent */
const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
require('express-async-errors')
const notesRouter = require('./controllers/note')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { unknownEndpoint, errorHandler, requestLogger } = require('./utils/middle')
const logger = require('./utils/logger')
const morgan = require('morgan');
const config = require('./utils/config')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(requestLogger)

morgan.token('reqBody', (req) => JSON.stringify(req.body));
const customMorganFormat = ':method :url :status :res[content-length] - :response-time ms :reqBody'
app.use(morgan(customMorganFormat));

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.get('/', (req, res) => {
    res.send('<h1>Hello pun</h1>');
});


app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

/* eslint-disable indent */
const logger = require('../utils/logger')

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' });
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }
    else {
        response.static(500).end();
    }

    next(error)
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const newestID = (notes) => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    newestID,
    requestLogger
}
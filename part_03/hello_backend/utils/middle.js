/* eslint-disable indent */
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' });
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
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

const getTokenFrom = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    else {
        request.token = null
    }
    next()
}

const getTokenIdentity = (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.tokenUser = decodedToken.id
    request.tokenUserName = decodedToken.username
    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    newestID,
    requestLogger,
    getTokenFrom,
    getTokenIdentity
}
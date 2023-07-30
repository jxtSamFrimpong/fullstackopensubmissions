const logger = require('../utils/logger')

class MissingIDParameterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MissingIDParameterError';
    }
}

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' });
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'SequelizeDatabaseError') {
        return response.status(400).send({ error: error.message })
    }
    if (error.name === 'SequelizeValidationError') {
        return response.status(400).send({ error: error.errors })
    }
    else if (error.name === 'PostBlogTypeValidatorError') {
        return response.status(400).send({ error: error.message })
    }
    else if (error.name === 'SequelizeConnectionRefusedError') {
        return response.status(500).send({ error: "cant connect to database, please try again later" })
    }
    else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        //console.log(request.token)
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }
    else {
        response.statusCode = 500
        response.json(error)
    }

    next()
}


module.exports = {
    unknownEndpoint,
    errorHandler,
    MissingIDParameterError
}
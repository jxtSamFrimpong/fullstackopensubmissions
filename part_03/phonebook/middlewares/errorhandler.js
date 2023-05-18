const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' });
    next()
}

module.exports = {
    errorHandler,
    unknownEndpoint
};
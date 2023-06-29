const { GraphQLError } = require('graphql')

const minLengthErrors = (arg, val, len) => {
    if (val.length < len) {
        throw new GraphQLError(`MINIMUN_LENGTH_ERR, ${arg} should be at least ${len}`, {
            extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: val
            }
        })
    }
}

module.exports = {
    minLengthErrors
}
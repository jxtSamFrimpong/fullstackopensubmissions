const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const User = require('../models/users')

const authenticateUser = (currentUser, args) => {
    if (!currentUser) {
        throw new GraphQLError('Authentication Error', {
            extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args
            }
        })
    }
}

const retriveTokenUser = async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User
            .findById(decodedToken.id)
        const { _doc: { passwordHash: _passwordHash, ...meUser } } = currentUser
        //console.log(currentUser, meUser)
        return { currentUser, meUser }
    }
}

module.exports = {
    authenticateUser,
    retriveTokenUser
}
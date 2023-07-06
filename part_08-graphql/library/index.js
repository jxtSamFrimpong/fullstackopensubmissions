const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const { minLengthErrors } = require('./utils/errors')
const { authenticateUser, retriveTokenUser } = require('./middleware/authenticateUser')
const mongoose = require('mongoose')
const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/users')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const resolvers = require('./resolvers/resolvers')
const typeDefs = require('./schema/schema')

const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')


//TODO move to config.js
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

// startStandaloneServer(server, {
//     listen: { port: 4000 },
//     context: retriveTokenUser
// }).then(({ url }) => {
//     console.log(`Server ready at ${url}`)
// })

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    })

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            }
        ]
    })

    await server.start()

    app.use(
        '/',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: retriveTokenUser
        })
    )

    const PORT = 4000
    httpServer.listen(PORT, () => {
        console.log(`Server is now running on http://localhost:${PORT}`)
    })
}

start()
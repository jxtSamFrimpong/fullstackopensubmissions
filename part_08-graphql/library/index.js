const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const { minLengthErrors } = require('./utils/errors')
const mongoose = require('mongoose')
const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/users')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

// let books = [
//     {
//         title: 'Clean Code',
//         published: 2008,
//         author: 'Robert Martin',
//         id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring']
//     },
//     {
//         title: 'Agile software development',
//         published: 2002,
//         author: 'Robert Martin',
//         id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//         genres: ['agile', 'patterns', 'design']
//     },
//     {
//         title: 'Refactoring, edition 2',
//         published: 2018,
//         author: 'Martin Fowler',
//         id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring']
//     },
//     {
//         title: 'Refactoring to patterns',
//         published: 2008,
//         author: 'Joshua Kerievsky',
//         id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring', 'patterns']
//     },
//     {
//         title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//         published: 2012,
//         author: 'Sandi Metz',
//         id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//         genres: ['refactoring', 'design']
//     },
//     {
//         title: 'Crime and punishment',
//         published: 1866,
//         author: 'Fyodor Dostoevsky',
//         id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//         genres: ['classic', 'crime']
//     },
//     {
//         title: 'The Demon ',
//         published: 1872,
//         author: 'Fyodor Dostoevsky',
//         id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//         genres: ['classic', 'revolution']
//     },
// ]

/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
    type User {
        name: String!
        username: String! 
        favoriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
      }
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int
    }
    type Genre {
        name: String!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [Genre!]!
        id: ID!
    }
    type Query {
        dummy: Int
        me: User
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]!
            ): Book
        editAuthor(
            born: Int
            name: String!
        ): Author

        createUser(
            name: String
            username: String!
            password: String!
            favoriteGenre: String!
          ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    User: {
        id: (root) => root._id.toString()
    },
    Book: {
        genres: (root) => {
            return root.genres.map(name => {
                return { name }
            })
        },
    },
    Author: {
        bookCount: async (root) => {
            return await Book.countDocuments({ author: root.id })
        }
    },


    Query: {
        dummy: () => 0,
        me: async (_, __, { meUser }) => meUser,
        bookCount: async (_, __, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('Authentication Error', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: __
                    }
                })
            }
            return await Book.countDocuments({})
        },
        authorCount: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('Authentication Error', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args
                    }
                })
            }
            return await Author.countDocuments({})
        },
        allBooks: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('Authentication Error', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args
                    }
                })
            }
            const { author, genre } = args
            const query = {};
            if (author) {
                //console.log(author);
                const authorExist = await Author.findOne({ name: author })
                if (authorExist) {
                    //console.log(authorExist);
                    query.author = authorExist._id;
                }

            }
            if (genre) {
                query.genres = genre;
            }

            try {
                const books = await Book.find(query).populate('author')
                return books
            } catch (error) {
                throw new GraphQLError('Fetching books failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }

        },
        allAuthors: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('Authentication Error', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args
                    }
                })
            }
            return await Author.find({})
        }
    },

    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('Authentication Error', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args
                    }
                })
            }
            minLengthErrors('title', args.title, 8)
            minLengthErrors('author', args.author, 8)
            const authorExist = await Author.findOne({ name: args.author })
            if (!authorExist) {
                const createAuthorFirst = new Author({ name: args.author })
                try {
                    createAuthorFirst.save()
                }
                catch (err) {
                    throw new GraphQLError('Saving Author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                            err
                        }
                    })
                }
            }
            const existingAuthor = await Author.findOne({ name: args.author })

            try {
                const book = new Book({ ...args, author: existingAuthor._id })
                await book.save()
                return book.populate('author')
            } catch (error) {
                throw new GraphQLError('Saving Book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }

        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('Authentication Error', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args
                    }
                })
            }
            const { name, born } = args
            minLengthErrors('name', name, 8)

            const authorExist = await Author.findOne({ name })
            if (!authorExist) {
                return null
            }
            try {
                const updatedAuthor = await Author.findByIdAndUpdate(authorExist._id, { name, born }, { new: true, runValidators: true, context: 'query' })
                return updatedAuthor
            } catch (error) {
                throw new GraphQLError('Updating failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }
        },
        createUser: async (root, args) => {
            const { name, username, password, favoriteGenre } = args
            minLengthErrors('username', username, 6)
            minLengthErrors('password', password, 8)

            const saltRounds = 10
            try {
                const passwordHash = await bcrypt.hash(password, saltRounds)
                const user = new User({
                    name,
                    username,
                    passwordHash,
                    favoriteGenre
                })
                const { _doc: { passwordHash: _passwordHash, ...savedUser } } = await user.save()
                //console.log(savedUser);
                return savedUser
            }
            catch (error) {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }


        },
        login: async (root, args) => {
            const { username, password } = args
            minLengthErrors('username', username, 6)
            minLengthErrors('password', password, 8)

            try {
                const user = await User.findOne({ username })
                const passwordCorrect = user === null
                    ? false
                    : await bcrypt.compare(password, user.passwordHash)

                console.log(!(user && passwordCorrect))
                if (!(user && passwordCorrect)) {
                    throw new GraphQLError('Invalid username or password', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args,
                            error
                        }
                    })
                }

                const userForToken = {
                    username: user.username,
                    id: user._id,
                }

                const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
                return {
                    value: token
                }
            }
            catch (error) {
                throw new GraphQLError('Login failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }


        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
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
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
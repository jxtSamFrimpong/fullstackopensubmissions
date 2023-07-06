const { GraphQLError, subscribe } = require('graphql')
const { minLengthErrors } = require('../utils/errors')
const { authenticateUser, retriveTokenUser } = require('../middleware/authenticateUser')
const Author = require('../models/authors')
const Book = require('../models/books')
const User = require('../models/users')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
        me: async (_, __, { meUser }) => {
            authenticateUser(meUser, null)
            return meUser
        },
        bookCount: async (root, args, { currentUser }) => {
            authenticateUser(currentUser, args)
            return await Book.countDocuments({})
        },
        authorCount: async (root, args, { currentUser }) => {
            authenticateUser(currentUser, args)
            return await Author.countDocuments({})
        },
        allBooks: async (root, args, { currentUser }) => {
            authenticateUser(currentUser, args)
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
            authenticateUser(currentUser, args)
            return await Author.find({})
        },
        allGenres: async (root, args, { currentUser }) => {
            authenticateUser(currentUser, args)
            const _genres = new Set()
            const _books = await Book.find({})
            _books.map(bk => bk.genres.forEach(val => _genres.add(val)))
            //console.log(_genres)
            return [..._genres]
        }
    },

    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            authenticateUser(currentUser, args)
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
            //console.log('existingAuthor', existingAuthor)

            try {
                const book = new Book({ ...args, author: existingAuthor._id })
                await book.save()
                const result = book.populate('author')
                pubsub.publish('BOOK_ADDED', { bookAdded: result })
                return result
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
            authenticateUser(currentUser, args)
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
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers
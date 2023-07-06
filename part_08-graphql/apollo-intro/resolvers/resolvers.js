const Person = require('../models/persons')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        },
        friendOf: async (root) => {
            // return list of users 
            const friends = await User.find({
                friends: {
                    $in: [root._id]
                }
            })
            return friends
        }
    },
    Query: {
        personCount: async (a, b, context) => Person.collection.countDocuments(),//persons.length,
        allPersons: async (root, args, context) => {
            // if (!args.phone) {
            //     return persons
            // }
            // const byPhone = (person) =>
            //     args.phone === 'YES' ? person.phone : !person.phone
            //return persons.filter(byPhone)
            if (!args.phone) {
                return Person.find({})
            }
            return Person.find({ phone: { $exists: args.phone === 'YES' } })

        },
        findPerson: async (root, args, context) => {
            //return  persons.find(p => p.name === args.name)
            return Person.findOne({ name: args.name })
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const currentUser = context.currentUser
            //ensure auth
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            const person = new Person({ ...args })
            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            } catch (error) {
                throw new GraphQLError('Saving person failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            pubsub.publish('PERSON_ADDED', { personAdded: person })
            return person
        },
        addAsFriend: async (root, args, { currentUser }) => {
            const isFriend = (person) =>
                currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())

            if (!currentUser) {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }

            const person = await Person.findOne({ name: args.name })
            if (!isFriend(person)) {
                currentUser.friends = currentUser.friends.concat(person)
            }

            await currentUser.save()

            return currentUser
        },
        editNumber: async (root, args, context) => {
            const person = await Person.findOne({ name: args.name })
            person.phone = args.phone
            try {
                await person.save()
            } catch (error) {
                throw new GraphQLError('Saving number failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            pubsub.publish('PERSON_ADDED', { personAdded: person })
            return person
        },

        createUser: async (root, args) => {
            const user = new User({ username: args.username })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator('PERSON_ADDED')
        },
    },
}

module.exports = resolvers
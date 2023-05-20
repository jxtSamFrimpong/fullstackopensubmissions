/* eslint-disable indent */
//const { MONGODB_URI } = require('./../utils/config')
//const logger = require('../utils/logger');
const mongoose = require('mongoose')

// mongoose.set('strictQuery', false)

// const url = MONGODB_URI

// console.log('connecting to', url)

// mongoose.connect(url)
//     .then(() => {
//         logger.info('connected to MongoDB')
//     })
//     .catch((error) => {
//         logger.error('error connecting to MongoDB:', error.message)
//     })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 8,
        required: true
    },
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)

const mongoose = require('mongoose')


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 8
    },
    published: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} given should be an integer value'
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('Book', BookSchema)
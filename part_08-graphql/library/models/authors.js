const mongoose = require('mongoose')


const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 8
    },
    born: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Author', AuthorSchema)
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, minLength: 6 },
    name: String,
    passwordHash: String,
    favoriteGenre: String,
})

userSchema.plugin(uniqueValidator)

// userSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         // returnedObject.id = returnedObject._id.toString()
//         // delete returnedObject._id
//         // delete returnedObject.__v
//         // the passwordHash should not be revealed
//         delete returnedObject.passwordHash
//     }
// })

const User = mongoose.model('User', userSchema)

module.exports = User;
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    name: String,
    username: String,
    password: String
})

const User = model('User', userSchema)

module.exports = User
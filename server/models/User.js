const { model, Schema } = require('mongoose');



const {bookSchema}  = require('./Book')
const userSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    email: String,
    username: String,
    password: String,

    keptBooks: [bookSchema]
});

const User = model('User', userSchema);

module.exports = User;

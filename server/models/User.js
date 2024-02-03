const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    email: String,
    username: String,
    password: String,

    keptBooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

const User = model('User', userSchema);

module.exports = User;

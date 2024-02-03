const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');


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
        type: Schema.Types.Mixed,
        ref: 'Book'
    }]
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;

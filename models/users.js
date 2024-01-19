const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
        minlength: 4,
    },
});

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.pass, salt);
        this.pass = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    pass: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

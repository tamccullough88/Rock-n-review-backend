const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        Required: true
    },
    userName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)
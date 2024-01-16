//require mongoose
const mongoose = require('mongoose')

const { Schema } = mongoose

const reviewSchema = new Schema({
    stars: { type: Number, required: true },
    content: { type: String, default: '' },
    userName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})




//export
module.exports = mongoose.model('Review', reviewSchema)
//require mongoose
const mongoose = require('mongoose')

const { Schema } = mongoose

const dataSchema = new Schema({
    _Id: { type: String },
    artistName: { type: String },
    albumArt: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
})

module.exports = mongoose.model('Data', reviewSchema)
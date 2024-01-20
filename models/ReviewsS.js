const mongoose = require('mongoose');

const reviewSSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    albumTitle: {
        type: String,
        required: true
    },
    trackName: {
        type: String,
        required: true
    },
    trackId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comments: {
        type: String,
        required: true
    },

});

const ReviewS = mongoose.model('ReviewS', reviewSSchema);

module.exports = ReviewS;
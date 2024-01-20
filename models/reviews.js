const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    albumTitle: {
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
    albumId: {
        type: String
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    songs:{
        type: String,
        required: true

    },
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
    
});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
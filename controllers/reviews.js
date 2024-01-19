const Review = require('../models/reviews');

// Controller to handle review submissions
const submitReview = async (req, res) => {
    try {
        const { artist, albumTitle, rating, comments } = req.body;

        // Create a new review instance
        const newReview = new Review({
            artist,
            albumTitle,
            rating,
            comments,
        });

        // Save the review to the database
        await newReview.save();

        res.status(200).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Other review-related controllers can be added here as needed

module.exports = {
    submitReview,
};


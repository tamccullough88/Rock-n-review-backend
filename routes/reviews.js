const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');

// Route to handle review submissions
router.post('/', async (req, res) => {
    try {
        const { artist, albumTitle, rating, comments } = req.body;

        // Check if required fields are present
        if (!artist || !albumTitle || !rating || !comments) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate the rating (assuming it's a number between 1 and 5)
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Invalid rating value' });
        }

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
        if (error.name === 'ValidationError') {
            // Handle validation errors from MongoDB
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
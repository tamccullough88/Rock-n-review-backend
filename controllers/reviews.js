// controllers/reviews.js

const Review = require('../models/reviews');

// Get all reviews
async function getAllReviews(req, res) {
    try {
        const allReviews = await Review.find();
        res.json(allReviews);
    } catch (error) {
        console.error('Error fetching all reviews', error);
        res.status(500).json({ message: 'Error getting all reviews' });
    }
}

// Get review by album ID
async function getAlbumReview(req, res) {
    try {
        const albumId = req.params.albumId;
        const reviews = await Review.find({ albumId });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews by album ID', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Submit a new review
async function submitReview(req, res) {
    try {
        const { artist, albumTitle, albumId, rating, comments } = req.body;

        // Check if required fields are present
        if (!artist || !albumTitle || !albumId || !rating || !comments) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate the rating
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Invalid rating value' });
        }

        // Create a new review instance
        const newReview = new Review({
            artist,
            albumTitle,
            albumId,
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
}

async function updateReview(req, res) {
    try {
        const reviewId = req.params.id; // Change this line
        const { comments } = req.body;

        // Check if the review exists
        const existingReview = await Review.findById(reviewId);
        if (!existingReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the review
        existingReview.comments = comments;
        await existingReview.save();

        res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
        console.error('Error updating review:', error);
        if (error.name === 'ValidationError') {
            // Handle validation errors from MongoDB
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete review by ID
async function deleteReview(req, res) {
    try {
        const reviewId = req.params.id;

        // Check if the review exists
        const existingReview = await Review.findById(reviewId);
        if (!existingReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Delete the review
        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getAllReviews,
    getAlbumReview,
    submitReview,
    updateReview,
    deleteReview
};

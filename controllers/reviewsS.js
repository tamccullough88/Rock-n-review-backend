const Review = require('../models/ReviewsS');

// get all reviews
async function getAllReviews(req, res) {
    try {
        const allReviews = await Review.find();
        res.json(allReviews);
    } catch (error) {
        console.error('Error fetching all users', error);
        res.status(500).json({ message: 'Error getting all users' });
    }
}

// submit album review
async function submitReview(req, res) {

    try {
        const { artist, albumTitle, trackName, trackId, rating, comments } = req.body;

        // Check if required fields are present
        if (!artist || !albumTitle || !trackName || !trackId || !rating || !comments) {
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
            trackName,
            trackId,
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
//get review by album name

async function getSongReview(req, res) {
    const review = await Review.find({ trackId: req.params.trackId })
    res.status(200).json(review)
}

// update review by Id
async function updateReview(req, res) {
    try {
        const { artist, albumTitle, trackName, rating, comments } = req.body;
        const updatedReview = await Review.findOneAndUpdate(
            { _id: req.params.id },
            { artist, albumTitle, trackName, rating, comments },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json({ message: 'Review updated successfully', updatedReview });
    } catch (error) {
        console.error('Error updating review:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// delete review by Id
async function deleteReview(req, res) {
    try {
        const deletedReview = await Review.findById({ _id: req.params.id });

        if (!deletedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully', deletedReview });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllReviews,
    submitReview,
    getSongReview,
    updateReview,
    deleteReview
};

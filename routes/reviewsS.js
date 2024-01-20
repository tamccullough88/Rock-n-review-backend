const express = require('express');
const router = express.Router();
const { getAllReviews, submitReview, getSongReview, updateReview, deleteReview } = require('../controllers/reviewsS');


router.get('/all', getAllReviews);
router.post('/', submitReview);
router.get('/:albumId', getSongReview)
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router
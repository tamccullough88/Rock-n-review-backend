const express = require('express');
const router = express.Router();
const { getAllReviews, submitReview, getSongReview } = require('../controllers/reviewsS')


router.get('/all', getAllReviews);
router.post('/', submitReview);
router.get('/:albumId', getSongReview)

module.exports = router
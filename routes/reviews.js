const express = require('express');
const router = express.Router();
const { getAllReviews, submitReview, getAlbumReview } = require('../controllers/reviews')


router.get('/all', getAllReviews);
router.post('/', submitReview);
router.get('/:albumId', getAlbumReview)

module.exports = router
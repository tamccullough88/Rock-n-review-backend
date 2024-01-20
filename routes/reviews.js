const express = require('express');
const router = express.Router();
const { getAllReviews, submitReview, getAlbumReview, deleteReview, updateReview } = require('../controllers/reviews');

router.get('/all', getAllReviews);
router.post('/', submitReview);
router.get('/:albumId', getAlbumReview);
router.delete('/:id', deleteReview);
router.put('/:id', updateReview);

module.exports = router;

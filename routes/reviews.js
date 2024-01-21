const express = require('express');
const router = express.Router();
const { getAllReviews, submitReview, getAlbumReview, deleteReview, updateReview } = require('../controllers/reviews');


router.get('/all', getAllReviews);
router.post('/', submitReview);
router.get('/:albumId', getAlbumReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;

const express = require('express');
const router = express.Router({mergeParams:true});
const reviews = require('../controllers/reviews')
const catchAsyns = require('../utlis/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsyns(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsyns(reviews.deleteReview))

module.exports = router;
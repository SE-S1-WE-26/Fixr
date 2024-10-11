const express = require('express');
const router = express.Router();
const { getAllReview, addNewReview, getOneUserReview ,deleteReview } = require('../../controllers/review/reviewController');

// Route to get all reviews
router.get('/getallreview', getAllReview);

// Route to get reviews for a specific user
router.get('/getonereview/:userId', getOneUserReview);

// Route to create a new review
router.post('/addreview', addNewReview);

// Route to delete review
router.delete('/deletereview/:reviewId', deleteReview);

module.exports = router;

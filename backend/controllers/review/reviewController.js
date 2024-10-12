const Review = require("../../models/review/review.model");

const addNewReview = async (req, res) => {
  const { rating, review, userId } = req.body;
  try {
    const newReview = await Review.create({ rating, review, userId });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error });
  }
};

// Get all reviews
const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Get all reviews for a specific user
const getOneUserReview = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId });
    if (!reviews.length) return res.status(404).json({ message: 'No reviews found for this user' });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// Delete a specific review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully', deletedReview });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};

module.exports = {
  getAllReview,
  addNewReview,
  getOneUserReview,
  deleteReview,
};

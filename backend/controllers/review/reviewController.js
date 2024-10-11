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

// Get all workers
const getAllReview = async (req, res) => {
    try {
      console.log("Fetching all reviews...");
      const reviews = await Review.find();
      console.log("Fetched reviews:", reviews);
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Error fetching reviews", error });
    }
  };
  
  

const getOneUserReview = async (req, res) => {
  try {
    // Fetch all reviews for a specific user based on userId
    const reviews = await Review.find({ userId: req.params.userId });
    if (!reviews.length) return res.status(404).json({ message: 'No reviews found for this user' });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

module.exports = {
  getAllReview,
  addNewReview,
  getOneUserReview,
};

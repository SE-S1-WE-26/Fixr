const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true } // Assuming User is another model
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

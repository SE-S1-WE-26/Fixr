// model.js
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  earnings: {
    type: String,
    required: true,
  },
  fav: {
    type: Boolean,
    default: false,
  }
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;

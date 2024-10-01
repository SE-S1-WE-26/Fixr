const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  publishedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Assuming there is a Job model for handling job postings
  }],
  rating: {
    type: Number,
    default: 0,
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;

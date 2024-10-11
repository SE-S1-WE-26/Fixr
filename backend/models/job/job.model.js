const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String]
  },
  estDuration: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  environment: {
    type: String,
    enum: ['Indoor', 'Outdoor'],
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'completed', 'canceled'],
    default: 'pending',
  },
  qrCode: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  jobCost: {
    type: Number,
  },
  interestedHandymen: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  }],
  scheduled: {
    type: Boolean,
    default: false,
  },
  scheduledDate: {
    type: Date
  },
  scheduledTime: {
    type: String,
  },
  scheduledWorkerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  },
  budget: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
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
    enum: ['open', 'closed'],
    default: 'open',
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
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
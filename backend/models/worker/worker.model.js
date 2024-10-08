const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    socialLinks: {
        type: [String],
    },
    earnings: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
    experience: {
        type: Number, // Number of years
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;

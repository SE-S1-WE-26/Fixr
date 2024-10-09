const mongoose = require('mongoose');

const eomSchema = new mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true,
    },
    place: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
});

const EOM = mongoose.model('EOM', eomSchema);

module.exports = EOM;
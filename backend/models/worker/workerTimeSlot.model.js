const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference to the Job model
        required: function() { return this.jobId !== undefined; },
    },
}, { _id: false });

const WorkerTimeSlotSchema = new mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true,
    },
    occupiedSlots: {
        type: [SlotSchema],
        default: [], 
    },
    blockedSlots: {
        type: [SlotSchema], 
        default: [],
    },
}, {
    timestamps: true,
});

const WorkerTimeSlot = mongoose.model('WorkerTimeSlot', WorkerTimeSlotSchema);

module.exports = WorkerTimeSlot;

const express = require('express');
const router = express.Router();
const {
    authenticateJWT,
    getSlotsByWorkerToken,
    getSlotsByWorkerId,
    updateSlots,
    updateSlotsToken,
    deleteSlots} = require('../../controllers/worker/workerTimeSlot.controller.js');

// Route to get slots by worker token
router.get('/', authenticateJWT, getSlotsByWorkerToken);

// Route to get slots by worker ID
router.get('/:workerId', getSlotsByWorkerId);

// Route to update occupied or blocked slots
router.put('/update',authenticateJWT, updateSlotsToken);

// Route to update occupied or blocked slots
router.put('/update/:workerId', updateSlots);

// Route to delete slots
router.delete('/delete/:workerId', deleteSlots);

module.exports = router;

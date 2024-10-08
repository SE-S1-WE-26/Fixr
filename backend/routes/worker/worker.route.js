const express = require('express');
const {
  getAllWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
  getWorkerData,
  authenticateJWT,
} = require('../../controllers/worker/worker.controller');

const router = express.Router();

// Apply authenticateJWT to protect the endpoint
router.get('/mydata', authenticateJWT, getWorkerData);

// Route to get all workers
router.get('/', getAllWorkers);

// Route to get a single worker by ID
router.get('/:id', getWorkerById);

// Route to create a new worker
router.post('/create', createWorker);

// Route to update a worker by ID
router.put('/update/:id', updateWorker);

// Route to delete a worker by ID
router.delete('/delete/:id', deleteWorker);



module.exports = router;

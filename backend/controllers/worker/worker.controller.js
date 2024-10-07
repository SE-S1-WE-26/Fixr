const Worker = require('../../models/worker/worker.model');

// Get all workers
const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workers', error });
  }
};

// Get a single worker by ID
const getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching worker', error });
  }
};

// Create a new worker
const createWorker = async (req, res) => {
  const newWorker = new Worker(req.body);
  try {
    const savedWorker = await newWorker.save();
    res.status(201).json(savedWorker);
  } catch (error) {
    res.status(400).json({ message: 'Error creating worker', error });
  }
};

// Update a worker by ID
const updateWorker = async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWorker) return res.status(404).json({ message: 'Worker not found' });
    res.status(200).json(updatedWorker);
  } catch (error) {
    res.status(400).json({ message: 'Error updating worker', error });
  }
};

// Delete a worker by ID
const deleteWorker = async (req, res) => {
  try {
    const deletedWorker = await Worker.findByIdAndDelete(req.params.id);
    if (!deletedWorker) return res.status(404).json({ message: 'Worker not found' });
    res.status(200).json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting worker', error });
  }
};

module.exports = {
  getAllWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker
};

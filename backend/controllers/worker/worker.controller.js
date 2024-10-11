const Worker = require('../../models/worker/worker.model');

// In your worker.controller.js

const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (token) {
        jwt.verify(token, '2fe3ce2f', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Get worker data by userId
const getWorkerData = async (req, res) => {
    try {
        // Find worker by userId from the JWT
        const worker = await Worker.findOne({ userId: req.user.userId }).populate('userId');
        if (!worker) return res.status(404).json({ message: 'Worker not found' });

        res.status(200).json(worker);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching worker data', error });
    }
};


// Get all workers
const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find().populate('userId');
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workers', error });
  }
};

// Get a single worker by ID
const getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).populate('userId');
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
  deleteWorker,
  getWorkerData,
  authenticateJWT,
};

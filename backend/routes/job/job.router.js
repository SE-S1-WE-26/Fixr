const express = require('express');
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require('../../controllers/job/job.controller');

const router = express.Router();

// Route to get all jobs
router.get('/', getAllJobs);

// Route to get a single job by ID
router.get('/:id', getJobById);

// Route to create a new job
router.post('/create', createJob);

// Route to update a job by ID
router.put('/update/:id', updateJob);

// Route to delete a job by ID
router.delete('/delete/:id', deleteJob);

module.exports = router;

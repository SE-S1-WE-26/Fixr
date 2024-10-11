const express = require('express');
const {
  authenticateJWT,
  getAllJobs,
  getJobById,
  getJobsByClientId,
  getJobsByScheduledWorkerId,
  createJob,
  addInterestedHandyman,
  updateJob,
  deleteJob,
  getScheduledJobsByClientId,
  setJobOngoingStatus,
  setJobCompletedStatus,
  setJobCost
} = require('../../controllers/job/job.controller');

const router = express.Router();

// Route to get all jobs
router.get('/', getAllJobs);

// Route to get jobs by client ID
router.get('/client',authenticateJWT, getJobsByClientId);

// Route to get scheduled jobs by client ID
router.get('/client/scheduled',authenticateJWT, getScheduledJobsByClientId);

// Route to get jobs by sheduled worker ID
router.get('/worker/:id', getJobsByScheduledWorkerId);

// Route to get a single job by ID
router.get('/:id', getJobById);

// Route to create a new job
router.post('/create',createJob);

// Route to add a worker to the interestedHandymen list for a job
router.post('/interested/:jobId', authenticateJWT, addInterestedHandyman);

// Route to update a job by ID
router.put('/update/:id',authenticateJWT, updateJob);

// Route to delete a job by ID
router.delete('/delete/:id', deleteJob);

// Route to set job status
router.put('/status/start/:id', setJobOngoingStatus);

// Route to set job status
router.put('/status/end/:id', setJobCompletedStatus);

// Route to set job cost
router.put('/cost/:id', setJobCost);

module.exports = router;

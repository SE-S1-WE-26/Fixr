const Job = require('../../models/job/job.model');
const Client = require('../../models/client/client.model.js')
const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("Token received: ", token);
  if (token) {
    jwt.verify(token, '2fe3ce2f', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      console.log("Token authenticated");
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Get all jobs
// const getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find().populate('clientId');
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching jobs', error });
//   }
// };

const getAllJobs = async (req, res) => {
  try {
    const userId = req.user.userId;

    const client = await Client.findOne({ userId: userId });
    console.log();
    if (!client) {
      return res.status(404).json({ message: 'Client not found for this user' });
    }

    const clientId = client._id;

    const jobs = await Job.find({ clientId: clientId }).populate('clientId').populate({ path: 'scheduledWorkerId', match: { scheduled: true } });
    if (!jobs.length) return res.status(404).json({ message: 'No jobs found by this client' });
    console.log("Jobs: ", jobs);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

// Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('clientId')
      .populate({ path: 'scheduledWorkerId', match: { scheduled: true } });

    if (!job) {
      console.log("Job not found for ID:", req.params.id);  // Log when no job is found
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log("Job fetched successfully:", job);  // Log the job data
    res.status(200).json(job);  // 200 is more appropriate for success
  } catch (error) {
    console.error("Error fetching job:", error.message);  // Log the error details
    res.status(500).json({ message: 'Error fetching job', error });
  }
};


// Get jobs by client ID
const getJobsByClientId = async (req, res) => {
  try {
    const jobs = await Job.find({ clientId: req.params.clientId }).populate('clientId').populate({ path: 'scheduledWorkerId', match: { scheduled: true } });
    if (!jobs.length) return res.status(404).json({ message: 'No jobs found by this client' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs by client ID', error });
  }
};

// Get jobs by scheduled worker ID (only if scheduled is true)
const getJobsByScheduledWorkerId = async (req, res) => {
  try {
    const jobs = await Job.find({ scheduledWorkerId: req.params.scheduledWorkerId, scheduled: true })
      .populate('clientId')
      .populate('scheduledWorkerId');

    if (!jobs.length) return res.status(404).json({ message: 'No jobs found for this worker' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs by scheduled worker ID', error });
  }
};

//createJob
const createJob = async (req, res) => {
  const { title, description, category, environment, address, city, status, scheduled, budget } = req.body;

  try {
    const userId = req.user.userId;

    const client = await Client.findOne({ userId: userId });
    console.log();
    if (!client) {
      return res.status(404).json({ message: 'Client not found for this user' });
    }

    const clientId = client._id;

    const newJob = new Job({
      title,
      description,
      category,
      environment,
      clientId,  // Set clientId from the found client
      address,
      city,
      status,
      scheduled,
      budget,
    });

    // Save the new job
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
    console.log("Job saved");
  } catch (error) {
    console.log("Error in the backend: ", error);
    res.status(400).json({ message: 'Error creating job', error });
  }
};


// Update a job by ID
const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: 'Error updating job', error });
  }
};

// Delete a job by ID
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
};

module.exports = {
  authenticateJWT,
  getAllJobs,
  getJobById,
  getJobsByClientId,
  getJobsByScheduledWorkerId,
  createJob,
  updateJob,
  deleteJob
};

const Job = require('../../models/job/job.model');

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('clientId');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

// Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate({
        path: 'clientId', 
        populate: { 
          path: 'userId', 
          select: 'profilePic' // Only select the profilePic field
        }
      })
      .populate({ path: 'scheduledWorkerId', match: { scheduled: true } });

    if (!job) {
      console.log("Job not found for ID:", req.params.id);
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log("Job fetched successfully:", job);
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error.message);
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

// Create a new job
const createJob = async (req, res) => {
  const newJob = new Job(req.body);
  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
    console.log("Job saved");
  } catch (error) {
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
  getAllJobs,
  getJobById,
  getJobsByClientId,
  getJobsByScheduledWorkerId,
  createJob,
  updateJob,
  deleteJob
};

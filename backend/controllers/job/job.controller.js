const Job = require('../../models/job/job.model');
const Client = require('../../models/client/client.model.js')
const Worker = require('../../models/worker/worker.model.js')
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
      console.log("User from JWT:", user);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

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
      .populate({ path: 'scheduledWorkerId', match: { scheduled: true } })
      .populate({
        path: 'interestedHandymen',
        populate: {
          path: 'userId'
        }});

    if (!job) {
      console.log("Job not found for ID:", req.params.id);
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log("Job fetched successfully:", job);
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job by id:", error.message);
    res.status(500).json({ message: 'Error fetching job', error });
  }
};

// Get jobs by client token
const getJobsByClientId = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("User ID: ", userId);

    const client = await Client.findOne({ userId: userId });
    console.log();
    if (!client) {
      console.log("Client not found")
      return res.status(404).json({ message: 'Client not found for this user' });
    }

    const clientId = client._id;

    const jobs = await Job.find({ clientId: clientId }).populate('clientId').populate({ path: 'scheduledWorkerId', match: { scheduled: true } });
    if (!jobs.length) return res.status(404).json({ message: 'No jobs found by this client' });
    console.log("Jobs: ", jobs);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching job for client:", error.message);
    res.status(500).json({ message: 'Error fetching jobs for client', error });
  }
};

const getScheduledJobsByClientId = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("User ID: ", userId);

    const client = await Client.findOne({ userId: userId });
    console.log();
    if (!client) {
      console.log("Client not found")
      return res.status(404).json({ message: 'Client not found for this user' });
    }

    const clientId = client._id;

    const jobs = await Job.find({ clientId: clientId, scheduled:true })
    .populate('clientId')
    .populate({ path: 'scheduledWorkerId', populate: {
          path: 'userId', // Populate userId in Worker
          select: 'name profilePic', // Only get the name field from the User model
        }});
    if (!jobs.length) return res.status(404).json({ message: 'No jobs found by this client' });
    console.log("Jobs: ", jobs);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching job for client:", error.message);
    res.status(500).json({ message: 'Error fetching jobs for client', error });
  }
};

// Get jobs by scheduled worker ID (only if scheduled is true)
const getJobsByScheduledWorkerId = async (req, res) => {
  try {
    const jobs = await Job.find({ scheduledWorkerId: req.params.id, scheduled: true })
      .populate({
        path: 'clientId',
        populate: {
          path: 'userId', // Populate the userId from Client
          select: 'profilePic name phone' // Select specific fields
        }
      })
      .populate({
        path: 'scheduledWorkerId',
        populate: {
          path: 'userId', // Populate the userId from Worker
          select: 'profilePic name phone' // Select specific fields
        }
      });

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

// Add worker to interestedHandymen of a job
const addInterestedHandyman = async (req, res) => {
  try {
    // Get userId from token
    const userId = req.user.userId;

    // Find the worker who has the userId from the token
    const worker = await Worker.findOne({ userId: userId });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found for this user' });
    }
    console.log("worker found to add to interested handymen")
    // Find the job by its ID
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the worker is already interested in the job
    if (job.interestedHandymen.includes(worker._id)) {
      console.log("Worker is already interested in this job");
      return res.status(400).json({ message: 'Worker is already interested in this job' });
    }

    // Add worker's _id to the interestedHandymen array of the job
    job.interestedHandymen.push(worker._id);

    // Save the updated job
    await job.save();
    console.log('Worker added to interested Handymen successfully ', job);
    res.status(200).json({ message: 'Worker added to interestedHandymen successfully', job });
  } catch (error) {
    console.error("Error adding worker to interestedHandymen:", error.message);
    res.status(500).json({ message: 'Error adding worker to interestedHandymen', error });
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

const setJobOngoingStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findByIdAndUpdate(id, 
      { 
        status: 'ongoing', 
        startTime: new Date()
      }, 
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json({ message: 'Job status updated to ongoing', job });
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: 'Error updating job status', error });
  }
};


const setJobCompletedStatus = async (req, res) => {
  const { id } = req.params; // Assuming 'time' is not needed here
  try {
    const job = await Job.findByIdAndUpdate(id, 
      { 
        status: 'completed', 
        endTime: new Date() // Set current date and time
      }, 
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job status updated to completed', job });
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: 'Error updating job status', error });
  }
};

const setJobCost = async (req, res) => {
  const { id } = req.params; // Extract job ID from the request parameters
  const { cost } = req.body; // Extract cost from the request body

  try {
      // Find the job by ID and update its cost
      const updatedJob = await Job.findByIdAndUpdate(id, { jobCost: cost }, { new: true }); // `new: true` returns the updated document

      if (!updatedJob) {
          return res.status(404).json({ message: 'Job not found' });
      }

      res.status(200).json({ message: 'Job cost updated successfully', job: updatedJob });
  } catch (error) {
      console.error("Error updating job cost:", error.message);
      res.status(500).json({ message: 'Error updating job cost', error });
  }
};





module.exports = {
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
};

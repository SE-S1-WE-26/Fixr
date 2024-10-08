const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes

//User
//Auth Routes
const authRouter = require('./routes/user/authRoutes');

//Worker Side
const workerRouter = require('./routes/worker/worker.route');

//Client Side
const clientRouter = require('./routes/client/client.route');

//Jobs
const jobRouter = require('./routes/job/job.router');


//Use Routes
//User
app.use('/user', authRouter);

//Worker Side
app.use('/worker', workerRouter);

//Client Side
app.use('/client', clientRouter);

//Jobs
app.use('/job', jobRouter);


// Server
const PORT = process.env.PORT || 8010;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

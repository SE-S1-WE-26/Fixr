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
const userRouter = require('./routes/user/user.route');

//Worker Side
const workerRouter = require('./routes/worker/worker.route');
const eomRouter = require('./routes/worker/eom.route');

//Client Side
const clientRouter = require('./routes/client/client.route');

//Jobs
const jobRouter = require('./routes/job/job.router');

//Reviews

const reviewRouter = require('./routes/review/review.route');


//Use Routes
//User
app.use('/auth', authRouter);
app.use('/user', userRouter);

//Worker Side
app.use('/worker', workerRouter ,reviewRouter);
app.use('/eom', eomRouter);

//Client Side
app.use('/client', clientRouter);

//Jobs
app.use('/job', jobRouter);


// Server
const PORT = process.env.PORT || 8010;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

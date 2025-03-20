const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectToDatabase = require('./config/database');
const { authenticate } = require("./middleware/authMiddleware");
const { producer, connectProducer } = require('./kafka/kafkaConfig');

// Initializing the port number
const port = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(express.json());

//Connect to the database first, then connect to Kafka, then start the server
connectToDatabase(process.env.MONGODB_URL)
  .then(() => connectProducer()) // Connect to Kafka producer
  .then(() => {
    // Server Connection
    app.listen(port, () => {
      console.log(`Server is up and running on port number ${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to the database or Kafka. Server not started.");
});

// connectToDatabase(process.env.MONGODB_URL).then(() => {
//   app.listen(port, () => {
//     console.log(`Server is up and running on port number ${port}`);
//   });
// });

// auth routes
const authRouter = require('./routes/authRoutes');
app.use('/auth',authRouter);

// admin routes
const adminRouter = require('./routes/adminRoutes');
app.use('/admin', adminRouter);

// student routes
const studentRouter = require('./routes/studentRoutes');
app.use('/student', authenticate, studentRouter);

// role based authenticate
const authenticateRole = require('./routes/authenticateRole');
app.use('/authenticate-role', authenticateRole);

// issue routes
const issueRouter = require('./Routes/issueRoutes');
app.use('/issue', issueRouter);

//issue type routes
const issueTypeRouter = require('./Routes/issueTypeRoutes');
app.use('/issueType', issueTypeRouter);
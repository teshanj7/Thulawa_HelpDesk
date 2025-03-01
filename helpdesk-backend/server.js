const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToDatabase = require('./config/database');

// Initializing the port number
const port = process.env.PORT || 8070;

// Connect to the database first, then start the server
connectToDatabase(process.env.MONGODB_URL).then(() => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Server Connection
    app.listen(port, () => {
        console.log(`Server is up and running on port number ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database. Server not started.");
});

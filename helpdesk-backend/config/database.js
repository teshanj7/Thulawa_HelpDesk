// database connection according to the singleton design pattern
const mongoose = require('mongoose');

let dbConnection = null;

async function connectToDatabase(dbUrl) {
    if (!dbConnection) {
        try {
            dbConnection = await mongoose.connect(dbUrl, {});
            console.log("Connected to MongoDB");
        } catch (err) {
            console.error(`MongoDB connection error: ${err}`);
            process.exit(1); // Exit the process if connection fails
        }
    }
    return dbConnection;
}

module.exports = connectToDatabase;
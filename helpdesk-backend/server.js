const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true, // Ensures SSL/TLS connection
    tlsInsecure: true, // Bypass TLS validation (use only if necessary)
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Exit process if unable to connect
});

// Event Listener for Database Connection
const connection = mongoose.connection;
connection.on("error", (err) => console.error("❌ MongoDB Error:", err));
connection.once("open", () => console.log("🗄️ MongoDB Connection Established"));

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;

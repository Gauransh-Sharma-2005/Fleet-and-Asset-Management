const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const connectDB = require("./database/db");
const assetRoutes = require("./routes/assetRoutes");

const app = express();

// Enable CORS and JSON body parser (Step 7)
app.use(cors());
app.use(express.json());

// Connect to MongoDB Database
connectDB();

// File system log path
const logFilePath = path.join(__dirname, "fleet_logs.txt");

// 1. Direct File System Save Route
app.post("/save-log", (req, res) => {
    const { assetId, sensorType, status, reading } = req.body;
    const logEntry = `Asset ID : ${assetId}\nSensor   : ${sensorType}\nStatus   : ${status}\nReading  : ${reading}\n-----------------------------------\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) return res.status(500).send("Error writing to file.");
        res.send("Fleet Log Saved Successfully!");
    });
});

// 2. Direct File System Read Route
app.get("/get-logs", (req, res) => {
    fs.readFile(logFilePath, "utf8", (err, data) => {
        if (err) return res.send("No log records found yet.");
        res.send(data);
    });
});

// API Route Prefix mounting for MongoDB/Database routes
app.use("/api", assetRoutes);

app.get("/", (req, res) => {
  res.send("FleetStream Server Running...");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
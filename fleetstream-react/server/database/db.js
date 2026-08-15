const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.model; // placeholder if needed, or simply:
    await mongoose.connect("mongodb://127.0.0.1:27017/fleetstream_db");
    console.log("MongoDB Connected Successfully via Mongoose");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  assetId: { type: String, required: true, unique: true },
  sensorType: { type: String, required: true },
  status: { type: String, enum: ["Optimal", "Warning", "Critical"], default: "Optimal" },
  reading: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Asset", assetSchema);
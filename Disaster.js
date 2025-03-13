const mongoose = require("mongoose");

const disasterSchema = mongoose.Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  severity: { type: Number, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Disaster", disasterSchema);

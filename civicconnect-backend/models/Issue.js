const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // Reference to the user
  title: String,
  description: String,
  category: String,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  },
  response: String,  // Admin's reply
  email: String,     // Citizen's email (copied at time of complaint)
  phone: String,     // Citizen's phone number
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Issue", IssueSchema);

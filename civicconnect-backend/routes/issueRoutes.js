// routes/issueRoutes.js
const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");

// ✅ Citizen: Report an issue
router.post("/report", verifyToken, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newIssue = new Issue({
      user: userId,
      title,
      description,
      category,
      email: user.email,
      phone: req.body.phone || "", // optional
    });

    await newIssue.save();
    res.status(201).json({ message: "Issue reported successfully", issue: newIssue });
  } catch (error) {
    console.error("Error reporting issue:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Admin: Get all reported issues
router.get("/", verifyToken, async (req, res) => {
  try {
    // Ensure only admins can access
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }

    const issues = await Issue.find().populate("user", "name email");
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ msg: "Server error while fetching issues" });
  }
});

module.exports = router;

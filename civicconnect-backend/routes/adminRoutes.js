const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Issue = require("../models/Issue");
const sendMail = require("../utils/mailer");     // for email
const sendSMS = require("../utils/smsSender");   // for SMS
const verifyToken = require("../middleware/auth");

const router = express.Router();

//  Admin Login
router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

//  Admin Respond to Issue + Send Email + SMS
router.put("/respond/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    // Check if admin or superadmin
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const issue = await Issue.findById(id).populate("user", "name email");
    if (!issue) return res.status(404).json({ msg: "Issue not found" });

    issue.response = response;
    issue.status = "Resolved";
    await issue.save();

    //  Send email to citizen
    if (issue.user && issue.user.email) {
      await sendMail(
        issue.user.email,
        "Your Issue Has Been Responded",
        `Hi ${issue.user.name},\n\nYour issue titled "${issue.title}" has been responded to by the admin:\n\n"${response}"\n\nThank you for using CivicConnect.`
      );
    }

    //  Send SMS if phone number is available in the issue
    if (issue.phone) {
      const phoneWithCountryCode = issue.phone.startsWith("+") ? issue.phone : `+91${issue.phone.trim()}`;
      await sendSMS(
        phoneWithCountryCode,
        `Hi ${issue.user?.name || "Citizen"}, your issue "${issue.title}" has been responded to: ${response}`
      );
    }
    
    

    res.status(200).json({ msg: "Response saved and notifications sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error while responding to issue" });
  }
});

//  Fetch all issues (only for admin or superadmin)
router.get("/issues", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const issues = await Issue.find();
    res.json(issues);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

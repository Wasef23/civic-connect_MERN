// controllers/adminController.js
const Issue = require("../models/Issue");
const sendMail = require("../utils/mailer");

const respondToIssue = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.response = response;
    issue.status = "Resolved"; // Or "In Progress", depending on logic
    await issue.save();

    // Send Email
    if (issue.email) {
      await sendMail(
        issue.email,
        "Update on Your Reported Issue",
        `Hello,\n\nYour reported issue titled "${issue.title}" has been responded to by the authority:\n\n"${response}"\n\nThank you for using CivicConnect.`
      );
    }

    res.status(200).json({ message: "Response submitted and email sent." });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ message: "Failed to send response." });
  }
};

module.exports = { respondToIssue };

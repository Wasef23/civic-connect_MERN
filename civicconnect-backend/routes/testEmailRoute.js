// routes/testEmailRoute.js
const express = require("express");
const sendMail = require("../utils/mailer");

const router = express.Router();

router.get("/send-test-email", async (req, res) => {
  const testEmail = "test@example.com"; // Replace with the email you want to test with
  const subject = "Test Email";
  const text = "This is a test email to verify if emails are working.";

  try {
    await sendMail(testEmail, subject, text);
    res.status(200).json({ message: "Test email sent successfully!" });
  } catch (error) {
    console.error("Error sending test email:", error);
    res.status(500).json({ message: "Failed to send test email" });
  }
});

module.exports = router;

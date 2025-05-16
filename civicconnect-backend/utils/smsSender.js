// utils/smsSender.js
const twilio = require("twilio");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const client = new twilio(accountSid, authToken);

async function sendSMS(to, message) {
  try {
    if (!to || !to.startsWith("+")) {
      console.error("❌ Invalid phone number. Must be in E.164 format (e.g., +919xxxxxxxxx). Got:", to);
      return;
    }

    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to,
    });

    console.log("✅ SMS sent successfully. SID:", response.sid);
  } catch (error) {
    console.error("❌ Failed to send SMS:", error?.message || error);
  }
}

module.exports = sendSMS;

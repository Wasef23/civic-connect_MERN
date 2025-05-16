// civicconnect-backend/routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });


    // Directly passing string input
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = await response.text();

    res.json({ answer: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ answer: "AI failed to respond. Please try again." });
  }
});

module.exports = router;

const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
require("dotenv").config();

async function listAvailableModels() {
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const res = await axios.get(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: apiKey,
        },
      }
    );

    console.log("Available Models:");
    res.data.models.forEach((model) => {
      console.log(`- ${model.name}`);
    });
  } catch (err) {
    console.error("Error fetching model list:");
    console.error(err.response?.data || err.message);
  }
}

listAvailableModels();

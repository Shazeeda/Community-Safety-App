const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  const messages = [
    {
      role: "system",
      content: "You are a helpful community safety assistant that provides guidance, safety tips, and quick info about reporting suspicious activity. Be concise and clear.",
    },
    {
      role: "user",
      content: userMessage,
    },
  ];

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages,
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong with AI response." });
  }
});

module.exports = router;

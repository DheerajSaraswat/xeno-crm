const express = require("express");
const {
  parseSegmentPrompt,
  generateMessages,
} = require("../services/aiService");
const router = express.Router();

router.post("/parse-segment", async (req, res) => {
  try {
    const rules = await parseSegmentPrompt(req.body.prompt);
    res.json({ rules });
  } catch (err) {
    res.status(500).json({ error: "Failed to parse segment prompt" });
  }
});

router.post("/message-suggestions", async (req, res) => {
  try {
    const { objective, customerName } = req.body;
    const messages = await generateMessages(objective, customerName);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate messages" });
  }
});

module.exports = router;

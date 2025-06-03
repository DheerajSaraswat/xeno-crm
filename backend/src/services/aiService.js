const { VertexAI } = require("@google-cloud/vertexai");
const path = require("path");

const keyFile = path.join(__dirname, "../../gcp-key.json"); // Place your service account key here

const vertex_ai = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: "us-central1",
  keyFilename: keyFile,
});

const model = "gemini-1.0-pro-002"; // Or the latest available Gemini model

async function parseSegmentPrompt(prompt) {
  // Converts natural language to segment rules
  const request = {
    model,
    messages: [
      {
        role: "user",
        content: `Convert this natural language to a CRM audience rules JSON: ${prompt}`,
      },
    ],
  };

  try {
    const [response] = await vertex_ai.preview.generateMessage(request);
    const result = response.candidates[0].content;
    return JSON.parse(result);
  } catch (err) {
    console.error("Gemini parseSegmentPrompt error:", err);
    throw new Error("Failed to parse segment prompt");
  }
}

async function generateMessages(objective, customerName) {
  // Generates 2-3 message variants for a campaign
  const prompt = `
    Write 3 marketing message variants for the following campaign objective: "${objective}".
    Personalize for customer: "${customerName}". Return as a JSON array.
  `;

  const request = {
    model,
    messages: [{ role: "user", content: prompt }],
  };

  try {
    const [response] = await vertex_ai.preview.generateMessage(request);
    const result = response.candidates[0].content;
    return JSON.parse(result);
  } catch (err) {
    console.error("Gemini generateMessages error:", err);
    throw new Error("Failed to generate messages");
  }
}

module.exports = { parseSegmentPrompt, generateMessages };

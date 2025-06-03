import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import RuleBuilder from "../components/RuleBuilder";
import { aiParseSegment, createSegment } from "../api";
import useToken from "../hooks/useToken";

export default function CreateSegment() {
  const [token] = useToken();
  const [rules, setRules] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [previewAudience, setPreviewAudience] = useState(null);
  const [segmentId, setSegmentId] = useState(null);
  const [error, setError] = useState("");

  async function handleAIPrompt() {
    setAiLoading(true);
    setError("");
    try {
      const res = await aiParseSegment(prompt, token);
      setRules(res.data.rules);
    } catch {
      setError("AI parsing failed.");
    }
    setAiLoading(false);
  }

  async function handleCreateSegment() {
    setError("");
    try {
      const res = await createSegment(rules, token);
      setPreviewAudience(res.data.audienceSize);
      setSegmentId(res.data.segmentId);
    } catch {
      setError("Segment creation failed.");
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Audience Segment
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Describe audience in natural language"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAIPrompt}
          disabled={aiLoading}
        >
          {aiLoading ? "Parsing..." : "AI Build"}
        </Button>
        <RuleBuilder onRulesChange={setRules} />
        <Button variant="contained" onClick={handleCreateSegment}>
          Preview Audience
        </Button>
        {previewAudience !== null && (
          <Box>
            <Typography>Audience Size: {previewAudience}</Typography>
            <Button href={`/campaigns/create?segmentId=${segmentId}`}>
              Create Campaign
            </Button>
          </Box>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
}

import React, { useState } from "react";
import { aiParseSegment } from "../api";
import useToken from "../hooks/useToken";

export default function AiSegment() {
  const [token] = useToken();
  const [prompt, setPrompt] = useState("");
  const [rules, setRules] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleAIParse = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await aiParseSegment(prompt, token);
      setRules(res.data.rules);
    } catch {
      setErr("Failed to parse segment.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h3>AI Segment Parser Demo</h3>
      <input
        style={{ width: 400 }}
        value={prompt}
        placeholder="e.g. People who haven’t shopped in 6 months and spent over ₹5K"
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleAIParse} disabled={loading || !prompt}>
        Parse
      </button>
      {loading && <div>Parsing...</div>}
      {err && <div style={{ color: "red" }}>{err}</div>}
      {rules && (
        <div>
          <b>Parsed Rules:</b>
          <pre>{JSON.stringify(rules, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

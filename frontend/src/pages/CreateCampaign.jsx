import React, { useState, useEffect } from "react";
import { aiMessageSuggestions, createCampaign } from "../api";
import GoogleLoginButton from "../components/GoogleLoginButton";
import useToken from "../hooks/useToken";

export default function CreateCampaign() {
  const [token] = useToken();
  const urlParams = new URLSearchParams(window.location.search);
  const segmentId = urlParams.get("segmentId");
  const [objective, setObjective] = useState("");
  const [customerName, setCustomerName] = useState("User");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function handleAIMessages() {
    setError("");
    try {
      const res = await aiMessageSuggestions(objective, customerName, token);
      setSuggestions(res.data.messages);
    } catch (e) {
      setError("Failed to get AI message suggestions.");
    }
  }

  async function handleCreateCampaign() {
    setError("");
    try {
      await createCampaign(segmentId, selectedMessage, token);
      setStatus("Campaign created!");
    } catch (e) {
      setError("Failed to create campaign.");
    }
  }

  if (!token) return <GoogleLoginButton />;

  return (
    <div>
      <h2>Create Campaign</h2>
      <div>
        <input
          placeholder="Campaign Objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          style={{ width: 300 }}
        />
        <input
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={{ width: 150, marginLeft: 10 }}
        />
        <button onClick={handleAIMessages}>AI Suggest Messages</button>
      </div>
      <div>
        {suggestions.map((msg, i) => (
          <div key={i}>
            <input
              type="radio"
              name="message"
              value={msg}
              onChange={() => setSelectedMessage(msg)}
            />
            {msg}
          </div>
        ))}
      </div>
      <button onClick={handleCreateCampaign} disabled={!selectedMessage}>
        Launch Campaign
      </button>
      {status && <div>{status}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

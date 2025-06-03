import React, { useState } from "react";
import { aiMessageSuggestions } from "../api";
import useToken from "../hooks/useToken";

export default function AIMessageSuggestion() {
  const [token] = useToken();
  const [objective, setObjective] = useState("");
  const [customerName, setCustomerName] = useState("Mohit");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleAIMessages = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await aiMessageSuggestions(objective, customerName, token);
      setMessages(res.data.messages);
    } catch {
      setErr("Failed to get message suggestions.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h3>AI Campaign Message Suggestions Demo</h3>
      <input
        style={{ width: 300 }}
        value={objective}
        placeholder="e.g. Bring back inactive users"
        onChange={(e) => setObjective(e.target.value)}
      />
      <input
        style={{ width: 150, marginLeft: 10 }}
        value={customerName}
        placeholder="Customer Name"
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <button onClick={handleAIMessages} disabled={loading || !objective}>
        Suggest
      </button>
      {loading && <div>Generating...</div>}
      {err && <div style={{ color: "red" }}>{err}</div>}
      {messages.length > 0 && (
        <ol>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

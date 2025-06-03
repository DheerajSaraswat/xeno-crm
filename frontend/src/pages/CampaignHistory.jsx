import React, { useEffect, useState } from "react";
import { getCampaignHistory } from "../api";
import GoogleLoginButton from "../components/GoogleLoginButton";
import useToken from "../hooks/useToken";

export default function CampaignHistory() {
  const [token] = useToken();
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    getCampaignHistory(token)
      .then((res) => setCampaigns(res.data.campaigns))
      .catch(() => setError("Failed to load campaign history."));
  }, [token]);

  if (!token) return <GoogleLoginButton />;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Campaign History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Objective</th>
            <th>Audience</th>
            <th>Sent</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id}>
              <td>{new Date(c.createdAt).toLocaleString()}</td>
              <td>{c.objective}</td>
              <td>{c.audienceSize}</td>
              <td>{c.sent}</td>
              <td>{c.failed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

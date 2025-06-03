import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateSegment from "./pages/CreateSegment";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignHistory from "./pages/CampaignHistory";
import LogoutButton from "./components/LogoutButton";

function App() {
  return (
    <>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          background: "#eee",
        }}
      >
        <Link to="/">Segments</Link>
        <Link to="/campaigns">Campaigns</Link>
        <LogoutButton />
      </nav>
      <Routes>
        <Route path="/" element={<CreateSegment />} />
        <Route path="/campaigns/create" element={<CreateCampaign />} />
        <Route path="/campaigns" element={<CampaignHistory />} />
      </Routes>
    </>
  );
}

export default App;

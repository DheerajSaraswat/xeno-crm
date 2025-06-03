import api from "./axiosInstance";

export const aiParseSegment = (prompt, token) =>
  api.post(
    "/api/ai/parse-segment",
    { prompt },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const aiMessageSuggestions = (objective, customerName, token) =>
  api.post(
    "/api/ai/message-suggestions",
    { objective, customerName },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

// ...other API calls

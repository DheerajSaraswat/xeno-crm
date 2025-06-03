# Mini CRM Frontend

## Quick Start

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```

2. Set backend API URL in `.env` if not default.
3. Start frontend:
   ```
   npm start
   ```
4. Visit [http://localhost:3000](http://localhost:3000)

## Features

- Google OAuth login
- AI-powered segment rule builder (via Gemini)
- AI campaign message suggestions
- Campaign creation and history

## Configuration

- Backend URL: set `REACT_APP_BACKEND_URL` in `.env`
- Ensure backend is running and accessible for API & AI calls

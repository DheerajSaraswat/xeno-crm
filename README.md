# Xeno CRM

A modern mini-CRM stack with AI, Kafka, React, Node.js, PostgreSQL.

## Structure

- `backend/` — Express API, Kafka, Postgres, AI integration
- `frontend/` — React (MUI), Google OAuth, AI UI, campaign flows
- `docker-compose.yml` — Full local orchestration

## Quick Start (Development)

```bash
# Start all services
docker-compose up --build
```

- Backend: http://localhost:4000
- Frontend: http://localhost:3000
- Postgres: localhost:5432 (user: crmuser, db: crm)
- Kafka: localhost:9092

## Features

- Google OAuth (frontend/backend)
- Customer, Order, Segment, Campaign, CommunicationLog models
- AI: Segment parsing & campaign message suggestions (Gemini/Vertex AI)
- Campaign delivery simulation, Kafka async ingestion
- Responsive UI (Material UI), session/logout handling
- Security: CORS, rate limiting, error handling, logging

## See backend/README.md and frontend/README.md for more.
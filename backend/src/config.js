// Database configuration for Postgres using pg
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "crmuser",
  host: process.env.DB_HOST || "db",
  database: process.env.DB_NAME || "crm",
  password: process.env.DB_PASSWORD || "crmpass",
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;

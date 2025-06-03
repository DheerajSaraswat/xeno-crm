const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("combined"));
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
app.use((req, res, next) => {
  req.logger = logger;
  next();
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", apiLimiter);

app.use(express.json());
app.get("/health", (req, res) => res.status(200).send("OK"));

// Error handler
app.use((err, req, res, next) => {
  req.logger?.error(err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

module.exports = app;

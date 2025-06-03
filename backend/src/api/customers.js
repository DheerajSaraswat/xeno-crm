const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { publishMessage } = require("../kafka/producer");

const customerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  // Add more fields as needed
});

// POST /api/customers
router.post("/", async (req, res) => {
  // Validate
  const { error, value } = customerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Publish to Kafka
  await publishMessage("customer-ingest", value);

  return res
    .status(202)
    .json({ message: "Customer data queued for processing." });
});

module.exports = router;
    
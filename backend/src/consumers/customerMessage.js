const { connectConsumer } = require("../kafka/consumer");
const Customer = require("../models/Customer.js"); // Sequelize/Mongoose model

const handleCustomerMessage = async (data) => {
  try {
    // Save to DB (assume Sequelize here)
    await Customer.create(data);
    console.log("Customer persisted:", data.email);
  } catch (err) {
    console.error("Failed to persist customer:", err);
  }
};

const startCustomerConsumer = () => {
  connectConsumer("customer-ingest", handleCustomerMessage);
};

module.exports = { startCustomerConsumer };

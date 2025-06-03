const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "mini-crm-api",
  brokers: ["kafka:9092"], // Use your Docker/host config
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const publishMessage = async (topic, message) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

module.exports = { connectProducer, publishMessage };

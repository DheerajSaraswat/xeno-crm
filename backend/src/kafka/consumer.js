const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "mini-crm-consumer",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "mini-crm-group" });

const connectConsumer = async (topic, handleMessage) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      await handleMessage(data);
    },
  });
};

module.exports = { connectConsumer };

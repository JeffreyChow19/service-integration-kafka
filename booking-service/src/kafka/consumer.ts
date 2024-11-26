import { Consumer, KafkaClient, Message } from "kafka-node";

const kafkaHost = "localhost:9093";

// TODO: setup topicTwo
const topicOne = "hasan-sadikin-hospital.public.availabilities";
// const topicTwo = "borromeus-hospital.public.availabilities";

// TODO: setup topicTwo
const topics = [topicOne];

const client = new KafkaClient({ kafkaHost });
const consumer = new Consumer(
  client,
  topics.map((topic) => ({ topic, partition: 0 })),
  {
    autoCommit: true,
    groupId: "booking-service-group",
  }
);

type MessageHandler = (topic: string, message: Message) => void;
let messageHandler: MessageHandler = (topic, message) => {
  console.log(
    `Received message from topic ${topic}, but no handler set: ${message.value}`
  );
};

consumer.on("message", (message) => {
  messageHandler(message.topic, message);
});

consumer.on("error", (err) => {
  console.error("Kafka error:", err);
});

export const setMessageHandler = (handler: MessageHandler) => {
  messageHandler = handler;
};

export default consumer;

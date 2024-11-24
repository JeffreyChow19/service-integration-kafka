import { Consumer, KafkaClient, Message } from "kafka-node";

const kafkaHost = "localhost:9092";

// TODO: update these topic name
const topicOne = "test-topic-one";
const topicTwo = "test-topic-two";

const topics = [topicOne, topicTwo];

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
  console.log(`Received message: ${message.value}`);
  messageHandler(message.topic, message);
});

consumer.on("error", (err) => {
  console.error("Kafka error:", err);
});

export const setMessageHandler = (handler: MessageHandler) => {
  messageHandler = handler;
};

export default consumer;

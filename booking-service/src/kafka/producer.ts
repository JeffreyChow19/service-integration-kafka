import { Kafka } from "kafkajs";

// Kafka configuration
const kafka = new Kafka({
  clientId: "hospital-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const sendMessage = async () => {
  await producer.connect();

  const messageArray = [
    {
      doctor: {
        name: "Dr. John Doe",
        specialization: "Cardiologist",
      },
      time: "2024-11-24T14:00:00Z",
    },
    {
      doctor: {
        name: "Dr. Jane Smith",
        specialization: "Neurologist",
      },
      time: "2024-11-24T16:00:00Z",
    },
  ];

  await producer.send({
    topic: "test-topic-one",
    messages: [
      { key: "Boromeus", value: JSON.stringify(messageArray) },
    ],
  });

  console.log("Message sent to Kafka!");
  await producer.disconnect();
};

export default sendMessage;

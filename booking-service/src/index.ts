import express, { Request, Response } from "express";
import { setMessageHandler } from "./kafka/consumer";
import { Availability } from "./types/consumer";

const app = express();
const PORT = 3002;

app.use(express.json());

// Store consumed messages in memory
const messages: { [key: string]: Availability[] } = {};

// Set up a Kafka message handler
// TODO: update this to match with publisher JSON struct
setMessageHandler((topic, message) => {
  console.log(`Message consumed from ${topic}: ${message.value}`);

  if (message.value) {
    const parsedArray = JSON.parse(message.value.toString());

    parsedArray.forEach((availability: Availability) => {
      const specialization = availability.doctor.specialization;
      if (!messages[specialization]) {
        messages[specialization] = [];
      }
      messages[specialization].push(availability);
    });
  }
});

app.get("/messages", (req: Request, res: Response) => {
  const { doctor_type } = req.query;
  res.json({ messages: messages[doctor_type as string] || [] });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Kafka Listener Service is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Kafka listener initialized...");
});

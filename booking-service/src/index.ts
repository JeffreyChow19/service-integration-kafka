import express, { Request, Response } from "express";
import { setMessageHandler } from "./kafka/consumer";
import { Availability } from "./types/availability";

const app = express();
const PORT = 3002;

app.use(express.json());

// Store consumed messages in memory
const availabilityData: {
  [specialization: string]: Map<string, Availability>;
} = {};

// Set up a Kafka message handler
setMessageHandler((topic, message) => {
  console.log(`Message consumed from ${topic}`);

  if (message.value) {
    const resp = JSON.parse(message.value.toString());

    console.log(resp.payload);

    const deleteFlag = resp.payload.before && !resp.payload.after;
    if (deleteFlag) {
      // delete record
      const affectedRecord = resp.payload.before;
      const deleteId = resp.payload.source.name + affectedRecord.id;
      for (const specialization in availabilityData) {
        if (availabilityData[specialization].delete(deleteId)) break;
      }
    } else {
      // upsert
      const record = resp.payload.after;
      const key = record.specialization as string;
      record.source_name = resp.payload.source.name;
      if (!availabilityData[key]) {
        availabilityData[key] = new Map();
      }
      availabilityData[key].set(resp.payload.source.name + record.id, record);
    }
  }
});

app.get("/availability", (req: Request, res: Response) => {
  const { specialization } = req.query;
  res.json({
    availability: availabilityData[specialization as string]
      ? Array.from(availabilityData[specialization as string].values())
      : [],
  });
});

app.get("/availability/specialization", (req: Request, res: Response) => {
  res.json({
    specialization: Object.keys(availabilityData),
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Kafka Listener Service is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Kafka listener initialized...");
});

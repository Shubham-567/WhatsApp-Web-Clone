import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Message from "../models/Message.js";
import connectDB from "../config/db.js";

dotenv.config();

const payloadsDir = path.join(process.cwd(), "whatsapp_sample_payloads");

const processPayloadFile = async (filePath) => {
  const raw = fs.readFileSync(filePath);
  const data = JSON.parse(raw);

  const entry = data.metaData?.entry?.[0];
  const change = entry?.changes?.[0];
  const value = change?.value;

  // handle incoming messages
  if (value?.message && value?.contacts) {
    const contact = value?.contacts?.[0];
    const message = value?.messages?.[0];

    if (contact && message) {
      const msgData = {
        wa_id: contact.wa_id,
        name: contact.profile.name,
        message: message.text.body || "",
        direction: "incoming",
        timestamp: new Date(parseInt(message.timestamp) * 1000),
        meta_msg_id: message.id,
        status: null,
      };

      //   console.log(msgData);

      await Message.updateOne(
        { meta_msg_id: message.id },
        { $setOnInsert: msgData },
        { upsert: true }
      );
    }
  }

  // handle status updates
  if (value?.statuses) {
    const status = value.statuses[0];

    if (status) {
      const updatedStatus = {
        status: status.status,
        timestamp: new Date(parseInt(status.timestamp) * 1000),
      };

      console.log(
        `Updating status for msg ID ${status.meta_msg_id}: `,
        updatedStatus.status
      );

      await Message.updateOne(
        { meta_msg_id: status.meta_msg_id },
        { $set: updatedStatus }
      );
    }
  }
};

const run = async () => {
  await connectDB();

  const files = fs
    .readdirSync(payloadsDir)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(payloadsDir, file);

    try {
      await processPayloadFile(filePath);
    } catch (error) {
      console.error("Error processing", file, error.message);
    }
  }
};

run();

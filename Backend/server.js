import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// db connect

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Whatsapp clone backend server is running...");
});

// routes

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});

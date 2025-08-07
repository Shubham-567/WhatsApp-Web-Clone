import express from "express";
import {
  getAllConversations,
  getMessageByWaId,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversations", getAllConversations);
router.get("/message/:wa_id", getMessageByWaId);
router.post("/message/:wa_id/send", sendMessage);

export default router;

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  wa_id: String,
  name: String,
  message: String,
  direction: {
    type: String,
    enum: ["incoming", "outgoing"],
    default: "incoming",
  },
  timestamp: Date,
  status: {
    type: String,
    enum: ["sent", "delivered", "read", null],
    default: null,
  },
  meta_msg_id: String,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

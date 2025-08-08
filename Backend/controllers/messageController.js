import Message from "../models/Message.js";

// get all conversations
export const getAllConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $sort: { timestamp: 1 },
      },
      {
        $group: {
          _id: "$wa_id",
          contact: { $first: "$name" },
          allMessages: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          contact: 1,
          lastMessage: { $last: "$allMessages.message" },
          lastTimestamp: { $last: "$allMessages.timestamp" },
          lastSender: { $last: "$allMessages.name" },
        },
      },
      {
        $sort: { lastTimestamp: -1 },
      },
    ]);

    if (conversations.length === 0) {
      return res.status(200).json({ message: "No conversation found" });
    }

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch conversations: ",
      error: error.message,
    });
  }
};

// get message by wa_id
export const getMessageByWaId = async (req, res) => {
  const { wa_id } = req.params;

  //   console.log(wa_id);

  try {
    const message = await Message.find({ wa_id }).sort({ timestamp: 1 });

    if (message.length === 0) {
      return res
        .status(200)
        .json({ message: `No message was found for this wa_id: ${wa_id}` });
    }

    res.status(200).json(message);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch messages", error: error.message });
  }
};

// send message to any wa_id (user)
export const sendMessage = async (req, res) => {
  const { wa_id } = req.params;
  const { text, name } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Message text is required" });
  }

  try {
    const message = new Message({
      wa_id,
      name: name || "You",
      message: text,
      direction: "outgoing",
      timestamp: new Date(),
      status: "sent",
      meta_msg_id: `local_${Date.now()}`,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

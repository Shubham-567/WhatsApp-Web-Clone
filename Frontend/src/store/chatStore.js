import { create } from "zustand";
import API from "../services/api.js";

const useChatStore = create((set) => ({
  chats: [],
  messages: [],
  activeChat: null,
  loading: false,

  fetchChats: async () => {
    set({ loading: true });

    try {
      const res = await API.get("/conversations");
      set({ chats: res.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch chats ", error.message);
      set({ loading: false });
    }
  },

  fetchMessages: async (wa_id) => {
    set({ loading: true });

    try {
      set({ activeChat: wa_id });
      const res = await API.get(`/message/${wa_id}`);
      set({ messages: res.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch messages ", error.message);
      set({ loading: false });
    }
  },

  sendMessage: async (wa_id, text) => {
    if (!text.trim()) {
      return;
    }

    try {
      const res = await API.post(`/messages/${wa_id}/send`, {
        text,
        name: "You",
      });

      // assuming success and update ui instantly
      set((state) => ({
        messages: [...state.message, res.data],
      }));
    } catch (error) {
      console.error("Failed to send message", error.message);
    }
  },
}));

export default useChatStore;

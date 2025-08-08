import { create } from "zustand";
import API from "../services/api.js";

const useChatStore = create((set) => ({
  chats: [],
  messages: [],
  activeChat: null,
  chatsLoading: false,
  messageLoading: false,
  isSidebarOpen: true,

  setActiveChat: (id) => {
    set({
      activeChat: id,
      isSidebarOpen: false,
    });
  },

  toggleSidebar: (value) => {
    set({ isSidebarOpen: value });
  },

  fetchChats: async () => {
    set({ chatsLoading: true });

    try {
      const res = await API.get("/conversations");
      set({ chats: res.data, chatsLoading: false });
    } catch (error) {
      console.error("Failed to fetch chats ", error.message);
      set({ chatsLoading: false });
    }
  },

  fetchMessages: async (wa_id) => {
    set({ messageLoading: true });

    try {
      set({ activeChat: wa_id });
      const res = await API.get(`/message/${wa_id}`);
      set({ messages: res.data, messageLoading: false });
    } catch (error) {
      console.error("Failed to fetch messages ", error.message);
      set({ messageLoading: false });
    }
  },

  sendMessage: async (wa_id, text) => {
    if (!text.trim()) {
      return;
    }

    try {
      const res = await API.post(`/message/${wa_id}/send`, {
        text,
        name: "You",
      });

      // assuming success and update ui instantly
      set((state) => ({
        messages: [...state.messages, res.data],
      }));

      // Refetch sidebar chats so it has latest message
      await useChatStore.getState().fetchChats();
    } catch (error) {
      console.error("Failed to send message", error.message);
    }
  },
}));

export default useChatStore;

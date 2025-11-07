import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    
    const { selectedUser, messages } = get();
    console.log(`store from useChatStore`, messageData, `and selectedUser`, selectedUser._id);
    if (!selectedUser) {
      toast.error("No user selected for chat.");
      return;
    }
  
    try {
      console.log(`IN sendMEssage store in try`, messageData);
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message.");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser } = get();

    if (!socket || !selectedUser) return;

    const handleNewMessage = (newMessage) => {
      const currentSelectedUser = get().selectedUser;
      if (!currentSelectedUser) return;

      const isFromSelectedUser =
        newMessage.senderId === currentSelectedUser._id ||
        newMessage.receiverId === currentSelectedUser._id;

      if (!isFromSelectedUser) return;

      const existingMessages = get().messages;
      const alreadyExists = existingMessages.some(
        (message) => message._id === newMessage._id
      );
      if (alreadyExists) return;

      set({ messages: [...existingMessages, newMessage] });
    };

    const handleReconnect = () => {
      const currentSelectedUser = get().selectedUser;
      if (currentSelectedUser?._id) {
        get().getMessages(currentSelectedUser._id);
      }
    };

    socket.off("newMessage", handleNewMessage);
    socket.off("connect", handleReconnect);

    socket.on("newMessage", handleNewMessage);
    socket.on("connect", handleReconnect);
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("connect");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

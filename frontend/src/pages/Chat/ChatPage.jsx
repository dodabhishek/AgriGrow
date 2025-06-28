import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import Sidebar from "./Sidebar";
import NoChatSelected from "./NoChatSelected.jsx";
import ChatContainer from "./ChatContainer";

const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-[4rem]">
      <div className="flex items-center justify-center px-4 mt-8">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-6xl h-[calc(100vh-4rem-2rem)] border border-white/50">
          <div className="flex h-full rounded-3xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
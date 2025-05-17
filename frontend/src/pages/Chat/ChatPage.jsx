import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import Sidebar from "./Sidebar";
import NoChatSelected from "./NoChatSelected.jsx";
import ChatContainer from "./ChatContainer";

const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 pt-[4rem]"> {/* Added padding-top to avoid Navbar overlap */}
      <div className="flex items-center justify-center px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-4rem)]"> {/* Adjusted height */}
          <div className=" flex h-full rounded-lg overflow-hidden p-20">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
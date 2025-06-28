import React from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex items-center gap-4 px-8 py-4 bg-white/40 backdrop-blur-xl border-b border-white/50 rounded-t-3xl shadow-sm">
      <div className="relative">
        <img
          src={selectedUser.profilePic || "/avatar.png"}
          alt={selectedUser.fullName}
          className="w-12 h-12 rounded-full border-2 border-green-200 shadow-md"
        />
        {isOnline && (
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
        )}
      </div>
      <div>
        <div className="font-bold text-lg text-green-800">{selectedUser.fullName}</div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span className={isOnline ? "text-green-600" : "text-gray-400"}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="flex-1" />
      {/* Optionally, add action buttons here */}
    </div>
  );
};

export default ChatHeader;
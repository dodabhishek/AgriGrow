import React, { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../../store/useAuthStore";
// import formatMessageTime from "";
import { axiosInstance } from "../../lib/axios";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-white/60 via-green-50/60 to-emerald-50/60">
      <ChatHeader />
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-8 space-y-6"
        style={{ minHeight: 0 }}
      >
        {messages.map((message, index) => {
          const isSender = message.senderId === authUser._id;
          const profilePic = isSender
            ? authUser.profilePic || "/avatar.png"
            : selectedUser.profilePic || "/avatar.png";
          const displayName = isSender ? authUser.fullName || "You" : selectedUser.fullName || "User";

          return (
            <div
              key={message._id || index}
              className={`flex items-end gap-3 group animate-fadeInUp ${
                isSender ? "justify-end" : "justify-start"
              }`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              {/* Avatar for received messages */}
              {!isSender && (
                <img
                  src={profilePic}
                  className="w-10 h-10 rounded-full border-2 border-green-200 shadow-md"
                  alt="profile"
                />
              )}

              <div className="max-w-[70%] flex flex-col items-start">
                <div
                  className={`text-xs font-semibold mb-1 ${
                    isSender ? "text-right text-green-700" : "text-left text-emerald-700"
                  }`}
                >
                  {displayName}
                </div>
                <div
                  className={`p-4 rounded-2xl shadow-md transition-all duration-300 ${
                    isSender
                      ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-br-none"
                      : "bg-white/60 backdrop-blur-md text-gray-900 rounded-bl-none border border-white/50"
                  } animate-fadeInUp`}
                  style={{ wordBreak: "break-word" }}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                  <div className="text-xs text-right mt-1 opacity-60">
                    {/* {formatMessageTime(message.createdAt)} */}
                  </div>
                </div>
              </div>

              {/* Avatar for sent messages */}
              {isSender && (
                <img
                  src={profilePic}
                  className="w-10 h-10 rounded-full border-2 border-green-200 shadow-md"
                  alt="profile"
                />
              )}
            </div>
          );
        })}
      </div>
      <MessageInput />
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;

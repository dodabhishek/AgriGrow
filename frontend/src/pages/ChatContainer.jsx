import { useChatStore } from "../store/useChatStore.js";
import { useEffect, useRef } from "react";
import React from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Chat/skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

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

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isSender = message.senderId === authUser._id;
          const profilePic = isSender
            ? authUser.profilePic || "/avatar.png"
            : selectedUser.profilePic || "/avatar.png";
          const displayName = isSender ? authUser.fullName || "You" : selectedUser.fullName || "User";

          return (
            <div
              key={message._id || index}
              className={`flex items-start gap-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              {!isSender && (
                <img
                  src={profilePic}
                  className="w-10 h-10 rounded-full border"
                  alt="profile"
                />
              )}

              <div className="max-w-[70%]">
                <div
                  className={`text-sm font-semibold mb-1 ${
                    isSender ? "text-right" : "text-left"
                  }`}
                >
                  {displayName}
                </div>

                <div
                  className={`p-3 rounded-xl ${
                    isSender
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white rounded-bl-none"
                  }`}
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
                    {formatMessageTime(message.createdAt)}
                  </div>
                </div>
              </div>

              {isSender && (
                <img
                  src={profilePic}
                  className="w-10 h-10 rounded-full border"
                  alt="profile"
                />
              )}
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

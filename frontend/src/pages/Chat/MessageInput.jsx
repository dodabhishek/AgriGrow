import React, { useState, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, selectedUser } = useChatStore();
  const inputRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
    inputRef.current?.focus();
  };

  if (!selectedUser) return null;

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-4 px-6 py-4 bg-white/40 backdrop-blur-xl border-t border-white/50 rounded-b-3xl shadow-sm"
    >
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 rounded-xl border-2 border-white/50 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-500 transition-all"
      />
      <button
        type="submit"
        className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all flex items-center justify-center"
      >
        <FaPaperPlane className="w-5 h-5" />
      </button>
    </form>
  );
};

export default MessageInput;

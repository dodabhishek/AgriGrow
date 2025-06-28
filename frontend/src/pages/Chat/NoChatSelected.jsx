import { MessageSquare } from "lucide-react";
import React from "react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-md text-center space-y-8 bg-white/30 backdrop-blur-xl rounded-2xl shadow-xl p-10 border border-white/50">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center animate-bounce shadow-lg">
              <MessageSquare className="w-10 h-10 text-green-600" />
            </div>
          </div>
        </div>
        {/* Welcome Text */}
        <h2 className="text-3xl font-extrabold text-green-700">Welcome to AgriGrow Chat!</h2>
        <p className="text-lg text-gray-700">
          Select a conversation from the sidebar to start chatting with our agricultural experts and community. Connect, learn, and grow together!
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

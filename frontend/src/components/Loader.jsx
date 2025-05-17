import { Loader2 } from "lucide-react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <div className="absolute -inset-1 rounded-full bg-blue-100 opacity-20 blur-md animate-pulse"></div>
        </div>
        <p className="text-lg font-medium text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Loader; 
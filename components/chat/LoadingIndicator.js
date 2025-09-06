import { FaRobot } from "react-icons/fa";

export default function LoadingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
        <FaRobot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white/10 text-white p-3 rounded-lg rounded-tl-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

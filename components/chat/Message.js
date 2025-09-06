import { useState, useEffect } from "react";
import { FaRobot, FaUser, FaClock } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Message({ message, isCurrentUser = false }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={`flex items-start gap-3 ${
        isCurrentUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isCurrentUser ? "bg-blue-500" : "bg-indigo-500"
        }`}
      >
        {isCurrentUser ? (
          <FaUser className="w-4 h-4 text-white" />
        ) : (
          <FaRobot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-xs lg:max-md ${isCurrentUser ? "text-right" : ""}`}
      >
        <div
          className={`p-3 rounded-lg ${
            isCurrentUser
              ? "bg-blue-500 text-white rounded-tr-sm"
              : "bg-white/10 text-white rounded-tl-sm"
          }`}
        >
          {/* Markdown-friendly content */}
          <div className="prose prose-sm prose-invert !text-white max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-xs text-gray-300 mb-2">Sources:</p>
              <div className="space-y-1">
                {message.sources.map((source, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-2 text-xs bg-white/10 hover:bg-white/20 rounded px-2 py-1 transition-colors"
                    onClick={() => console.log(`Jump to ${source.timestamp}`)}
                  >
                    <FaClock className="w-3 h-3" />
                    <span>{source.timestamp}</span>
                    <span className="truncate">{source.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Client-only timestamp */}
        {isClient && (
          <span className="text-xs text-gray-400 mt-1 block">
            {message.timestamp}
          </span>
        )}
      </div>
    </div>
  );
}

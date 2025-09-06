"use client";
import { useState, useEffect } from "react";
import { Bot, User, Send, Play, Clock, BookOpen } from "lucide-react";

export default function VTTConversationDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "user",
      content: "What does the instructor say about error handling in Node.js?",
      timestamp: "2:34 PM",
    },
    {
      id: 2,
      type: "ai",
      content:
        "The instructor explains that proper error handling is crucial for production Node.js apps. He recommends using try-catch blocks for async operations and implementing global error handlers for unhandled exceptions.\n\n**Sources:**\n- [12:45] Basic error handling patterns\n- [28:30] Global error handler setup\n- [45:12] Production error strategies",
      timestamp: "2:34 PM",
    },
    {
      id: 3,
      type: "user",
      content: "How do I set up MongoDB connection pooling?",
      timestamp: "2:35 PM",
    },
    {
      id: 4,
      type: "ai",
      content:
        "The tutorial shows three key steps for MongoDB connection pooling: configure maxPoolSize in your connection string, set up proper connection timeouts, and implement connection monitoring for production environments.\n\n**Sources:**\n- [18:22] Connection pooling configuration\n- [19:45] Timeout settings explanation\n- [34:18] Production monitoring setup",
      timestamp: "2:35 PM",
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto-play demo effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [...prev]);
        setIsTyping(false);
      }, 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative py-20 px-4">
      {/* Same background gradient as Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            See VTT RAG in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Watch how our VTT RAG system understands video content, provides
            precise answers with timestamp citations, and makes learning from
            videos interactive.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chat Interface */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white font-semibold">
                VTT RAG Assistant
              </span>
              <span className="text-blue-200 text-sm ml-auto">
                Ready to Help
              </span>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user" ? "bg-blue-500" : "bg-indigo-500"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-xs lg:max-w-sm ${
                      message.type === "user" ? "text-right" : ""
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white/10 text-white"
                      } ${
                        message.type === "user"
                          ? "rounded-tr-md"
                          : "rounded-tl-md"
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {message.content}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 text-white p-3 rounded-2xl rounded-tl-md">
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
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Ask about your videos..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Video Content Understanding
                </h3>
                <p className="text-gray-300">
                  Processes VTT files to understand educational content and
                  provides contextual answers based on actual video transcripts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Precise Timestamp Citations
                </h3>
                <p className="text-gray-300">
                  Every answer includes exact timestamps so you can jump
                  directly to the relevant moments in your educational videos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Educational Context Awareness
                </h3>
                <p className="text-gray-300">
                  Understands learning objectives and provides comprehensive
                  explanations tailored for educational content and student
                  comprehension.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Same animated background elements as Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatHeader from "./chat/ChatHeader";
import MessagesContainer from "./chat/MessagesContainer";
import ChatInput from "./chat/ChatInput";
import { courseAvailable } from "@/data/courseAvailable";

export default function VTTChatUI() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hi! I'm your VTT RAG assistant. Select a course from the dropdown to start ask me questions.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // New state for course management
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);

  // Fetch available courses on component mount
  useEffect(() => {
    fetchAvailableCourses();
  }, []);

  const fetchAvailableCourses = async () => {
    try {
      setAvailableCourses(courseAvailable);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleBackToLanding = () => {
    router.push("/");
  };

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);

    // Add system message when course is selected
    const courseInfo = availableCourses.find((c) => c.id === courseId);
    if (courseInfo) {
      const systemMessage = {
        id: Date.now(),
        type: "system",
        content: `📚 Switched to "${courseInfo.title}" - You can now ask questions about this course's ${courseInfo.videoCount} videos.`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    }
  };

  const handleSendMessage = async (messageText) => {
    // Check if course is selected
    if (!selectedCourse) {
      const warningMessage = {
        id: Date.now(),
        type: "assistant",
        content:
          "⚠️ Please select a course from the dropdown first before asking questions.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, warningMessage]);
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          courseId: selectedCourse, // Pass selected course to API
        }),
      });

      const result = await response.json();
      console.log("Chat response:", result);

      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: result.content || "Sorry, I couldn't answer that.",
        sources: result?.sources || [],
        videoReferences: result?.videoReferences || [], // New field for video timestamps
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content:
          "❌ Sorry, there was an error processing your request. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />

      <div className="relative z-10 max-w-4xl mx-auto p-4 h-screen flex flex-col">
        <ChatHeader
          selectedCourse={selectedCourse}
          availableCourses={availableCourses}
          onCourseChange={handleCourseChange}
          onBackToLanding={handleBackToLanding}
        />

        <MessagesContainer
          messages={messages}
          isLoading={isLoading}
          selectedCourse={selectedCourse}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={!selectedCourse}
          placeholder={
            selectedCourse
              ? "Ask about the selected course videos..."
              : "Select a course first to start chatting..."
          }
        />
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>
    </div>
  );
}

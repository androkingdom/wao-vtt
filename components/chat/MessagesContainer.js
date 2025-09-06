import { useEffect, useRef } from "react";
import Message from "./Message";
import LoadingIndicator from "./LoadingIndicator";

export default function MessagesContainer({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 bg-white/5 backdrop-blur-sm border-x border-white/10 p-4 overflow-y-auto space-y-4">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          isCurrentUser={message.type === "user"}
        />
      ))}

      {isLoading && <LoadingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
}

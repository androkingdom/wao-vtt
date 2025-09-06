import VTTChatUI from "@/components/VTTChatUI";

export const metadata = {
  title: "VTT RAG Chat - Ask Questions About Your Videos",
  description:
    "Interactive chat interface to query your educational video content with timestamp citations.",
};

export default function ChatPage() {
  return <VTTChatUI />;
}

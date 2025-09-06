import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";

export default function ChatInput({ onSendMessage, isLoading = false }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { message: "" },
  });

  const messageValue = watch("message");

  const onSubmit = async (data) => {
    if (!data.message.trim()) return;

    await onSendMessage(data.message);
    reset();
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-b-xl border border-white/10 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
        <div className="flex-1">
          <input
            {...register("message", {
              required: "Message is required",
              minLength: { value: 1, message: "Message cannot be empty" },
            })}
            autoComplete="off"
            type="text"
            placeholder="Ask about your videos..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            disabled={isSubmitting || isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isLoading || !messageValue?.trim()}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
        >
          <FaPaperPlane className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

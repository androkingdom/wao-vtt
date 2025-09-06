import { Upload, Search, Clock, BookOpen, Zap, Shield } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Upload,
      title: "Easy VTT Upload",
      description:
        "Simply drag and drop your VTT subtitle files or video transcripts to get started instantly.",
    },
    {
      icon: Search,
      title: "Semantic Search",
      description:
        "Find exact information across hours of content using natural language queries and AI-powered search.",
    },
    {
      icon: Clock,
      title: "Timestamp Citations",
      description:
        "Every answer comes with precise timestamps so you can jump directly to relevant video moments.",
    },
    {
      icon: BookOpen,
      title: "Context-Aware Answers",
      description:
        "Get comprehensive answers that understand the educational context and learning objectives.",
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description:
        "Process hours of video content in seconds and start asking questions immediately.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your educational content stays secure with local processing and encrypted storage.",
    },
  ];

  return (
    <div className="relative py-20 px-4">
      {/* Same background gradient as Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Transform Videos into Knowledge
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful VTT RAG technology that makes your educational videos
            searchable, interactive, and more valuable for learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Educational Focus Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Perfect for Educational Content
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Whether it's coding tutorials, academic lectures, or training
              videos - our VTT RAG system makes all your educational content
              instantly searchable and more effective.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-300">
              <span className="px-3 py-1 bg-blue-500/20 rounded-full">
                Programming Tutorials
              </span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full">
                Academic Lectures
              </span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full">
                Training Videos
              </span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full">
                Webinars
              </span>
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

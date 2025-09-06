"use client";
import { ArrowRight, CheckCircle, MessageCircle, Play } from "lucide-react";

export default function CTA() {
  return (
    <div className="relative py-20 px-4">
      {/* Same background gradient as other sections */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Start Learning Smarter Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform any video into an interactive learning experience. Ask
            questions, get instant answers with precise timestamps.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              "Instant video search",
              "Smart Q&A system",
              "No installation needed",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              <MessageCircle className="w-5 h-5" />
              <a href="/chat">Start Asking Questions</a>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              Trusted by learners worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-6 opacity-70">
              {[
                "Students",
                "Professionals",
                "Researchers",
                "Content Creators",
                "Educators",
              ].map((category, index) => (
                <div key={index} className="text-white font-medium text-sm">
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Same animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>
    </div>
  );
}

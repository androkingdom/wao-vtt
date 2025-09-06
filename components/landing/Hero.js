"use client";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function Hero() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-white">
            Backed by ChaiCodeHQ
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Learn from Videos
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent block">
            Ask Questions
          </span>
          Get Instant Answers
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform your educational videos into an interactive learning
          experience. Search through lectures, get precise answers with
          timestamps, and never miss important concepts again.
        </p>

        {/* CTA Section - Empty as requested */}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              1000+
            </div>
            <div className="text-gray-400 text-sm">Hours Processed</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              50K+
            </div>
            <div className="text-gray-400 text-sm">Questions Answered</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              98%
            </div>
            <div className="text-gray-400 text-sm">Accuracy Rate</div>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>
    </div>
  );
}

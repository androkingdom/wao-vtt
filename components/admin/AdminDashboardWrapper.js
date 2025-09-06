"use client";

export default function AdminDashboardWrapper({ children }) {
  return (
    <div className="relative min-h-screen p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />

      {/* Glass panel */}
      <div className="relative z-10 max-w-6xl mx-auto bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-3xl p-10 border border-white/10 shadow-lg">
        {children}
      </div>

      {/* Animated accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>
    </div>
  );
}

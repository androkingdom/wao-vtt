import Hero from "@/components/landing/Hero";
import AIConversationDemo from "@/components/landing/AIConversationDemo";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Hero />
      <AIConversationDemo />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

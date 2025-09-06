// components/Footer.js
import { FaGithub, FaTwitter, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  // Easy to modify social links array
  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/androkingdom",
      external: true,
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: "https://twitter.com/RishabhMadh",
      external: true,
    },
    {
      name: "Email",
      icon: FaEnvelope,
      url: "mailto:rishabh.madhwal.dev@gmail.com",
      external: false,
    },
  ];

  // Footer text configuration
  const footerText = {
    author: "andro",
    message: "Built with",
  };

  return (
    <footer className="relative py-6 px-4 border-t border-white/10">
      {/* Same background gradient as other sections */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target={social.external ? "_blank" : "_self"}
              rel={social.external ? "noopener noreferrer" : ""}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={social.name}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Built with love */}
        <p className="text-gray-400 text-sm flex items-center gap-1">
          {footerText.message} <FaHeart className="w-4 h-4 text-red-500" /> by{" "}
          <span className="text-white">{footerText.author}</span>
        </p>
      </div>
    </footer>
  );
}

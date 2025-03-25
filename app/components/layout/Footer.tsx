import { motion } from "framer-motion";
import { instrumentSerif } from "@/app/styles/fonts";
import {
  Github,
  Twitter,
  Linkedin,
  ChevronRight,
  Sparkles,
  ArrowUp,
  Mail,
} from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/theblitlabs", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/labs.blit", label: "Twitter" },
    { icon: Mail, href: "mailto:theblitlabs@gmail.com", label: "Email" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Top fade gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black to-transparent" />

      {/* Content wrapper with subtle top border */}
      <div className="relative pt-32 pb-20 border-t border-[#00EFA6]/[0.02]">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00EFA6]/[0.02] to-black/5" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <motion.svg
            width="100%"
            height="100%"
            initial={{ rotate: -5, scale: 1.1 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <pattern
              id="footer-grid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-5)"
            >
              <rect width="40" height="40" fill="none" />
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#footer-grid)" />
          </motion.svg>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#00EFA6]/[0.02] blur-[120px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Logo and description */}
            <div className="space-y-6">
              <motion.div className="relative">
                <motion.a
                  href="/"
                  className={`text-3xl font-medium ${instrumentSerif.className} text-white/90 block mb-4 relative z-10`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  parity
                </motion.a>
                <motion.div
                  className="absolute -top-4 -left-6 text-[#00EFA6]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-white/50 max-w-xs leading-relaxed"
              >
                A Distributed Compute Network enabling trustless task execution
                with Docker-based validation and automated reward distribution.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "60px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="h-[1px] bg-gradient-to-r from-[#00EFA6]/30 to-transparent"
              />
            </div>

            {/* Social and Contact */}
            <div className="space-y-8">
              {/* Social Links */}
              <div className="space-y-6">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm font-medium text-[#00EFA6]/60 uppercase tracking-wider"
                >
                  Connect
                </motion.h3>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="relative p-2 border border-[#00EFA6]/[0.05] rounded-full hover:border-[#00EFA6]/20 hover:text-[#00EFA6] transition-all duration-300 group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 * index }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="absolute inset-0 rounded-full bg-[#00EFA6]/[0.02] scale-0 group-hover:scale-100 transition-transform duration-300" />
                        <Icon className="w-4 h-4 text-white/70 group-hover:text-[#00EFA6] transition-colors relative z-10" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm font-medium text-[#00EFA6]/60 uppercase tracking-wider"
                >
                  Contact
                </motion.h3>
                <motion.a
                  href="mailto:theblitlabs@gmail.com"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-block group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base text-white/70 group-hover:text-white/90 transition-colors">
                      theblitlabs@gmail.com
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#00EFA6]/50 group-hover:text-[#00EFA6] transition-colors transform group-hover:translate-x-1 duration-300" />
                  </div>
                  <div className="h-[1px] w-0 group-hover:w-full bg-[#00EFA6]/20 transition-all duration-300" />
                </motion.a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#00EFA6]/10 to-transparent mb-8"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              © {new Date().getFullYear()} Blit Labs. All rights reserved.
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

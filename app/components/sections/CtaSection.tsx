import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { ArrowRight, ArrowUpRight, Send } from "lucide-react";
import { instrumentSerif } from "@/app/styles/fonts";
import { useState } from "react";

// Grid line component for background
const GridLine = ({
  isVertical = false,
  position,
  delay,
}: {
  isVertical?: boolean;
  position: number;
  delay: number;
}) => (
  <motion.line
    x1={isVertical ? `${position}%` : "0%"}
    y1={isVertical ? "0%" : `${position}%`}
    x2={isVertical ? `${position}%` : "100%"}
    y2={isVertical ? "100%" : `${position}%`}
    stroke="white"
    strokeWidth="0.5"
    initial={{ opacity: 0, pathLength: 0 }}
    animate={{ opacity: 0.5, pathLength: 1 }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
  />
);

// Animated dot pattern
const DotPattern = ({ delay = 0 }: { delay?: number }) => (
  <motion.g
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.3 }}
    transition={{ duration: 1, delay }}
  >
    {Array.from({ length: 6 }).map((_, rowIndex) =>
      Array.from({ length: 12 }).map((_, colIndex) => (
        <motion.circle
          key={`dot-${rowIndex}-${colIndex}`}
          cx={colIndex * 40 + 20}
          cy={rowIndex * 40 + 20}
          r={1}
          fill="white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + (rowIndex + colIndex) * 0.03,
            ease: "easeOut",
          }}
        />
      ))
    )}
  </motion.g>
);

export const CtaSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
    // Add your newsletter subscription logic here
  };

  return (
    <Section id="cta" className="relative overflow-hidden py-32 sm:py-40">
      {/* Background grid pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
          <motion.g
            opacity="0.05"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Horizontal grid lines */}
            {[10, 30, 50, 70, 90].map((position, i) => (
              <GridLine
                key={`h-line-${i}`}
                position={position}
                delay={0.1 * i}
              />
            ))}

            {/* Vertical grid lines */}
            {[20, 40, 60, 80].map((position, i) => (
              <GridLine
                key={`v-line-${i}`}
                position={position}
                delay={0.1 * i + 0.05}
                isVertical
              />
            ))}
          </motion.g>

          {/* Dot pattern */}
          <DotPattern delay={0.8} />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Top decorative line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "60px" }}
          transition={{ duration: 0.7 }}
          className="h-[1px] bg-[#00EFA6]/20 mb-12 mx-auto"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 relative z-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1 border border-[#00EFA6]/20 text-xs uppercase tracking-wider text-[#00EFA6]/70 mb-4"
          >
            Parity Protocol Beta
          </motion.span>

          <h2
            className={`text-4xl sm:text-5xl md:text-6xl text-white/90 ${instrumentSerif.className}`}
          >
            Join the Future of Computing
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto"
          >
            Be among the first to experience Parity Protocol by Blit Labs. Join
            our waitlist to get early access to the future of decentralized
            computing and exclusive benefits.
          </motion.p>

          <div className="flex flex-col items-center justify-center gap-4 mt-12">
            <motion.form
              onSubmit={handleSubscribe}
              className="relative w-full max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 bg-white/5 border border-[#00EFA6]/10 rounded-lg focus:outline-none focus:border-[#00EFA6]/30 text-white/70 placeholder-white/30 pr-12 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#00EFA6]/70 hover:text-[#00EFA6] transition-colors group"
              >
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </motion.form>

            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-[#00EFA6]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-2 h-2 rounded-full bg-[#00EFA6]"
                />
                <span className="text-sm">
                  Thank you for joining the waitlist!
                </span>
              </motion.div>
            )}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-sm text-white/40 mt-6"
          >
            Get notified about Parity Protocol's launch and receive exclusive
            early access benefits from Blit Labs
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-[15%] right-[15%] w-64 h-64 border border-[#00EFA6]/10 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        <motion.div
          className="absolute bottom-[25%] left-[15%] w-40 h-40 border border-[#00EFA6]/10"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.05, rotate: 45 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-white/[0.02] to-black/0" />
        </div>
      </div>
    </Section>
  );
};

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { instrumentSerif } from "@/app/styles/fonts";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  delay = 0,
  className = "",
}: FeatureCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`group relative overflow-hidden border-t border-[#00EFA6]/10 pt-8 ${className}`}
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + 0.2,
          }}
          className="mb-6"
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="text-[#00EFA6]/80">{icon}</div>
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + 0.3,
          }}
          className={`text-xl font-light mb-3 text-white/90 ${instrumentSerif.className}`}
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + 0.4,
          }}
          className="text-sm text-white/60 leading-relaxed max-w-sm"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}

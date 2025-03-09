import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: "default" | "dark";
}

export const GlassCard = ({
  children,
  className = "",
  hoverable = true,
  variant = "default",
}: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={`
        relative overflow-hidden
        ${className}
      `}
    >
      {/* Main Card */}
      <div
        className={`
          relative backdrop-blur-xl
          border border-white/[0.08] rounded-lg
          ${variant === "dark" ? "bg-black/40" : "bg-white/[0.02]"}
        `}
      >
        {/* Content */}
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  );
};

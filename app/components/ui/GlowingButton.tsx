import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowingButtonProps {
  children: ReactNode;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "ghost";
}

export const GlowingButton = ({
  children,
  primary,
  onClick,
  className = "",
  size = "md",
  variant = "solid",
}: GlowingButtonProps) => {
  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative group overflow-hidden
        ${sizeClasses[size]}
        rounded-lg font-medium
        transition-all duration-300
        ${variant === "solid" && primary && "bg-white text-black"}
        ${variant === "solid" && !primary && "bg-white/10"}
        ${variant === "outline" && "border border-white/20"}
        ${variant === "ghost" && "hover:bg-white/5"}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Content */}
      <span
        className={`
          relative flex items-center justify-center gap-2
          ${variant === "solid" && primary ? "text-black" : "text-white"}
          ${variant === "outline" && "text-white"}
          ${variant === "ghost" && "text-white/70 group-hover:text-white"}
        `}
      >
        {children}
      </span>

      {/* Hover Effect */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          ${variant === "solid" && primary && "bg-white/20"}
          ${variant === "solid" && !primary && "bg-white/5"}
          ${variant === "outline" && "bg-white/5"}
        `}
      />
    </motion.button>
  );
};

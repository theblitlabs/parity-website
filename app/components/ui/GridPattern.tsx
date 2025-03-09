import { motion } from "framer-motion";

interface GridPatternProps {
  opacity?: string;
  size?: string;
}

export const GridPattern = ({ 
  opacity = "0.02", 
  size = "60px" 
}: GridPatternProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className="absolute inset-0 pointer-events-none"
  >
    <div
      className="absolute inset-0"
      style={{
        opacity,
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: `${size} ${size}`,
      }}
    />
  </motion.div>
);
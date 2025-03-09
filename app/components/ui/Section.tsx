import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { instrumentSerif } from "@/app/styles/fonts";
import { GridPattern } from "./GridPattern";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  label?: string;
  title?: string;
  description?: string;
  gridPattern?: boolean;
  gridSize?: string;
  gridOpacity?: string;
}

export const Section = ({
  children,
  className = "",
  id,
  label,
  title,
  description,
  gridPattern = true,
  gridSize = "60px",
  gridOpacity = "0.02",
}: SectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-32 bg-[#030303] overflow-hidden ${className}`}
    >
      {gridPattern && <GridPattern size={gridSize} opacity={gridOpacity} />}

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative">
        {(label || title || description) && (
          <div className="max-w-4xl mx-auto mb-20">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white/90 ${instrumentSerif.className}`}
              >
                {title}
              </motion.h2>
            )}

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-white/60 max-w-2xl leading-relaxed mt-6"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
};

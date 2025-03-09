import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { instrumentSerif } from "@/app/styles/fonts";
import {
  FiCpu,
  FiLock,
  FiAward,
  FiBox,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";

const features = [
  {
    title: "Decentralized Network",
    description:
      "Join our upcoming network of compute providers and earn rewards for contributing resources.",
    icon: <FiCpu className="w-6 h-6" />,
  },
  {
    title: "Secure Execution",
    description:
      "Experience our innovative approach to secure task execution with verifiable results.",
    icon: <FiLock className="w-6 h-6" />,
  },
  {
    title: "Token Economy",
    description:
      "Be among the first to participate in our fair and transparent reward system.",
    icon: <FiAward className="w-6 h-6" />,
  },
  {
    title: "Task Management",
    description:
      "Get early access to our intuitive task submission and management interface.",
    icon: <FiBox className="w-6 h-6" />,
  },
  {
    title: "Global Network",
    description:
      "Be part of our growing global network of compute providers and users.",
    icon: <FiGlobe className="w-6 h-6" />,
  },
  {
    title: "Auto Scaling",
    description:
      "Preview our dynamic task distribution system with intelligent resource allocation.",
    icon: <FiTrendingUp className="w-6 h-6" />,
  },
];

export const FeaturesSection = () => {
  return (
    <Section className="relative overflow-hidden py-40 bg-black">
      {/* Swiss-inspired horizontal lines */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-t border-white/[0.02] first:border-t-0"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Header with strong typography */}
        <div className="max-w-7xl mx-auto mb-32">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute -left-4 top-0 w-[1px] h-16 bg-[#00EFA6]/20" />
                <h2 className="text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-tight text-white/90 mb-12">
                  Revolutionary{" "}
                  <span className={instrumentSerif.className}>Features</span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl">
                  Experience the next generation of distributed computing with
                  our comprehensive feature set designed for performance and
                  reliability.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features with horizontal scroll on mobile */}
        <div className="relative -mx-8 px-8 overflow-x-auto pb-8 lg:overflow-x-visible lg:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 min-w-[600px] lg:min-w-0">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Feature number */}
                <div className="absolute -top-8 left-0 text-[11px] font-mono text-white/20">
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="text-[#00EFA6]/80 mb-6 transition-colors duration-300 group-hover:text-[#00EFA6]">
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-light text-white/90 mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-base text-white/50 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="absolute -left-4 top-0 w-[2px] h-0 bg-[#00EFA6]/20 group-hover:h-full transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-32">
          <motion.div
            className="h-[1px] bg-gradient-to-r from-[#00EFA6]/10 via-[#00EFA6]/5 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </div>
    </Section>
  );
};

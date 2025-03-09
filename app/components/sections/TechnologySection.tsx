import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import {
  Shield,
  Network,
  Cpu,
  Blocks,
  CheckCircle,
  Code,
  Server,
} from "lucide-react";
import { instrumentSerif } from "@/app/styles/fonts";

const technologies = [
  {
    icon: Shield,
    title: "Task Verification",
    description:
      "Advanced verification methods ensure accurate and reliable task execution across the network.",
  },
  {
    icon: Network,
    title: "Distributed Network",
    description:
      "A robust network architecture enabling efficient distribution and management of computational tasks.",
  },
  {
    icon: Server,
    title: "Resource Management",
    description:
      "Intelligent allocation and monitoring of computational resources for optimal performance.",
  },
  {
    icon: Code,
    title: "Developer Tools",
    description:
      "Comprehensive SDK and APIs designed for seamless integration and development experience.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description:
      "Built-in mechanisms for ensuring computation integrity and result validation.",
  },
  {
    icon: Blocks,
    title: "Task Orchestration",
    description:
      "Sophisticated task scheduling and coordination for complex computational workflows.",
  },
];

export const TechnologySection = () => {
  return (
    <Section label="Technology" className="relative overflow-hidden py-40">
      {/* Swiss-inspired grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 grid grid-cols-12 gap-px opacity-[0.02]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full bg-white" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Asymmetrical header layout */}
        <div className="grid grid-cols-12 gap-8 mb-32">
          <div className="col-span-12 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="sticky top-8">
                <div className="mb-4 text-[#00EFA6] text-sm tracking-widest uppercase">
                  Our Technology
                </div>
                <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-white/90 mb-8">
                  <span className={instrumentSerif.className}>Advanced</span>{" "}
                  Infrastructure
                </h2>
                <div className="h-[1px] w-16 bg-[#00EFA6]/20 mb-8" />
                <p className="text-lg text-white/60 leading-relaxed">
                  Our platform combines advanced distributed computing
                  technologies with robust verification mechanisms to deliver
                  reliable and efficient computational solutions.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Technology cards in asymmetrical grid */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technologies.map((tech, index) => {
                const Icon = tech.icon;
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={tech.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 * index }}
                    className={`relative ${isEven ? "md:mt-12" : ""}`}
                  >
                    <div className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 backdrop-blur-sm transition-colors duration-300">
                      <div className="p-8">
                        {/* Number indicator */}
                        <div className="absolute top-6 right-6 text-xs text-white/20 font-mono">
                          {(index + 1).toString().padStart(2, "0")}
                        </div>

                        {/* Icon */}
                        <div className="mb-6">
                          <div className="w-10 h-10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#00EFA6]" />
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl text-white/90 mb-3 font-light">
                          {tech.title}
                        </h3>
                        <p className="text-sm text-white/50 leading-relaxed">
                          {tech.description}
                        </p>

                        {/* Hover line */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00EFA6]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

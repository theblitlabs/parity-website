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
  Wallet,
  Database,
} from "lucide-react";
import { instrumentSerif } from "@/app/styles/fonts";

const technologies = [
  {
    icon: Wallet,
    title: "Smart Contract System",
    description:
      "ERC20-based PAR token implementation for reward distribution and task state management, with future staking mechanisms for runner accountability.",
  },
  {
    icon: Database,
    title: "Resource Tracking",
    description:
      "Precise measurement of computational resources via Docker stats: CPU/GPU time, memory usage, storage I/O, and network data for fair reward calculation.",
  },
  {
    icon: Network,
    title: "Webhook Architecture",
    description:
      "Efficient task distribution and completion notifications through webhook system, enabling real-time runner coordination and task status updates.",
  },
  {
    icon: Shield,
    title: "Task Validation",
    description:
      "Secure task execution verification using Docker nonce validation and cross-runner result comparison for trustless computation integrity.",
  },
  {
    icon: Server,
    title: "Runner Infrastructure",
    description:
      "Organized runner pools with Docker sandboxing for secure task execution, enabling torrent-like parallel processing across the network.",
  },
  {
    icon: Blocks,
    title: "Task Distribution",
    description:
      "Dynamic task allocation system with priority-based queuing and automated pool management for efficient workload distribution.",
  },
];

export const TechnologySection = () => {
  return (
    <Section label="Technology" className="relative overflow-hidden py-16">
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
                  Protocol Architecture
                </div>
                <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-white/90 mb-8">
                  <span className={instrumentSerif.className}>Technical</span>{" "}
                  Foundation
                </h2>
                <div className="h-[1px] w-16 bg-[#00EFA6]/20 mb-8" />
                <p className="text-lg text-white/60 leading-relaxed">
                  Powered by Docker-based execution and webhook communication,
                  the Parity Protocol delivers trustless distributed computing
                  with precise resource tracking and automated reward
                  distribution.
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

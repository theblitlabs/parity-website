import { Section } from "../ui/Section";
import { motion } from "framer-motion";
import { Code, Shield, Zap, Network } from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="p-8 border border-white/10 hover:border-[#00EFA6]/30 transition-colors duration-300"
  >
    <Icon className="w-8 h-8 text-[#00EFA6] mb-6" />
    <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
    <p className="text-white/60 leading-relaxed">{description}</p>
  </motion.div>
);

export const FeaturesSection = () => {
  const features = [
    {
      icon: Network,
      title: "Runner Pools",
      description:
        "Organized pools of compute providers enabling torrent-like task distribution and parallel execution across the network.",
    },
    {
      icon: Shield,
      title: "Trustless Verification",
      description:
        "Nonce-based Docker validation and cross-runner result verification ensuring computation integrity across the network.",
    },
    {
      icon: Zap,
      title: "Resource Metrics",
      description:
        "Precise tracking of CPU/GPU time, memory, storage I/O, and network usage through Docker stats integration.",
    },
    {
      icon: Code,
      title: "Smart Contracts",
      description:
        "ERC20-based PAR token system with automated reward distribution and task state management on-chain.",
    },
  ];

  return (
    <Section className="py-24">
      <div className="container mx-auto px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#00EFA6] text-sm tracking-widest uppercase mb-4 block"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-light mb-6"
          >
            Core Capabilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg leading-relaxed"
          >
            Discover how Parity Protocol enables secure, decentralized
            computation through trustless verification and precise resource
            tracking.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={0.4 + index * 0.1} />
          ))}
        </div>
      </div>
    </Section>
  );
};

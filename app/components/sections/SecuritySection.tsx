import { Section } from "../ui/Section";
import {
  Lock,
  Shield,
  Layers,
  Network,
  Key,
  Server,
  UserCheck,
  Code,
} from "lucide-react";

interface SecurityFeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
}

const SecurityFeature = ({
  icon: Icon,
  title,
  description,
  details,
}: SecurityFeatureProps) => (
  <div className="flex flex-col gap-4 p-6 border-l border-[#00EFA6]/20 hover:border-[#00EFA6]/40 hover:bg-white/5 transition-colors">
    <div className="flex items-start gap-4">
      <div className="p-2 border border-[#00EFA6]/20">
        <Icon className="text-[#00EFA6]/70" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
        <p className="text-white/60 mb-4">{description}</p>
        <ul className="space-y-2">
          {details.map((detail: string, index: number) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-white/70"
            >
              <div className="w-1 h-1 rounded-full bg-[#00EFA6]/50" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const securityFeatures = [
  {
    icon: Shield,
    title: "Trustless Execution",
    description:
      "Secure and verifiable task execution across the decentralized network.",
    details: [
      "Docker container sandboxing",
      "WASM runtime isolation",
      "Deterministic output validation",
      "Multi-runner result verification",
    ],
  },
  {
    icon: Lock,
    title: "Task Pool Security",
    description: "Protected task management and distribution system.",
    details: [
      "Secure task metadata encryption",
      "Priority-based task allocation",
      "Resource requirement validation",
      "Automated pool management",
    ],
  },
  {
    icon: UserCheck,
    title: "Runner Authentication",
    description: "Multi-layer runner verification and reputation system.",
    details: [
      "Wallet-based authentication",
      "Machine specification validation",
      "Reputation tracking system",
      "Stake-based accountability",
    ],
  },
  {
    icon: Server,
    title: "Resource Management",
    description: "Secure handling of computational resources and rewards.",
    details: [
      "Real-time resource monitoring",
      "Fair reward distribution",
      "Performance benchmarking",
      "Resource utilization tracking",
    ],
  },
  {
    icon: Network,
    title: "Network Protocol",
    description: "Robust communication between runners and task creators.",
    details: [
      "P2P task distribution",
      "Secure log management via IPFS",
      "Runner pool synchronization",
      "Task completion broadcast",
    ],
  },
  {
    icon: Code,
    title: "Smart Contract Security",
    description: "Blockchain-based security for task and reward management.",
    details: [
      "ERC20 token integration",
      "Automated reward distribution",
      "Task state management",
      "On-chain result validation",
    ],
  },
];

export const SecuritySection = () => {
  return (
    <Section className="py-24">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-[#00EFA6] text-sm tracking-widest uppercase mb-4 block">
            Security Architecture
          </span>
          <h2 className="text-4xl font-light mb-6">
            Enterprise-Grade Security
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            The Parity Protocol implements multiple layers of security to ensure
            trustless computation, secure task execution, and fair reward
            distribution across our decentralized network of runners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <SecurityFeature key={index} {...feature} />
          ))}
        </div>
      </div>
    </Section>
  );
};

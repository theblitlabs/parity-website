import { Section } from "../ui/Section";
import { motion } from "framer-motion";

interface MilestoneProps {
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  delay?: number;
}

const Milestone = ({
  title,
  description,
  status,
  delay = 0,
}: MilestoneProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`relative pl-8 pb-12 border-l ${
      status === "completed"
        ? "border-[#00EFA6]"
        : status === "current"
        ? "border-[#00EFA6]/50"
        : "border-white/10"
    }`}
  >
    <div
      className={`absolute left-0 w-3 h-3 -translate-x-[7px] rounded-full ${
        status === "completed"
          ? "bg-[#00EFA6]"
          : status === "current"
          ? "bg-[#00EFA6]/50"
          : "bg-white/10"
      }`}
    />
    <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
    <p className="text-white/60 leading-relaxed">{description}</p>
  </motion.div>
);

export const RoadmapSection = () => {
  const milestones = [
    {
      title: "Protocol Design",
      description:
        "Development of core protocol architecture, security mechanisms, and task execution specifications.",
      status: "current" as const,
    },
    {
      title: "Runner Implementation",
      description:
        "Building the runner network with Docker integration, resource monitoring, and task validation.",
      status: "upcoming" as const,
    },
    {
      title: "Smart Contracts Auditing",
      description:
        "Smart contracts auditing by leading blockchain security firms.",
      status: "upcoming" as const,
    },
    {
      title: "Testnet Launch",
      description:
        "Initial deployment with test runners and controlled task execution environment.",
      status: "upcoming" as const,
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
            Roadmap
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-light mb-6"
          >
            Development Timeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg leading-relaxed"
          >
            Track our progress as we build the future of decentralized
            computing.
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto">
          {milestones.map((milestone, index) => (
            <Milestone key={index} {...milestone} delay={0.4 + index * 0.1} />
          ))}
        </div>
      </div>
    </Section>
  );
};

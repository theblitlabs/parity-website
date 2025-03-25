import { Section } from "../ui/Section";
import { motion } from "framer-motion";
import { Book, FileText, Github, MessageSquare } from "lucide-react";

interface ResourceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  delay?: number;
}

const ResourceCard = ({
  icon: Icon,
  title,
  description,
  link,
  delay = 0,
}: ResourceCardProps) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="block p-8 border border-white/10 hover:border-[#00EFA6]/30 transition-colors duration-300"
  >
    <Icon className="w-8 h-8 text-[#00EFA6] mb-6" />
    <h3 className="text-lg font-medium text-white mb-3">{title}</h3>
    <p className="text-white/60 leading-relaxed mb-6">{description}</p>
    <div className="text-[#00EFA6] text-sm">Learn More →</div>
  </motion.a>
);

export const ResourcesSection = () => {
  const resources = [
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides and API references for developers.",
      link: "https://docs.parity.io",
    },
    {
      icon: Github,
      title: "GitHub",
      description:
        "Access our open-source repositories and contribute to the protocol.",
      link: "https://github.com/theblitlabs",
    },
    {
      icon: FileText,
      title: "Whitepaper",
      description:
        "Technical details and theoretical foundations of Parity Protocol.",
      link: "/whitepaper.pdf",
    },
    {
      icon: MessageSquare,
      title: "Community",
      description: "Join our community of developers and node operators.",
      link: "https://discord.gg/parity",
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
            Resources
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-light mb-6"
          >
            Developer Resources
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-lg leading-relaxed"
          >
            Everything you need to build on Parity Protocol.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} delay={0.4 + index * 0.1} />
          ))}
        </div>
      </div>
    </Section>
  );
};

import { motion } from "framer-motion";
import { ArrowRight, GitBranch, Shield, Code, Lock } from "lucide-react";
import { instrumentSerif } from "@/app/styles/fonts";
import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { GridPattern } from "../ui/GridPattern";
import React from "react";

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
  <Card delay={delay}>
    <div className="flex items-start gap-4">
      <div className="p-2.5 border border-white/10 rounded-full">
        <Icon className="w-5 h-5 text-white/70" />
      </div>
      <div>
        <h3 className="text-base font-medium text-white/90 mb-2">{title}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
    </div>
  </Card>
);

// Animated node component for the visualization
const Node = ({
  x,
  y,
  size,
  delay,
  duration,
  pulse = false,
  color = "white",
  isCore = false,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  pulse?: boolean;
  color?: string;
  isCore?: boolean;
}) => (
  <>
    {isCore && (
      <motion.circle
        cx={x}
        cy={y}
        r={size + 4}
        fill="transparent"
        stroke={color}
        strokeOpacity={0.15}
        strokeWidth={1}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{
          delay: delay - 0.2,
          duration: 1,
          ease: "easeOut",
        }}
      />
    )}
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      initial={{ opacity: 0, scale: 0 }}
      animate={
        pulse
          ? { opacity: [0, 0.9, 0.5], scale: [0, 1.2, 1] }
          : { opacity: [0, 0.7, 0.5], scale: 1 }
      }
      transition={{
        delay,
        duration: duration * 1.5, // Slowed down by 50%
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
    {isCore && (
      <motion.circle
        cx={x}
        cy={y}
        r={size * 1.8}
        fill="transparent"
        stroke={color}
        strokeOpacity={0.05}
        strokeWidth={0.5}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: delay + 0.2,
          duration: 1,
          ease: "easeOut",
        }}
      />
    )}
  </>
);

// Connection line between nodes
const Connection = ({
  x1,
  y1,
  x2,
  y2,
  delay,
  animated = false,
  type = "normal",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  animated?: boolean;
  type?: "normal" | "primary" | "secondary";
}) => {
  const getOpacity = () => {
    switch (type) {
      case "primary":
        return 0.25;
      case "secondary":
        return 0.15;
      default:
        return 0.1;
    }
  };

  return (
    <>
      {/* Base solid connection - now with individual animation */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="white"
        strokeOpacity={getOpacity()}
        strokeWidth={type === "primary" ? 1.2 : 1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: delay - 0.2, // Start slightly before the animated line
          ease: "easeOut",
        }}
      />

      {/* Initial animation that reveals the connection and then stays */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="white"
        strokeOpacity={getOpacity() * 2}
        strokeWidth={type === "primary" ? 1.2 : 1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          delay,
          duration: 1.5,
          ease: "easeOut",
        }}
      />

      {/* Subtle pulse animation for highlighted connections */}
      {animated && (
        <motion.line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="white"
          strokeWidth={type === "primary" ? 1.2 : 1}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{
            delay: delay + 1.5, // Start after the initial animation
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      )}
    </>
  );
};

// Data packet animation along connection
const DataPacket = ({
  x1,
  y1,
  x2,
  y2,
  delay,
  duration = 3, // Slowed down
  size = 2,
  color = "white",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  duration?: number;
  size?: number;
  color?: string;
}) => {
  const pathRef = React.useRef<SVGPathElement>(null);

  return (
    <>
      <path
        ref={pathRef}
        d={`M${x1},${y1} L${x2},${y2}`}
        stroke="transparent"
        fill="none"
      />
      <motion.circle
        r={size}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{
          delay,
          duration,
          repeat: Infinity,
          repeatDelay: Math.random() * 3 + 2, // Longer delay between repeats
          ease: "easeInOut",
        }}
      >
        <animateMotion
          path={`M${x1},${y1} L${x2},${y2}`}
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </motion.circle>
    </>
  );
};

// Small cluster of mini-nodes
const NodeCluster = ({
  x,
  y,
  delay,
}: {
  x: number;
  y: number;
  delay: number;
}) => {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={1.5}
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay, duration: 1 }}
      />
      <motion.circle
        cx={x + 5}
        cy={y - 3}
        r={1}
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: delay + 0.2, duration: 1 }}
      />
      <motion.circle
        cx={x - 4}
        cy={y + 2}
        r={1}
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: delay + 0.4, duration: 1 }}
      />
      <motion.circle
        cx={x + 2}
        cy={y + 4}
        r={0.8}
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: delay + 0.6, duration: 1 }}
      />
    </g>
  );
};

export const HeroSection = () => {
  const features = [
    {
      icon: GitBranch,
      title: "Decentralized Network",
      description:
        "Join our upcoming network of distributed compute providers.",
    },
    {
      icon: Shield,
      title: "Privacy Guaranteed",
      description: "Experience next-generation cryptographic security.",
    },
    {
      icon: Code,
      title: "Developer First",
      description: "Get early access to our comprehensive SDK and tools.",
    },
    {
      icon: Lock,
      title: "Secure by Design",
      description: "Built with security and reliability at its core.",
    },
  ];

  // Node positions for the network visualization - expanded with more nodes
  const nodes = [
    // Core nodes
    { x: 100, y: 100, size: 4, delay: 0.2, duration: 3, isCore: true },
    {
      x: 200,
      y: 150,
      size: 6,
      delay: 0.5,
      duration: 4,
      pulse: true,
      isCore: true,
    },
    { x: 300, y: 80, size: 5, delay: 0.8, duration: 3.5, isCore: true },
    {
      x: 150,
      y: 250,
      size: 7,
      delay: 1.1,
      duration: 4.5,
      pulse: true,
      isCore: true,
    },
    { x: 250, y: 300, size: 4, delay: 1.4, duration: 3.2, isCore: true },
    { x: 350, y: 220, size: 5, delay: 1.7, duration: 4.2, isCore: true },
    { x: 180, y: 180, size: 3, delay: 2.0, duration: 3.8 },

    // Secondary nodes
    { x: 120, y: 320, size: 5, delay: 2.3, duration: 3.3 },
    { x: 320, y: 150, size: 4, delay: 2.6, duration: 3.6 },
    { x: 80, y: 200, size: 3, delay: 2.9, duration: 4.1 },
    { x: 220, y: 80, size: 5, delay: 3.2, duration: 3.9, pulse: true },
    { x: 380, y: 280, size: 6, delay: 3.5, duration: 4.3 },
    { x: 50, y: 150, size: 4, delay: 3.8, duration: 3.7 },
    { x: 280, y: 350, size: 5, delay: 4.1, duration: 4.0 },
    { x: 170, y: 50, size: 3, delay: 4.4, duration: 3.4 },

    // Additional nodes for more complexity
    { x: 70, y: 280, size: 2.5, delay: 4.7, duration: 3.6 },
    { x: 130, y: 40, size: 2, delay: 5.0, duration: 3.2 },
    { x: 330, y: 320, size: 3, delay: 5.3, duration: 4.1 },
    { x: 30, y: 220, size: 2, delay: 5.6, duration: 3.5 },
    { x: 370, y: 120, size: 2.5, delay: 5.9, duration: 3.8 },
    { x: 270, y: 30, size: 2, delay: 6.2, duration: 3.3 },
    { x: 40, y: 100, size: 2.5, delay: 6.5, duration: 3.9 },
    { x: 230, y: 370, size: 3, delay: 6.8, duration: 4.2 },
  ];

  // Node clusters (groups of tiny nodes)
  const nodeClusters = [
    { x: 90, y: 160, delay: 7.1 },
    { x: 240, y: 120, delay: 7.4 },
    { x: 310, y: 260, delay: 7.7 },
    { x: 140, y: 290, delay: 8.0 },
    { x: 190, y: 220, delay: 8.3 },
    { x: 260, y: 190, delay: 8.6 },
  ];

  // Connections between nodes - expanded with more connections and types
  const connections = [
    // Primary connections (core network)
    {
      x1: 100,
      y1: 100,
      x2: 200,
      y2: 150,
      delay: 0.3,
      animated: true,
      type: "primary" as "primary",
    },
    {
      x1: 200,
      y1: 150,
      x2: 300,
      y2: 80,
      delay: 0.6,
      type: "primary" as "primary",
    },
    {
      x1: 150,
      y1: 250,
      x2: 200,
      y2: 150,
      delay: 0.9,
      type: "primary" as "primary",
    },
    {
      x1: 250,
      y1: 300,
      x2: 150,
      y2: 250,
      delay: 1.2,
      animated: true,
      type: "primary" as "primary",
    },
    {
      x1: 250,
      y1: 300,
      x2: 350,
      y2: 220,
      delay: 1.5,
      type: "primary" as "primary",
    },
    {
      x1: 350,
      y1: 220,
      x2: 300,
      y2: 80,
      delay: 1.8,
      type: "primary" as "primary",
    },

    // Secondary connections
    {
      x1: 180,
      y1: 180,
      x2: 200,
      y2: 150,
      delay: 2.1,
      type: "secondary" as "secondary",
    },
    {
      x1: 120,
      y1: 320,
      x2: 250,
      y2: 300,
      delay: 2.4,
      type: "secondary" as "secondary",
    },
    {
      x1: 320,
      y1: 150,
      x2: 300,
      y2: 80,
      delay: 2.7,
      type: "secondary" as "secondary",
    },
    {
      x1: 80,
      y1: 200,
      x2: 100,
      y2: 100,
      delay: 3.0,
      type: "secondary" as "secondary",
    },
    {
      x1: 220,
      y1: 80,
      x2: 300,
      y2: 80,
      delay: 3.3,
      type: "secondary" as "secondary",
    },
    {
      x1: 380,
      y1: 280,
      x2: 350,
      y2: 220,
      delay: 3.6,
      animated: true,
      type: "secondary" as "secondary",
    },
    {
      x1: 50,
      y1: 150,
      x2: 80,
      y2: 200,
      delay: 3.9,
      type: "secondary" as "secondary",
    },
    {
      x1: 280,
      y1: 350,
      x2: 250,
      y2: 300,
      delay: 4.2,
      type: "secondary" as "secondary",
    },
    {
      x1: 170,
      y1: 50,
      x2: 220,
      y2: 80,
      delay: 4.5,
      type: "secondary" as "secondary",
    },

    // Tertiary connections (normal)
    { x1: 120, y1: 320, x2: 150, y2: 250, delay: 4.8 },
    { x1: 80, y1: 200, x2: 180, y2: 180, delay: 5.1 },
    { x1: 320, y1: 150, x2: 350, y2: 220, delay: 5.4 },
    { x1: 70, y1: 280, x2: 120, y2: 320, delay: 5.7 },
    { x1: 130, y1: 40, x2: 170, y2: 50, delay: 6.0 },
    { x1: 330, y1: 320, x2: 280, y2: 350, delay: 6.3 },
    { x1: 30, y1: 220, x2: 80, y2: 200, delay: 6.6 },
    { x1: 370, y1: 120, x2: 300, y2: 80, delay: 6.9 },
    { x1: 270, y1: 30, x2: 220, y2: 80, delay: 7.2 },
    { x1: 40, y1: 100, x2: 100, y2: 100, delay: 7.5 },
    { x1: 230, y1: 370, x2: 280, y2: 350, delay: 7.8 },
    { x1: 180, y1: 180, x2: 150, y2: 250, delay: 8.1 },
    { x1: 170, y1: 50, x2: 100, y2: 100, delay: 8.4 },
    { x1: 230, y1: 370, x2: 250, y2: 300, delay: 8.7 },
  ];

  // Data packets moving along connections - expanded with more packets
  const dataPackets = [
    // Primary data flows
    { x1: 100, y1: 100, x2: 200, y2: 150, delay: 1.0, duration: 3.0 },
    { x1: 250, y1: 300, x2: 150, y2: 250, delay: 3.5, duration: 3.5 },
    { x1: 320, y1: 150, x2: 300, y2: 80, delay: 6.0, duration: 3.0 },
    { x1: 380, y1: 280, x2: 350, y2: 220, delay: 8.5, duration: 3.5 },
    { x1: 80, y1: 200, x2: 180, y2: 180, delay: 11.0, duration: 3.0 },
    { x1: 200, y1: 150, x2: 300, y2: 80, delay: 13.5, duration: 3.5 },
    { x1: 150, y1: 250, x2: 200, y2: 150, delay: 16.0, duration: 3.0 },

    // Additional data flows
    { x1: 170, y1: 50, x2: 220, y2: 80, delay: 2.0, duration: 2.8 },
    { x1: 280, y1: 350, x2: 250, y2: 300, delay: 4.5, duration: 3.2 },
    { x1: 50, y1: 150, x2: 80, y2: 200, delay: 7.0, duration: 2.5 },
    { x1: 120, y1: 320, x2: 150, y2: 250, delay: 9.5, duration: 3.3 },
    { x1: 370, y1: 120, x2: 300, y2: 80, delay: 12.0, duration: 2.7 },
    { x1: 230, y1: 370, x2: 280, y2: 350, delay: 14.5, duration: 3.1 },
    { x1: 40, y1: 100, x2: 100, y2: 100, delay: 17.0, duration: 2.6 },
  ];

  const scrollToCta = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section className="pt-32 pb-24 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <motion.h1
            className={`text-5xl sm:text-6xl md:text-7xl text-white/90 mb-8 ${instrumentSerif.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            The Future of{" "}
            <span className="text-[#00EFA6]">Distributed Computing</span> is
            Coming
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We're building a revolutionary platform for secure and efficient
            distributed computing. Join our waitlist to be among the first to
            experience it.
          </motion.p>

          <motion.button
            onClick={scrollToCta}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#00EFA6] text-black hover:bg-[#00EFA6]/90 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-base font-medium">Join Waitlist</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          {/* Left content */}
          <div className="relative z-10 space-y-10 md:space-y-12">
            {/* Main heading */}
            <div className="relative">
              <h1 className="text-[44px] leading-[1.1] sm:text-6xl lg:text-7xl font-light tracking-tight text-white/90">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="block"
                >
                  Decentralized
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className={`${instrumentSerif.className} block mt-1 sm:mt-0 sm:inline`}
                >
                  Computing
                </motion.span>{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="block mt-1 sm:mt-0 sm:inline"
                >
                  Protocol
                </motion.span>
              </h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl font-light"
            >
              A secure and efficient protocol for distributed computation,
              powered by cryptographic guarantees.
            </motion.p>
          </div>

          {/* Right content - Network visualization */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-30" />

            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-10">
              <GridPattern />
            </div>

            {/* Network visualization */}
            <div className="relative w-full h-[500px]">
              <svg width="100%" height="100%" viewBox="0 0 400 400">
                {/* Background grid lines */}
                <g opacity="0.05">
                  {/* Horizontal grid lines */}
                  <motion.line
                    x1="0"
                    y1="100"
                    x2="400"
                    y2="100"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.5, pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                  />
                  <motion.line
                    x1="0"
                    y1="200"
                    x2="400"
                    y2="200"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.5, pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                  />
                  <motion.line
                    x1="0"
                    y1="300"
                    x2="400"
                    y2="300"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.5, pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  />

                  {/* Vertical grid lines */}
                  <motion.line
                    x1="100"
                    y1="0"
                    x2="100"
                    y2="400"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.5, pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  />
                  <motion.line
                    x1="200"
                    y1="0"
                    x2="200"
                    y2="400"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.5, pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  />
                  <motion.line
                    x1="300"
                    y1="0"
                    x2="300"
                    y2="400"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.5, pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  />
                </g>

                {/* Connections - render these first so they appear behind nodes */}
                {connections.map((conn, i) => (
                  <Connection key={`conn-${i}`} {...conn} />
                ))}

                {/* Data packets */}
                {dataPackets.map((packet, i) => (
                  <DataPacket key={`packet-${i}`} {...packet} color="#00EFA6" />
                ))}

                {/* Node clusters */}
                {nodeClusters.map((cluster, i) => (
                  <NodeCluster key={`cluster-${i}`} {...cluster} />
                ))}

                {/* Nodes - render these last so they appear on top */}
                {nodes.map((node, i) => (
                  <Node
                    key={`node-${i}`}
                    {...node}
                    color={node.isCore ? "#00EFA6" : "white"}
                  />
                ))}
              </svg>

              {/* Abstract geometric shapes */}
              <motion.div
                className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.9, 1.1, 0.9] }}
                transition={{
                  duration: 8, // Slowed down
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute bottom-40 left-10 w-24 h-24 border border-white/10"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: [0.1, 0.25, 0.1], rotate: 45 }}
                transition={{
                  duration: 10, // Slowed down
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute top-40 left-20 w-16 h-16 border border-white/10 rounded-md"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: [0.05, 0.2, 0.05], rotate: -30 }}
                transition={{
                  duration: 12, // Slowed down
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Stats indicators */}
              <motion.div
                className="absolute top-10 left-10 px-4 py-2 bg-white/5 border border-[#00EFA6]/20 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
              >
                <div className="text-xs text-[#00EFA6]/70">EARLY ACCESS</div>
                <div className="text-xl text-white/90 font-light">Q3 2025</div>
                <div className="text-[10px] text-white/40 mt-1">
                  Coming Soon
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-10 right-10 px-4 py-2 bg-white/5 border border-[#00EFA6]/20 backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.7 }}
              >
                <div className="text-xs text-[#00EFA6]/70">DEVELOPMENT</div>
                <div className="text-xl text-white/90 font-light">80%</div>
                <div className="text-[10px] text-white/40 mt-1">Complete</div>
              </motion.div>

              <motion.div
                className="absolute top-10 right-10 px-4 py-2 bg-white/5 border border-[#00EFA6]/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.7 }}
              >
                <div className="text-xs text-[#00EFA6]/70">WAITLIST</div>
                <div className="text-xl text-white/90 font-light">OPEN</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

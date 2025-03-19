import { motion } from "framer-motion";
import { instrumentSerif } from "@/app/styles/fonts";
import { Section } from "../ui/Section";
import React from "react";

interface StepCardProps {
  icon: React.ElementType;
  number: number;
  title: string;
  description: string;
  delay?: number;
}

const AnimatedNumber = ({ number }: { number: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="absolute -left-8 top-0 text-6xl font-light text-white/10"
  >
    {number}
  </motion.div>
);

// Step card with timeline
const StepCard = ({
  icon: Icon,
  number,
  title,
  description,
  delay = 0,
}: StepCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative pl-12 pb-12 last:pb-0"
  >
    <AnimatedNumber number={number} />
    <div className="relative">
      {number !== 4 && (
        <div className="absolute left-0 top-14 bottom-0 w-px bg-gradient-to-b from-[#00EFA6]/30 to-transparent" />
      )}
      <div className="absolute left-[-12px] top-4 w-6 h-6 rounded-full bg-black border border-[#00EFA6]/30 flex items-center justify-center">
        <Icon className="w-3 h-3 text-[#00EFA6]" />
      </div>
      <div className="pl-8">
        <h3 className="text-xl text-white/90 mb-2">{title}</h3>
        <p className="text-sm text-white/60 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

// Enhanced terminal visualization component
const TerminalOutput = ({
  lines,
  role,
}: {
  lines: { text: string; delay: number }[];
  role: "client" | "runner" | "task";
}) => {
  return (
    <motion.div
      className="font-mono text-sm leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-white/70 space-y-3">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: line.delay, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            {line.text.startsWith("$") && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: line.delay }}
                className={`w-2 h-2 rounded-full ${
                  role === "client"
                    ? "bg-[#00EFA6]"
                    : role === "runner"
                    ? "bg-[#FF79C6]"
                    : "bg-yellow-500"
                }`}
              />
            )}
            <motion.span
              className={`${
                line.text.startsWith("✓")
                  ? role === "client"
                    ? "text-[#00EFA6]"
                    : role === "runner"
                    ? "text-[#FF79C6]"
                    : "text-yellow-500"
                  : line.text.startsWith("➜")
                  ? "text-white/40"
                  : "text-white/70"
              } font-light tracking-wide`}
            >
              {line.text}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Client service terminal content
const ClientServiceTerminal = () => {
  const lines = [
    { text: "$ parity-client start", delay: 0.2 },
    { text: "➜ Initializing client service...", delay: 0.4 },
    { text: "✓ Client service started on port 3000", delay: 0.6 },
    { text: "➜ Listening for task submissions...", delay: 0.8 },
  ];

  return <TerminalOutput lines={lines} role="client" />;
};

// Task submission terminal content
const TaskSubmissionTerminal = () => {
  const lines = [
    { text: "$ curl -X POST http://localhost:3000/v1/tasks \\ ", delay: 0.2 },
    {
      text: '  -d \'{"type": "compute", "data": "encoded_payload"}\'',
      delay: 0.4,
    },
    { text: "✓ Task queued - ID: 8A52E9", delay: 0.6 },
    { text: "$ curl http://localhost:3000/v1/tasks/8A52E9/status", delay: 0.8 },
    { text: "➜ Status: PENDING - Waiting for runner...", delay: 1.0 },
  ];

  return <TerminalOutput lines={lines} role="task" />;
};

// Runner terminal content
const RunnerTerminal = () => {
  const lines = [
    { text: "$ parity-runner start", delay: 0.2 },
    { text: "✓ Connected to Parity network", delay: 0.4 },
    { text: "➜ Scanning for available tasks...", delay: 0.6 },
    { text: "✓ Found task: 8A52E9", delay: 0.8 },
    { text: "➜ Processing computation", delay: 1.0 },
    { text: "✓ Computation complete", delay: 1.2 },
    { text: "✓ Earned 2.5 PARITY tokens", delay: 1.4 },
  ];

  return <TerminalOutput lines={lines} role="runner" />;
};

// Grid background component
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 grid grid-cols-6 gap-px opacity-[0.02]">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
          className="h-32 bg-white"
        />
      ))}
    </div>
  </div>
);

// Enhanced terminal window component
const TerminalWindow = ({
  children,
  title,
  role,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  role: "client" | "runner" | "task";
  className?: string;
}) => {
  const roleColors = {
    client: "bg-black",
    runner: "bg-[#FF79C6]/5",
    task: "bg-yellow-500/5",
  };

  const dotColors = {
    client: "bg-[#00EFA6]/20",
    runner: "bg-[#FF79C6]/20",
    task: "bg-yellow-500/20",
  };

  const textColors = {
    client: "text-[#00EFA6]",
    runner: "text-[#FF79C6]/60",
    task: "text-yellow-500/60",
  };

  const statusText = {
    client: "RUNNING",
    runner: "Processing",
    task: "Submitting",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative border border-[#00EFA6]/20 overflow-hidden group ${className}`}
    >
      <div className={`h-12 ${roleColors[role]} flex items-center px-6`}>
        <div className="flex items-center gap-6 w-full">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${dotColors[role]}`}
              />
            ))}
          </div>
          <div
            className={`text-sm ${textColors[role]} uppercase tracking-widest flex-1`}
          >
            {title}
          </div>
          {role === "runner" && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF79C6] animate-pulse" />
                <div className="text-xs text-[#FF79C6]/60 uppercase tracking-widest">
                  Earning PARITY
                </div>
              </div>
            </div>
          )}
          <div
            className={`text-sm ${textColors[role]} uppercase tracking-wider`}
          >
            {statusText[role]}
          </div>
        </div>
      </div>
      <div className="p-8 bg-black relative">
        {children}
        {role === "client" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="absolute right-8 bottom-8 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00EFA6] animate-pulse" />
            <div className="text-xs text-[#00EFA6]/60 uppercase tracking-widest">
              SERVICE ACTIVE
            </div>
          </motion.div>
        )}
        {role === "runner" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            className="absolute right-8 bottom-8 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF79C6] animate-pulse" />
            <div className="text-xs text-[#FF79C6]/60 uppercase tracking-widest">
              TASK COMPLETE
            </div>
          </motion.div>
        )}
        {role === "task" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="absolute right-8 bottom-8 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <div className="text-xs text-yellow-500/60 uppercase tracking-widest">
              TASK QUEUED
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced dual terminal display
const TripleTerminalDisplay = () => {
  return (
    <div className="grid gap-8">
      {/* Runner Terminal */}
      <TerminalWindow
        title="RUNNER TERMINAL"
        role="runner"
        className="border-[#FF79C6]/20"
      >
        <RunnerTerminal />
      </TerminalWindow>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Task Submission Terminal */}
        <TerminalWindow
          title="TASK SUBMISSION"
          role="task"
          className="border-yellow-500/20"
        >
          <TaskSubmissionTerminal />
        </TerminalWindow>
        {/* Client Service Terminal */}
        <TerminalWindow
          title="PARITY CLIENT SERVICE"
          role="client"
          className="border-[#00EFA6]/20"
        >
          <ClientServiceTerminal />
        </TerminalWindow>
      </div>
    </div>
  );
};

// Enhanced step component
const StepNumber = ({ number }: { number: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-8xl font-light text-white/[0.03] absolute -top-8 -left-4 -z-10"
  >
    {number}
  </motion.div>
);

export const GetStartedContent = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 relative overflow-hidden">
        <GridBackground />
        <div className="container mx-auto px-8 relative">
          <div className="max-w-screen-xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-16 text-center"
            >
              <div className="grid gap-8">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex mx-auto"
                >
                  <div className="px-4 py-2 border border-[#00EFA6]/20">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00EFA6]" />
                      <span className="text-[#00EFA6] text-sm uppercase tracking-widest">
                        Developer Guide
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-6xl md:text-7xl lg:text-8xl text-white ${instrumentSerif.className}`}
                >
                  Build the <span className="text-[#00EFA6]">Future</span> of
                  Computing
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
                >
                  Join our network of distributed compute providers and start
                  building the next generation of secure, scalable applications
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Main Content */}
      <Section className="py-24 bg-black">
        <div className="container mx-auto px-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid gap-32">
              {/* Steps */}
              <div className="grid gap-16">
                <div className="grid gap-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-12 h-px bg-[#00EFA6]/20" />
                    <span className="text-[#00EFA6]/60 text-sm uppercase tracking-widest">
                      Getting Started
                    </span>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={`text-4xl md:text-5xl text-white/90 ${instrumentSerif.className}`}
                  >
                    Implementation Steps
                  </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                  {[
                    {
                      number: "01",
                      title: "Install",
                      description: "npm install @client/sdk",
                    },
                    {
                      number: "02",
                      title: "Initialize",
                      description: "Configure your client instance",
                    },
                    {
                      number: "03",
                      title: "Connect",
                      description: "Join the compute network",
                    },
                    {
                      number: "04",
                      title: "Earn",
                      description: "Process tasks and earn PARITY",
                    },
                  ].map((step) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="relative p-6 border border-white/[0.02]"
                    >
                      <StepNumber number={step.number} />
                      <div className="grid gap-4">
                        <h3 className="text-lg text-white uppercase tracking-wide">
                          {step.title}
                        </h3>
                        <p className="text-white/60 font-light">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Terminals */}
              <div className="grid gap-16">
                <div className="grid gap-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-12 h-px bg-[#00EFA6]/20" />
                    <span className="text-[#00EFA6]/60 text-sm uppercase tracking-widest">
                      Quick Start
                    </span>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={`text-4xl md:text-5xl text-white/90 ${instrumentSerif.className}`}
                  >
                    Setup & Task Flow
                  </motion.h2>
                </div>

                <TripleTerminalDisplay />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Requirements Section */}
      <Section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid gap-16">
              <div className="grid gap-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <div className="w-12 h-px bg-[#00EFA6]/20" />
                  <span className="text-[#00EFA6]/60 text-sm uppercase tracking-widest">
                    Requirements
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className={`text-4xl md:text-5xl text-white/90 ${instrumentSerif.className}`}
                >
                  System Specifications
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
                {[
                  { label: "Runtime", value: "Node.js 16+" },
                  { label: "Memory", value: "4GB RAM" },
                  { label: "Network", value: "Stable Connection" },
                  { label: "Auth", value: "API Key" },
                ].map((req, index) => (
                  <motion.div
                    key={req.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black p-8 grid gap-4 group hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="text-[#00EFA6]/40 uppercase tracking-widest text-sm">
                      {req.label}
                    </div>
                    <div className="text-white font-light text-lg">
                      {req.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

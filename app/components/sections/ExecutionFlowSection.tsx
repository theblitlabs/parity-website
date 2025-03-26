import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../ui/Section";
import {
  Terminal,
  Server,
  Box,
  Play,
  Award,
  Container,
  ArrowRight,
} from "lucide-react";
import React from "react";
import { GridPattern } from "../ui/GridPattern";
import { instrumentSerif } from "@/app/styles/fonts";

interface FlowStepProps {
  icon: React.ElementType;
  title: string;
  label: string;
  position: { x: number; y: number };
  output: string;
}

const FlowStep = ({
  icon: Icon,
  title,
  label,
  position,
  output,
}: FlowStepProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`relative p-6 ${"bg-[#00EFA6]/10"} backdrop-blur-sm border border-white/10`}
  >
    <div className="flex items-start gap-6">
      <div className={`p-3 rounded-lg ${"bg-[#00EFA6]/20"}`}>
        <Icon className={`w-6 h-6 ${"text-[#00EFA6]"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-white/90">{title}</h3>
        </div>
        <p className="text-sm text-white/60 mb-4">{label}</p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs bg-black/20 p-3 rounded border border-[#00EFA6]/20"
        >
          <pre className="text-[#00EFA6]/90 whitespace-pre-wrap">{output}</pre>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const FlowArrow = () => (
  <div className="flex justify-center py-2">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <ArrowRight className="w-5 h-5 text-white/20" />
    </motion.div>
  </div>
);

interface NodeProps {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  pulse?: boolean;
  color?: string;
  isCore?: boolean;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const Node: React.FC<NodeProps> = ({
  x,
  y,
  size,
  delay,
  duration,
  color = "white",
  icon: Icon,
  label,
  isActive,
}) => (
  <g>
    {isActive && (
      <>
        <motion.circle
          cx={x}
          cy={y}
          r={size * 2.5}
          fill="transparent"
          stroke={color}
          strokeOpacity={0.08}
          strokeWidth={1}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.08, 0.16, 0.08],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx={x}
          cy={y}
          r={size * 1.5}
          fill="transparent"
          stroke={color}
          strokeOpacity={0.15}
          strokeWidth={1}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.25,
          }}
        />
      </>
    )}

    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill={isActive ? color : "transparent"}
      stroke={color}
      strokeOpacity={isActive ? 1 : 0.15}
      strokeWidth={1.5}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, delay }}
    />

    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: delay + 0.1 }}
    >
      <foreignObject
        x={x - size / 2}
        y={y - size / 2}
        width={size}
        height={size}
        style={{ color: isActive ? "black" : "white" }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <Icon className="w-3.5 h-3.5" />
        </div>
      </foreignObject>
    </motion.g>

    <motion.text
      x={x}
      y={y + size * 2}
      textAnchor="middle"
      className="fill-current text-[11px] uppercase tracking-wider font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.3 }}
    >
      {label}
    </motion.text>
  </g>
);

interface ConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  isActive: boolean;
}

const Connection: React.FC<ConnectionProps> = ({
  x1,
  y1,
  x2,
  y2,
  delay,
  isActive,
}) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const path = `M ${x1} ${y1} Q ${midX} ${y1} ${midX} ${midY} T ${x2} ${y2}`;

  return (
    <>
      <motion.path
        d={path}
        stroke="#00EFA6"
        strokeWidth={1.2}
        strokeOpacity={isActive ? 0.4 : 0.08}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay }}
      />
      {isActive && (
        <motion.circle
          r={2.5}
          fill="#00EFA6"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{
            opacity: { duration: 1.5, repeat: Infinity },
          }}
        >
          <animateMotion
            path={path}
            dur="1.5s"
            repeatCount="indefinite"
            rotate="auto"
          />
        </motion.circle>
      )}
    </>
  );
};

export const ExecutionFlowSection = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  const taskDetails = {
    title: "Figurate Numbers Calculator",
    description:
      "Calculates geometric, square, and triangular number sequences",
    code: `def calculate_sequences(length=5):
    # Geometric sequence (powers of 2)
    geometric = [2**i for i in range(length)]
    
    # Square numbers
    squares = [(i+1)**2 for i in range(length)]
    
    # Triangular numbers
    triangular = [(i*(i+1))//2 for i in range(length)]
    
    return geometric, squares, triangular`,
    example_output: {
      geometric: "[1, 2, 4, 8, 16]",
      squares: "[1, 4, 9, 16, 25]",
      triangular: "[0, 1, 3, 6, 10]",
    },
  };

  const steps = [
    {
      icon: Terminal,
      title: "Client Request",
      label: "CLIENT",
      position: { x: 100, y: 100 },
      output: `curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "image": "geometric-figurate:latest",
    "command": ["python3", "/app/script.py"],
    "title": "Geometric and Figurate Numbers Demo",
    "description": "Geometric sequences and figurate numbers."
  }'`,
    },
    {
      icon: Server,
      title: "Server Processing",
      label: "SERVER",
      position: { x: 250, y: 100 },
      output: `{"task_id": "0x7f3a...b2e1", "selected_runner": "0x9d2c...f4e3"}`,
    },
    {
      icon: Box,
      title: "Runner Assignment",
      label: "RUNNER",
      position: { x: 400, y: 100 },
      output: "Pulling geometric-figurate:latest...\nStatus: Downloaded",
    },
    {
      icon: Play,
      title: "Task Execution",
      label: "EXECUTE",
      position: { x: 400, y: 200 },
      output: "[INFO] Geometric: [1,2,4,8,16]\n[INFO] Square: [1,4,9,16,25]",
    },
    {
      icon: Container,
      title: "Verification",
      label: "VERIFY",
      position: { x: 250, y: 200 },
      output: `{"status": "SUCCESS", "verification": "PASSED"}`,
    },
    {
      icon: Award,
      title: "Reward",
      label: "REWARD",
      position: { x: 100, y: 200 },
      output: "Transfer: 0.05 PRTY\nStatus: CONFIRMED",
    },
  ];

  React.useEffect(() => {
    // Add initial load delay to prevent animation jumps
    const initialTimer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500);

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, [steps.length]);

  return (
    <Section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-24">
          {/* Left content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full"
            >
              <motion.p
                className="text-xs uppercase tracking-widest text-[#00EFA6] mb-4 font-medium p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Execution Flow
              </motion.p>
              <motion.h2
                className={`text-4xl ${instrumentSerif.className} leading-tight relative z-10 tracking-tight px-6 py-4 bg-black/20 w-full`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Distributed Task Pipeline
              </motion.h2>
              <motion.div
                className="absolute inset-0 bg-[#00EFA6]/5 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>

            <div className="mt-8 w-full">
              <AnimatePresence mode="wait">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`${
                      i === activeStep ? "block" : "hidden"
                    } w-full`}
                    style={{ height: i === activeStep ? "auto" : 0 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="font-mono text-xs leading-relaxed p-6 bg-black/20 border-l-2 border-[#00EFA6] relative overflow-hidden w-full"
                    >
                      <motion.div
                        className="absolute inset-0 bg-[#00EFA6]/5"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6 }}
                        style={{ transformOrigin: "left" }}
                      />
                      <div className="relative">
                        <div className="text-[#00EFA6]/70 mb-2 uppercase tracking-wider text-[10px]">
                          {step.title}
                        </div>
                        <pre className="text-white/80 whitespace-pre-wrap font-mono">
                          {step.output}
                        </pre>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </AnimatePresence>
            </div>
            {/* Task Details Panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 p-6 bg-black/20 border border-white/10 backdrop-blur-sm relative w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#00EFA6]/5 to-transparent opacity-20" />
              <div className="relative">
                <h3 className="text-sm font-medium text-[#00EFA6] uppercase tracking-wider mb-3">
                  Current Task
                </h3>
                <h4 className="text-lg font-medium text-white/90 mb-2">
                  {taskDetails.title}
                </h4>
                <p className="text-sm text-white/60 mb-4">
                  {taskDetails.description}
                </p>
                <div className="font-mono text-xs bg-black/30 p-4 rounded border border-white/10 mb-4 relative overflow-hidden w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00EFA6]/5 to-transparent opacity-10" />
                  <pre className="text-white/80 whitespace-pre-wrap relative">
                    {taskDetails.code}
                  </pre>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(taskDetails.example_output).map(
                    ([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay:
                            0.6 +
                            Object.keys(taskDetails.example_output).indexOf(
                              key
                            ) *
                              0.1,
                        }}
                        className="bg-black/20 p-3 rounded relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00EFA6]/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <div className="text-[10px] uppercase tracking-wider text-[#00EFA6]/70 mb-1">
                          {key}
                        </div>
                        <div className="font-mono text-xs text-white/80">
                          {value}
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Network Visualization */}
          <div className="relative min-h-[500px]">
            <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent opacity-20" />
            <div className="absolute inset-0 opacity-8">
              <GridPattern />
            </div>

            {/* Updated decorative elements with new positions */}
            <motion.div
              className="absolute top-10 left-10 w-48 h-48 border border-white/8"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.08, 0.15, 0.08],
                rotate: 45,
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="absolute bottom-20 right-20 w-32 h-32 border border-white/8 rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.08, 0.15, 0.08],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <div className="relative h-full">
              <svg
                width="100%"
                height="500"
                viewBox="0 0 500 300"
                className="max-w-full"
              >
                {/* Enhanced grid system */}
                <g opacity="0.04">
                  <line
                    x1="0"
                    y1="150"
                    x2="500"
                    y2="150"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <line
                    x1="250"
                    y1="0"
                    x2="250"
                    y2="300"
                    stroke="white"
                    strokeWidth="1"
                  />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <React.Fragment key={i}>
                      <line
                        x1={100 * (i + 1)}
                        y1="0"
                        x2={100 * (i + 1)}
                        y2="300"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                      <line
                        x1="0"
                        y1={75 * (i + 1)}
                        x2="500"
                        y2={75 * (i + 1)}
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </React.Fragment>
                  ))}
                </g>

                {/* Connections with smoother animations */}
                {!isInitialLoad && (
                  <>
                    {steps.map((step, i) => {
                      if (i < steps.length - 1) {
                        return (
                          <Connection
                            key={i}
                            x1={step.position.x}
                            y1={step.position.y}
                            x2={steps[i + 1].position.x}
                            y2={steps[i + 1].position.y}
                            delay={i * 0.15}
                            isActive={i === activeStep}
                          />
                        );
                      }
                      return null;
                    })}
                    <Connection
                      x1={steps[steps.length - 1].position.x}
                      y1={steps[steps.length - 1].position.y}
                      x2={steps[0].position.x}
                      y2={steps[0].position.y}
                      delay={(steps.length - 1) * 0.15}
                      isActive={activeStep === steps.length - 1}
                    />
                  </>
                )}

                {/* Enhanced nodes with stable animations */}
                {!isInitialLoad &&
                  steps.map((step, i) => (
                    <Node
                      key={i}
                      x={step.position.x}
                      y={step.position.y}
                      size={20}
                      delay={i * 0.15}
                      duration={2}
                      color="#00EFA6"
                      icon={step.icon}
                      label={step.label}
                      isActive={i === activeStep}
                      isCore={true}
                    />
                  ))}
              </svg>
            </div>

            {/* Step counter with enhanced styling */}
            <motion.div
              className="absolute top-4 left-4 px-6 py-4 bg-black/40 border border-[#00EFA6]/20 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              <div className="text-[10px] uppercase tracking-wider text-[#00EFA6]/70 font-medium">
                Step
              </div>
              <motion.div
                className="text-3xl text-white/90 font-mono tabular-nums"
                key={activeStep}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {(activeStep + 1).toString().padStart(2, "0")}/06
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

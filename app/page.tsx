"use client";

import { BackgroundPattern } from "./components/ui/BackgroundPattern";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { ExecutionFlowSection } from "./components/sections/ExecutionFlowSection";
import { TechnologySection } from "./components/sections/TechnologySection";
// import { CtaSection } from "./components/sections/CtaSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { SecuritySection } from "./components/sections/SecuritySection";
import { RoadmapSection } from "./components/sections/RoadmapSection";
// import { ResourcesSection } from "./components/sections/ResourcesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundPattern />
      <Header />
      <HeroSection />
      <ExecutionFlowSection />
      <FeaturesSection />
      <TechnologySection />
      <SecuritySection />
      <RoadmapSection />
      {/* <ResourcesSection /> */}
      {/* <CtaSection /> */}
      <Footer />
    </main>
  );
}

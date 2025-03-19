"use client";

import { BackgroundPattern } from "./components/ui/BackgroundPattern";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { TechnologySection } from "./components/sections/TechnologySection";
import { CtaSection } from "./components/sections/CtaSection";
import { Metadata } from "next";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundPattern />
      <Header />
      <HeroSection />
      <TechnologySection />
      <CtaSection />
      <Footer />
    </main>
  );
}

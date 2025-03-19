"use client";

import { BackgroundPattern } from "../components/ui/BackgroundPattern";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { GetStartedContent } from "../components/sections/GetStartedContent";

export default function GetStarted() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundPattern />
      <Header />
      <GetStartedContent />
      <Footer />
    </main>
  );
}

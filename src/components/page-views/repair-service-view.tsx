"use client";

import { RepairHeroSection } from "@/components/sections/services/repair/repair-hero-section";
import { RepairProcessSection } from "@/components/sections/services/repair/repair-process-section";
import { RepairFeaturesSection } from "@/components/sections/services/repair/repair-features-section";
import { RepairTestimonialsSection } from "@/components/sections/services/repair/repair-testimonials-section";
import { RepairCTASection } from "@/components/sections/services/repair/repair-cta-section";

export function RepairServiceView() {
  return (
    <main className="mx-auto max-w-screen-xl">
      <RepairHeroSection />
      <RepairProcessSection />
      <RepairFeaturesSection />
      <RepairTestimonialsSection /> 
      <RepairCTASection />
    </main>
  );
}
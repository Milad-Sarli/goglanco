"use client";

import { CleaningHeroSection } from "@/components/sections/services/cleaning/cleaning-hero-section";
import { CleaningProcessSection } from "@/components/sections/services/cleaning/cleaning-process-section";
import { CleaningFeaturesSection } from "@/components/sections/services/cleaning/cleaning-features-section";
import { CleaningTestimonialsSection } from "@/components/sections/services/cleaning/cleaning-testimonials-section";
import { CleaningCTASection } from "@/components/sections/services/cleaning/cleaning-cta-section";

export function CleaningServiceView() {
  return (
    <main className="mx-auto max-w-screen-xl">
      <CleaningHeroSection /> 
      <CleaningProcessSection />
      <CleaningFeaturesSection />
      <CleaningTestimonialsSection />
      <CleaningCTASection />
    </main>
  );
}
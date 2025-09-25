"use client";

import { CustomHeroSection } from "@/components/sections/services/custom/custom-hero-section";
import { CustomProcessSection } from "@/components/sections/services/custom/custom-process-section";
import { CustomFeaturesSection } from "@/components/sections/services/custom/custom-features-section";
import { CustomTestimonialsSection } from "@/components/sections/services/custom/custom-testimonials-section";
import { CustomCtaSection } from "@/components/sections/services/custom/custom-cta-section";

export function CustomPageView() {
  return (
    <main className="mx-auto max-w-screen-xl">
      <CustomHeroSection /> 
      <CustomProcessSection />
      <CustomFeaturesSection />
      <CustomTestimonialsSection /> 
      <CustomCtaSection />
    </main>
  );
}
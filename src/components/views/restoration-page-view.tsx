import { RestorationHeroSection } from "@/components/sections/services/restoration/restoration-hero-section";
import { RestorationProcessSection } from "@/components/sections/services/restoration/restoration-process-section";
import { RestorationFeaturesSection } from "@/components/sections/services/restoration/restoration-features-section";
import { RestorationTestimonialsSection } from "@/components/sections/services/restoration/restoration-testimonials-section";
import { RestorationCtaSection } from "@/components/sections/services/restoration/restoration-cta-section";

export function RestorationPageView() {
  return (
    <main className="mx-auto max-w-screen-xl">
      <RestorationHeroSection />
      <RestorationProcessSection />
      <RestorationFeaturesSection />
      <RestorationTestimonialsSection />
      <RestorationCtaSection />
    </main>
  );
}
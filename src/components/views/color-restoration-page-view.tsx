import { ColorHeroSection } from "@/components/sections/services/color-restoration/color-hero-section";
import { ColorProcessSection } from "@/components/sections/services/color-restoration/color-process-section";
import { ColorFeaturesSection } from "@/components/sections/services/color-restoration/color-features-section";
import { ColorTestimonialsSection } from "@/components/sections/services/color-restoration/color-testimonials-section";
import { ColorCtaSection } from "@/components/sections/services/color-restoration/color-cta-section";

export function ColorRestorationPageView() {
  return (
    <main className="mx-auto max-w-screen-xl">
      <ColorHeroSection />
      <ColorProcessSection />
      <ColorFeaturesSection />
      <ColorTestimonialsSection /> 
      <ColorCtaSection />
    </main>
  );
}
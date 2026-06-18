import { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Home",
  description: "Expert rug repair, cleaning, and restoration services. Specialized in oriental rugs, Persian carpets, and all types of textile restoration.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Goglanco | Professional Rug Repair & Restoration Services",
    description: "Expert rug repair and restoration services for all types of rugs and carpets.",
    images: ["/og-image.svg"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
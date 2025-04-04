import { Metadata } from "next";
import { AboutHeroSection } from "@/components/sections/about/about-hero-section";
import { AboutStorySection } from "@/components/sections/about/about-story-section";
import { AboutTeamSection } from "@/components/sections/about/about-team-section";
import { AboutValuesSection } from "@/components/sections/about/about-values-section";
import { AboutTimelineSection } from "@/components/sections/about/about-timeline-section";

export const metadata: Metadata = {
  title: "About Us | Goglanco.com",
  description: "Learn about our journey, our team, and our commitment to excellence in rug repair and restoration services.",
  keywords: "rug repair company, carpet restoration experts, about us, rug repair history",
  openGraph: {
    title: "About Us | Goglanco.com",
    description: "Discover our story and expertise in rug repair and restoration services.",
    images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHeroSection />
      <AboutStorySection />
      <AboutValuesSection />
      <AboutTimelineSection />
      <AboutTeamSection />
    </main>
  );
} 
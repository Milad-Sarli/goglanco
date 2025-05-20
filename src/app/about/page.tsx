import { Metadata } from "next";
import { AboutHeroSection } from "@/components/sections/about/about-hero-section";
import { AboutValuesSection } from "@/components/sections/about/about-values-section";
import { aboutService } from "@/services/aboutService";

export const metadata: Metadata = {
  title: "About Us - Expert Rug Repair & Restoration | Goglanco.com",
  description: "Discover our legacy of excellence in rug repair and restoration. Meet our expert team and learn about our journey in preserving the beauty of fine rugs.",
  keywords: "rug repair experts, carpet restoration specialists, about Goglanco, professional rug repair team, rug restoration history",
  openGraph: {
    title: "About Us - Expert Rug Repair & Restoration | Goglanco.com",
    description: "Discover our legacy of excellence in rug repair and restoration. Meet our expert team and learn about our journey in preserving the beauty of fine rugs.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
        width: 1200,
        height: 630,
        alt: "Goglanco Rug Repair and Restoration Team"
      }
    ],
    type: "website",
  },
};

async function getAboutData() {
  try {
    return await aboutService.getAboutData();
  } catch (error) {
    console.error('Failed to fetch about page data:', error);
    // Return default data structure with empty values
    return {
      hero: {
        title: '',
        subtitle: '',
        image: ''
      },
      story: { items: [] },
      values: [],
      timeline: [],
      team: []
    };
  }
}

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <main className="min-h-screen bg-background">
      <AboutHeroSection 
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        image={data.hero.image}
      />
      {/* <AboutStorySection items={data.story.items} /> */}
      <AboutValuesSection values={data.values} />
      {/* <AboutTimelineSection timeline={data.timeline} /> */}
      {/* <AboutTeamSection team={data.team} /> */}
    </main>
  );
} 
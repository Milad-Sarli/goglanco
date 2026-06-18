import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { AboutHeroSection } from "@/components/sections/about/about-hero-section";
import { AboutValuesSection } from "@/components/sections/about/about-values-section";
import { aboutService } from "@/services/aboutService";

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover our legacy of excellence in rug repair and restoration. Meet our expert team and learn about our journey in preserving the beauty of fine rugs.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Goglanco",
    description: "Discover our legacy of excellence in rug repair and restoration. Meet our expert team and learn about our journey in preserving the beauty of fine rugs.",
    images: [
      {
        url: "/og-about.svg",
        width: 1200,
        height: 630,
        alt: "Goglanco Rug Repair and Restoration Team"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Goglanco",
    description: "Discover our legacy of excellence in rug repair and restoration.",
    images: ["/og-about.svg"],
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
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://goglanco.com" },
        { name: "About Us", url: "https://goglanco.com/about" },
      ]} />
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
    </>
  );
} 
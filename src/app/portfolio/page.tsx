import { Metadata } from "next";
import { PortfolioHeroSection } from "@/components/sections/portfolio/portfolio-hero-section";
import { PortfolioGallerySection } from "@/components/sections/portfolio/portfolio-gallery-section";
import { PortfolioCategoriesSection } from "@/components/sections/portfolio/portfolio-categories-section";
import { PortfolioTestimonialsSection } from "@/components/sections/portfolio/portfolio-testimonials-section";
import { PortfolioCTASection } from "@/components/sections/portfolio/portfolio-cta-section";

export const metadata: Metadata = {
  title: "Portfolio | Goglanco.com | Rug Restoration Projects",
  description: "Explore our portfolio of rug restoration projects. See before and after transformations of oriental rugs, Persian carpets, and textile restoration work.",
  keywords: "rug restoration portfolio, carpet repair examples, oriental rug restoration, Persian carpet repair, textile restoration projects",
  openGraph: {
    title: "Portfolio | Goglanco.com | Rug Restoration Projects",
    description: "Explore our portfolio of rug restoration projects. See before and after transformations of oriental rugs, Persian carpets, and textile restoration work.",
    images: ["/og-portfolio.jpg"],
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <PortfolioHeroSection />
      <PortfolioCategoriesSection />
      <PortfolioGallerySection />
      <PortfolioTestimonialsSection />
      <PortfolioCTASection />
    </main>
  );
} 
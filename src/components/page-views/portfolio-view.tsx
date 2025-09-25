"use client";

import { useState } from "react";
import { PortfolioHeroSection } from "@/components/sections/portfolio/portfolio-hero-section";
// import { PortfolioGallerySection } from "@/components/sections/portfolio/portfolio-gallery-section"; // Remove this import
import { PortfolioCategoriesSection } from "@/components/sections/portfolio/portfolio-categories-section";
import { PortfolioTestimonialsSection } from "../sections/portfolio/portfolio-testimonials-section";
import { PortfolioCTASection } from "../sections/portfolio/portfolio-cta-section";
import { PortfolioGallerySection } from "../sections/portfolio/portfolio-gallery-section";
// import { PortfolioTestimonialsSection } from "@/components/sections/portfolio/portfolio-testimonials-section";
// import { PortfolioCTASection } from "@/components/sections/portfolio/portfolio-cta-section";

export function PortfolioView() {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Removed scroll to gallery logic
  };

  return (
    <main className="min-h-screen">
      <PortfolioHeroSection />
      <PortfolioCategoriesSection 
        onCategoryChange={handleCategoryChange} 
        initialCategory={activeCategory} 
      />
      <div id="portfolio-gallery">
        <PortfolioGallerySection />
      </div>
      <PortfolioTestimonialsSection />
      <PortfolioCTASection />
    </main>
  );
}
"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layouts/admin-layout";
import { PortfolioAdminHero } from "@/components/admin/portfolio/portfolio-admin-hero";
import { PortfolioAdminCategories } from "@/components/admin/portfolio/portfolio-admin-categories";
import { PortfolioAdminGallery } from "@/components/admin/portfolio/portfolio-admin-gallery";
import { PortfolioAdminTestimonials } from "@/components/admin/portfolio/portfolio-admin-testimonials";
import { PortfolioAdminCTA } from "@/components/admin/portfolio/portfolio-admin-cta";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "@/lib/axios";
import { motion } from "framer-motion";

// Fallback data for preview
const fallbackData = {
  hero: {
    title: "Portfolio Management",
    subtitle: "Showcase Your Best Work",
    description: "Manage and organize your portfolio content easily.",
  },
  categories: [
    { id: 1, name: "Rug Restoration", description: "Complete rug restoration services" },
    { id: 2, name: "Carpet Repair", description: "Professional carpet repair work" },
    { id: 3, name: "Textile Care", description: "Specialized textile care services" },
  ],
  gallery: [
    { id: 1, title: "Persian Rug Restoration", image: "/sample/persian-rug-1.jpg", category: "Rug Restoration" },
    { id: 2, title: "Antique Carpet Repair", image: "/sample/antique-carpet-1.jpg", category: "Carpet Repair" },
  ],
  testimonials: [
    { id: 1, name: "John Doe", text: "Excellent restoration work!", rating: 5 },
    { id: 2, name: "Jane Smith", text: "Professional and detailed service", rating: 5 },
  ],
  cta: {
    title: "Ready to Start Your Project?",
    description: "Contact us today for professional rug restoration services",
    buttonText: "Contact Now",
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function PortfolioAdminPage() {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hero, categories, gallery, testimonials, cta] = await Promise.all([
          axios.get("/api/portfolio/hero"),
          axios.get("/api/portfolio/categories"),
          axios.get("/api/portfolio/gallery"),
          axios.get("/api/portfolio/testimonials"),
          axios.get("/api/portfolio/cta"),
        ]);

        setData({
          hero: hero.data.data || fallbackData.hero,
          categories: categories.data.data || fallbackData.categories,
          gallery: gallery.data.data || fallbackData.gallery,
          testimonials: testimonials.data.data || fallbackData.testimonials,
          cta: cta.data.data || fallbackData.cta,
        });
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch data"));
        // Use fallback data if API fails
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AdminLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold mb-6"
        >
          Portfolio Management
        </motion.h1>
        
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid grid-cols-5 gap-4 w-full">
            <TabsTrigger value="hero" className="text-sm md:text-base">
              Hero
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-sm md:text-base">
              Categories
            </TabsTrigger>
            <TabsTrigger value="gallery" className="text-sm md:text-base">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="text-sm md:text-base">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="cta" className="text-sm md:text-base">
              CTA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="mt-6">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <PortfolioAdminHero data={data.hero} />
            </motion.div>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <PortfolioAdminCategories data={data.categories} />
            </motion.div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <PortfolioAdminGallery data={data.gallery} />
            </motion.div>
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <PortfolioAdminTestimonials data={data.testimonials} />
            </motion.div>
          </TabsContent>

          <TabsContent value="cta" className="mt-6">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              <PortfolioAdminCTA data={data.cta} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminLayout>
  );
} 
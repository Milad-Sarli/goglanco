"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Portfolio categories data
const categories = [
  { id: "all", label: "All Projects" },
  { id: "oriental", label: "Oriental Rugs" },
  { id: "persian", label: "Persian Carpets" },
  { id: "modern", label: "Modern Rugs" },
  { id: "antique", label: "Antique Rugs" },
  { id: "repair", label: "Repair Projects" },
];

// Sample portfolio items (in a real app, this would come from a database or API)
const portfolioItems = [
  {
    id: 1,
    title: "Persian Tabriz Restoration",
    category: "persian",
    tags: ["restoration", "color repair", "fringe repair"],
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Complete restoration of a 19th century Persian Tabriz rug with extensive color repair and fringe restoration."
  },
  {
    id: 2,
    title: "Oriental Silk Rug Repair",
    category: "oriental",
    tags: ["repair", "silk", "delicate"],
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Delicate repair of a damaged silk Oriental rug, preserving its intricate patterns and vibrant colors."
  },
  {
    id: 3,
    title: "Modern Abstract Rug Cleaning",
    category: "modern",
    tags: ["cleaning", "stain removal", "modern"],
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Deep cleaning and stain removal from a modern abstract rug, restoring its original vibrancy."
  },
  {
    id: 4,
    title: "Antique Turkish Kilim Restoration",
    category: "antique",
    tags: ["antique", "kilim", "structural repair"],
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Structural repair and restoration of an antique Turkish Kilim, preserving its historical value."
  },
  {
    id: 5,
    title: "Persian Heriz Repair",
    category: "persian",
    tags: ["repair", "heriz", "color restoration"],
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Color restoration and repair of a damaged Persian Heriz rug, bringing back its original beauty."
  },
  {
    id: 6,
    title: "Modern Geometric Rug Repair",
    category: "modern",
    tags: ["repair", "geometric", "modern"],
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Repair of a modern geometric rug with pattern matching and seamless integration."
  },
];

export function PortfolioCategoriesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Filter portfolio items based on active category
  const filteredItems = activeCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate tabs
      gsap.fromTo(
        tabsRef.current,
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Explore Our <span className="text-primary">Portfolio</span>
        </h2>
        
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Browse our collection of restoration projects by category. Each project represents our commitment to excellence in rug restoration.
        </p>
        
        <div 
          ref={tabsRef}
          className="max-w-4xl mx-auto"
        >
          <Tabs 
            defaultValue="all" 
            className="w-full"
            onValueChange={setActiveCategory}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-0">
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden group">
                          <Image
                          fill
                            src={item.beforeImage}
                            alt={`Before: ${item.title}`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white font-medium">Before</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
} 
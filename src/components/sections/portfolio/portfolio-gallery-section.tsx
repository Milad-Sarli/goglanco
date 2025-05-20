"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/motion-primitives/image-comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

// Define an interface for Gallery Item data
interface PortfolioGalleryItem {
  id: number | string;
  title: string;
  category: string;
  before_image: string;
  after_image: string;
}

// Default gallery items as a fallback
const defaultGalleryItems: PortfolioGalleryItem[] = [
  {
    id: 1,
    title: "Persian Tabriz Restoration - Default",
    category: "persian",
    before_image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    after_image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
  },
  {
    id: 2,
    title: "Oriental Silk Rug Repair - Default",
    category: "oriental",
    before_image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    after_image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
  }
];

export function PortfolioGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [allItems, setAllItems] = useState<PortfolioGalleryItem[]>(defaultGalleryItems);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGalleryItems() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/gallery`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        const data: PortfolioGalleryItem[] = responseData.data;
        setAllItems(data);
      } catch (e: unknown) {
        console.error("Failed to fetch gallery items:", e);
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred while fetching gallery items.");
        }
        setAllItems(defaultGalleryItems); // Fallback to default
      }
    }
    fetchGalleryItems();
  }, []);

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

      // Animate gallery items with stagger effect
      const galleryElements = galleryRef.current?.querySelectorAll(".gallery-item-motion"); 
      if (galleryElements && galleryElements.length > 0) {
        gsap.fromTo(
          galleryElements,
          { 
            y: 100, 
            opacity: 0,
            scale: 0.9
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Before & <span className="text-primary">After</span> Gallery
        </h2>
        
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          See the transformative power of our restoration services. Each project represents our commitment to excellence in rug restoration.
        </p>
        {error && <p className="text-red-500 text-center mb-4">Error loading gallery: {error}. Displaying default items.</p>}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {allItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="gallery-item-motion bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <div className="relative h-[400px]">
                  <ImageComparison className="h-full" enableHover>
                    <ImageComparisonImage 
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${item.before_image}`} 
                      alt={`Before: ${item.title}`} 
                      position="left" 
                    />
                    <ImageComparisonImage 
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${item.after_image}`} 
                      alt={`After: ${item.title}`} 
                      position="right" 
                    />
                    <ImageComparisonSlider className="bg-white">
                      <div className="absolute inset-y-0 -left-3 -right-3 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </ImageComparisonSlider>
                  </ImageComparison>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Project Details
                  </Button>
                </div>
              </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg font-semibold px-8 py-6">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
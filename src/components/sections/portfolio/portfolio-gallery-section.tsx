"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "@/components/motion-primitives/image-comparison";
import { Tilt } from "@/components/motion-primitives/tilt";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

// Sample gallery items with before/after images
const galleryItems = [
  {
    id: 1,
    title: "Persian Tabriz Restoration",
    category: "Persian",
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Complete restoration of a 19th century Persian Tabriz rug with extensive color repair and fringe restoration.",
    tags: ["restoration", "color repair", "fringe repair"]
  },
  {
    id: 2,
    title: "Oriental Silk Rug Repair",
    category: "Oriental",
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Delicate repair of a damaged silk Oriental rug, preserving its intricate patterns and vibrant colors.",
    tags: ["repair", "silk", "delicate"]
  },
  {
    id: 3,
    title: "Modern Abstract Rug Cleaning",
    category: "Modern",
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Deep cleaning and stain removal from a modern abstract rug, restoring its original vibrancy.",
    tags: ["cleaning", "stain removal", "modern"]
  },
  {
    id: 4,
    title: "Antique Turkish Kilim Restoration",
    category: "Antique",
    beforeImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    afterImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000",
    description: "Structural repair and restoration of an antique Turkish Kilim, preserving its historical value.",
    tags: ["antique", "kilim", "structural repair"]
  }
];

export function PortfolioGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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
      const galleryItems = galleryRef.current?.querySelectorAll(".gallery-item");
      if (galleryItems) {
        gsap.fromTo(
          galleryItems,
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
        
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {galleryItems.map((item, index) => (
            <Tilt key={item.id} className="gallery-item">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-[400px]">
                  <ImageComparison className="h-full" enableHover>
                    <ImageComparisonImage 
                      src={item.beforeImage} 
                      alt={`Before: ${item.title}`} 
                      position="left" 
                    />
                    <ImageComparisonImage 
                      src={item.afterImage} 
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
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    View Project Details
                  </Button>
                </div>
              </motion.div>
            </Tilt>
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
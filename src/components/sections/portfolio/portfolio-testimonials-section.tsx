"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Define an interface for Testimonial data
interface Testimonial {
  id: number | string;
  name: string;
  role: string;
  avatar?: string; // Optional, as API might not always provide it
  content: string;
  rating: number;
  project?: string; // Optional
}

// Sample testimonials data (fallback)
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson - Default",
    role: "Homeowner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000",
    content: "The restoration of our family&apos;s Persian rug was nothing short of miraculous. The team at Goglanco brought back the vibrant colors and intricate patterns that had faded over decades. We couldn't be happier with the results!",
    rating: 5,
    project: "Persian Tabriz Restoration"
  },
  {
    id: 2,
    name: "Michael Chen - Default",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
    content: "As an interior designer, I&apos;ve worked with many rug restoration services, but Goglanco stands out for their attention to detail and commitment to preserving the original character of each piece. Their work is consistently exceptional.",
    rating: 5,
    project: "Oriental Silk Rug Repair"
  },
  // Add more default items if needed, or keep it short for brevity
];

export function PortfolioTestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/testimonials`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Testimonial[] = await response.json();
        setTestimonials(data.length > 0 ? data : defaultTestimonials);
      } catch (e: unknown) {
        console.error("Failed to fetch testimonials:", e);
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred while fetching testimonials.");
        }
        setTestimonials(defaultTestimonials); // Fallback to default
      }
    }

    fetchTestimonials();

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

      // Animate testimonials with stagger effect
      const testimonialCards = testimonialsRef.current?.querySelectorAll(".testimonial-card");
      if (testimonialCards) {
        gsap.fromTo(
          testimonialCards,
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
              trigger: testimonialsRef.current,
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
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Client <span className="text-primary">Testimonials</span>
        </h2>
        
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          Hear what our clients have to say about their experience with our restoration services.
        </p>
        
        {error && <p className="text-red-500 text-center mb-4">Error loading testimonials: {error}. Displaying default testimonials.</p>}
        
        <div 
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
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
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-primary mt-1">{testimonial.project}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
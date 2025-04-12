"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";

gsap.registerPlugin(ScrollTrigger);

interface StoryItem {
  title: string;
  year: string;
  content: string;
}

interface AboutStorySectionProps {
  items: StoryItem[];
}

export function AboutStorySection({ items = [] }: AboutStorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the image
      gsap.to(imageRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Animate story cards
      const cards = contentRef.current?.querySelectorAll('.story-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              x: index % 2 === 0 ? -50 : 50,
              opacity: 0,
              scale: 0.9
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 bg-background overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 opacity-10">
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1000"
            alt="Rug patterns background"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <TextShimmerWave>Our Journey Through Time</TextShimmerWave>
          </h2>

          <div ref={contentRef} className="space-y-16">
            {items.map((item, index) => (
              <div 
                key={index}
                className="story-card bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="text-4xl font-bold text-primary">{item.year}</div>
                    <div className="text-xl font-semibold mt-2">{item.title}</div>
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg text-muted-foreground">{item.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { TextRoll } from "@/components/motion-primitives/text-roll";

gsap.registerPlugin(ScrollTrigger);
 
export function CleaningProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    {
      title: "Inspection",
      description: "We thoroughly examine your rug to identify stains, soiling, and determine the appropriate cleaning method."
    },
    { 
      title: "Dusting",
      description: "We remove embedded dirt and dust particles using specialized equipment to prepare for deep cleaning."
    },
    {
      title: "Deep Cleaning",
      description: "Using eco-friendly cleaning solutions, we gently but thoroughly clean your rug to remove stains and odors."
    },
    {
      title: "Drying & Finishing",
      description: "We ensure complete drying in a controlled environment and perform final grooming to restore your rug's appearance."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards
      const cards = gsap.utils.toArray(".process-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 30 
          },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            delay: 0.2 * index,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cleaning-process" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <BoxReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <TextRoll>Cleaning Process</TextRoll>
            </h2>
          </BoxReveal>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We follow a meticulous process to ensure your rug is thoroughly cleaned while preserving its integrity.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="process-card border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
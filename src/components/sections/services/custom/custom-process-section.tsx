"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { TextRoll } from "@/components/motion-primitives/text-roll";

gsap.registerPlugin(ScrollTrigger);

export function CustomProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const processSteps = [
    {
      title: "Consultation",
      description: "We discuss your specific needs, preferences, and requirements to understand your vision.",
    },
    {
      title: "Design & Planning",
      description: "Our experts create a detailed plan and design based on your requirements and specifications.",
    },
    {
      title: "Custom Creation",
      description: "We carefully craft your custom rug using premium materials and expert techniques.",
    },
    {
      title: "Final Delivery",
      description: "Your custom rug is delivered and installed, ensuring complete satisfaction.",
    },
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
    <section ref={sectionRef} id="custom-process" className="py-16 bg-muted/50 p-4">
      <div className="container">
        <div className="text-center mb-12">
          <BoxReveal>
            <h2 className="text-3xl font-bold mb-4">
              Our <TextRoll>Custom Process</TextRoll>
            </h2>
          </BoxReveal>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We follow a collaborative process to ensure your custom rug meets your exact specifications and exceeds your expectations.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <Card key={index} className="process-card border-none shadow-md">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">{index + 1}</span>
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
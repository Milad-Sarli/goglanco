"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

export function RepairProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const steps = [ 
    {
      title: "Assessment",
      description: "We carefully examine your rug to identify damage, wear patterns, and structural issues that need attention."
    },
    {
      title: "Custom Plan",
      description: "Our experts develop a tailored repair plan specific to your rug's condition, materials, and construction."
    },
    {
      title: "Restoration",
      description: "Using traditional techniques and premium materials, we meticulously repair and restore your rug's beauty."
    },
    {
      title: "Final Inspection",
      description: "We thoroughly inspect the completed work to ensure the highest quality standards have been met."
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
    <section ref={sectionRef} id="repair-process" className="py-20 bg-muted/50 p-4">
      <div className="container">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Repair Process
            </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We follow a meticulous process to ensure your rug is restored to its original beauty and integrity.
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
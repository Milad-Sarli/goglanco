"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

export function ColorProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".process-card");
      
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0,
            y: 50 
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const processSteps = [
    {
      number: "01",
      title: "Assessment",
      description: "We carefully examine your rug to identify color fading issues and determine the best restoration approach."
    },
    {
      number: "02",
      title: "Cleaning",
      description: "A thorough cleaning process removes dirt and prepares the rug for the color restoration treatment."
    },
    {
      number: "03",
      title: "Color Restoration",
      description: "Using specialized dyes and techniques, we carefully restore the original colors of your rug."
    },
    {
      number: "04",
      title: "Finishing",
      description: "Final treatments are applied to set the colors and protect your rug for long-lasting results."
    }
  ];

  return (
    <section ref={sectionRef} id="process" className="py-16 bg-muted/30 p-4">
      <div className="container">
        <div className="text-center mb-12">
          <BoxReveal>
            <h2 className="text-3xl font-bold mb-4">
              <TextRoll>Our Color Restoration Process</TextRoll>
            </h2>
          </BoxReveal>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We follow a meticulous process to ensure your rug's colors are restored to their original vibrant state.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <div key={index} className="process-card bg-background p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-primary/20 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function RestorationProcessSection() {
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
      title: "Inspection",
      description: "We thoroughly examine your rug to identify damage and determine the best restoration approach."
    },
    {
      number: "02",
      title: "Cleaning",
      description: "A deep cleaning process removes dirt and prepares the rug for restoration work."
    },
    {
      number: "03",
      title: "Restoration",
      description: "Using traditional techniques, we carefully restore damaged areas of your rug."
    },
    {
      number: "04",
      title: "Finishing",
      description: "Final treatments are applied to protect your rug and ensure long-lasting results."
    }
  ];

  return (
    <section ref={sectionRef} id="process" className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mx-auto mb-12 p-4">
            <h2 className="text-3xl text-center mx-auto font-bold mb-4 flex justify-center items-center">
              Our Restoration Process
            </h2> 
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We follow a meticulous process to ensure your rug is restored to its original beauty and integrity.
          </p>
        </div> 

        <div ref={cardsRef} className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
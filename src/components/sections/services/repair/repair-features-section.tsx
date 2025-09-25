"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { TextRoll } from "@/components/motion-primitives/text-roll";

gsap.registerPlugin(ScrollTrigger);

export function RepairFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);

  const features = [
    "Fringe repair and replacement",
    "Hole and tear restoration",
    "Color restoration and dyeing",
    "Reweaving damaged areas",
    "Edge binding and overcasting",
    "Structural reinforcement",
    "Moth damage repair",
    "Water damage restoration",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      ); 

      // Animate features
      const featureItems = gsap.utils.toArray(".feature-item");
      featureItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.4, 
            delay: 0.1 * index,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top bottom-=50",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <BoxReveal>
              <h2 className="text-3xl font-bold mb-6">
                <TextRoll>Specialized Repair</TextRoll> Services
              </h2>
            </BoxReveal>
            <p className="text-muted-foreground mb-8">
              Our expert artisans are skilled in a wide range of repair techniques to address any issue your valuable rugs may face. We combine traditional craftsmanship with modern methods to deliver exceptional results.
            </p>
            <ul ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {features.map((feature, index) => (
                <li key={index} className="feature-item flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div ref={imageRef} className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/rug-repair-cost.jpg"
              alt="Rug repair specialist at work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
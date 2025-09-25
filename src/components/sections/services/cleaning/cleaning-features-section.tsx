"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { TextRoll } from "@/components/motion-primitives/text-roll";

gsap.registerPlugin(ScrollTrigger);

export function CleaningFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    "Stain and spot removal",
    "Odor elimination",
    "Allergen reduction",
    "Pet stain treatment",
    "Color brightening",
    "Sanitization and disinfection"
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
    <section ref={sectionRef} className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/features/e1510230-60ed-47d2-9c8a-f420e6261080.jpg"
              alt="Deep cleaning process for rugs"
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <BoxReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <TextRoll>Comprehensive Cleaning</TextRoll> Services
              </h2>
            </BoxReveal>
            <p className="text-lg text-muted-foreground mb-8">
              Our deep cleaning process addresses all aspects of rug maintenance to ensure your rugs look beautiful and remain hygienic.
            </p>
            
            <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="feature-item flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
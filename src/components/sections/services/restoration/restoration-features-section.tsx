"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

export function RestorationFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => { 
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { 
          opacity: 0,
          x: -50 
        },
        { 
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Features animation
      const features = gsap.utils.toArray(".feature-item");
      
      features.forEach((feature, index) => {
        gsap.fromTo(
          feature,
          { 
            opacity: 0,
            y: 20 
          },
          { 
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 75%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Expert Restoration",
      description: "Our skilled artisans use traditional techniques to restore damaged areas of your rug."
    },
    {
      title: "Structural Repairs",
      description: "We repair holes, tears, fringe damage, and other structural issues with precision."
    },
    {
      title: "Material Matching",
      description: "We carefully match materials to ensure repairs blend seamlessly with your rug."
    },
    {
      title: "Preservation Focus",
      description: "Our restoration process preserves the character and value of your rug."
    }
  ];

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/restoration-features.jpg"
              alt="Rug restoration features"
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <div className="mb-6">
              <BoxReveal>
                <h2 className="text-3xl font-bold mb-4">
                  <TextRoll>Why Choose Our Restoration Service</TextRoll>
                </h2>
              </BoxReveal>
              <p className="text-muted-foreground">
                Our restoration service brings damaged rugs back to life using traditional techniques and premium materials.
              </p>
            </div>
            
            <div ref={featuresRef} className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
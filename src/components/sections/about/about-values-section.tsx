"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Shield, Award, Users } from "lucide-react";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";

gsap.registerPlugin(ScrollTrigger);

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

interface AboutValuesSectionProps {
  values: ValueItem[];
}

const iconMap = {
  heart: <Heart className="w-16 h-16 text-primary" />,
  shield: <Shield className="w-16 h-16 text-primary" />,
  award: <Award className="w-16 h-16 text-primary" />,
  users: <Users className="w-16 h-16 text-primary" />,
};

export function AboutValuesSection({ values = [] }: AboutValuesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

      // Animate value cards with stagger and scale effect
      const valueCards = valuesRef.current?.querySelectorAll(".value-card");
      if (valueCards) {
        gsap.fromTo(
          valueCards,
          { 
            y: 100, 
            opacity: 0,
            scale: 0.8
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Create a parallax effect for the background pattern
      gsap.to(".values-pattern", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="values-pattern absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Our Core <TextShimmerWave>Values</TextShimmerWave>
        </h2>
        
        <div 
          ref={valuesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => (
            <div 
              key={index}
              className="value-card group"
            >
              <div className="bg-card hover:bg-card/80 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="transform transition-transform duration-300 group-hover:scale-110">
                    {iconMap[value.icon as keyof typeof iconMap] || <Heart className="w-16 h-16 text-primary" />}
                  </div>
                  <h3 className="text-2xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
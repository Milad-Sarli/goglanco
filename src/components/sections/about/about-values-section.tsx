"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Shield, Award, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: <Heart className="w-12 h-12 text-primary" />,
    title: "Passion",
    description: "We approach each restoration project with genuine passion and dedication to preserving the beauty of fine rugs."
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Integrity",
    description: "Honesty and transparency guide our business practices, ensuring trust with every client interaction."
  },
  {
    icon: <Award className="w-12 h-12 text-primary" />,
    title: "Excellence",
    description: "We strive for excellence in every detail, from the initial assessment to the final delivery of restored pieces."
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: "Community",
    description: "We value our role in the community and actively support local artisans and cultural preservation efforts."
  }
];

export function AboutValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Super-charged sticky effect
      gsap.to(stickyContainerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

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

      // Animate value cards with stagger effect
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
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Create a parallax effect for the background
      gsap.to(".values-bg", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[150vh] bg-background overflow-hidden"
    >
      {/* Background with parallax effect */}
      <div className="values-bg absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0"></div>
      
      <div 
        ref={stickyContainerRef}
        className="container mx-auto px-4 py-20 relative z-10"
      >
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Our Core <span className="text-primary">Values</span>
        </h2>
        
        <div 
          ref={valuesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => (
            <div 
              key={index}
              className="value-card bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
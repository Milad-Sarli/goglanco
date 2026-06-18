"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function ContactHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation for the hero section
      gsap.fromTo(
        headingRef.current,
        { 
          y: 100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out" 
        }
      );

      gsap.fromTo(
        textRef.current,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.3, 
          ease: "power3.out" 
        }
      );

      gsap.fromTo(
        imageRef.current,
        { 
          scale: 0.8, 
          opacity: 0 
        },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.2, 
          delay: 0.5, 
          ease: "power3.out" 
        }
      );

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
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
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/80"
    >
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Get in <span className="text-primary">Touch</span> With Us
          </h1>
          <p 
            ref={textRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            Have a rug that needs restoration? We&apos;re here to help. Contact us today to discuss your project, request a quote, or schedule a consultation with our experts.
          </p>
        </div>
        <div 
          ref={imageRef}
          className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1000"
            alt="Contact our rug restoration experts"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
} 
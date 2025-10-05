"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { TextRoll } from "@/components/ui/text-roll";
import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/ui/box-reveal";

gsap.registerPlugin(ScrollTrigger);

interface AboutHeroSectionProps {
  title?: string;
  subtitle: string;
  image: string;
}

export function AboutHeroSection({ 
  title,
  subtitle = "For over two decades, we've been dedicated to preserving the artistry and value of fine rugs through expert restoration.",
  image = "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000"
}: AboutHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Animate stats with stagger
      const stats = statsRef.current?.querySelectorAll('.stat-item');
      if (stats) {
        gsap.fromTo(
          stats,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${image}`}
            alt="About us hero image"
            fill
            unoptimized
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <TextShimmerWave>
              <span className="hidden md:inline">Weaving Trust, Restoring Elegance</span>
              <span className="inline md:hidden">
                Weaving Trust,<br />Restoring Elegance
              </span>
            </TextShimmerWave>
          </h1>
          
          <div 
            ref={textRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            <TextRoll>
              {subtitle}
            </TextRoll>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <BoxReveal duration={0.5}>
              <Link href="/services">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg font-semibold px-8 py-6">
                  Our Services
                </Button>
              </Link>
            </BoxReveal>
            <BoxReveal duration={0.5} boxColor="#4338ca">
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 hover:bg-accent text-lg font-semibold px-8 py-6">
                  Contact Us
                </Button>
              </Link>
            </BoxReveal>
          </div>

          <div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto pt-16"
          >
            <div className="stat-item text-center">
              <div className="text-5xl font-bold text-primary mb-3">5K+</div>
              <div className="text-muted-foreground text-lg font-medium">Rugs Restored</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-5xl font-bold text-primary mb-3">30+</div>
              <div className="text-muted-foreground text-lg font-medium">Years Experience</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-5xl font-bold text-primary mb-3">100%</div>
              <div className="text-muted-foreground text-lg font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { TextRoll } from "@/components/motion-primitives/text-roll";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function CleaningHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );

      // Animate the text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4 }
      );

      // Animate the image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <BoxReveal>
              <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="text-muted-foreground">Our</span>{" "}
                <TextRoll>Deep Cleaning</TextRoll>{" "}
                <span className="block mt-2">Services</span>
              </h1>
            </BoxReveal>
            
            <p ref={textRef} className="text-xl mb-8 text-muted-foreground">
              Revitalize your rugs with our thorough deep cleaning process that removes dirt, stains, and allergens while preserving your rug's beauty.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Schedule a Cleaning</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#cleaning-process">Our Cleaning Method</Link>
              </Button>
            </div>
          </div>
          
          <div ref={imageRef} className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/features/standard-quality-control-collage_23-2149631009.jpg"
              alt="Professional rug cleaning process"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
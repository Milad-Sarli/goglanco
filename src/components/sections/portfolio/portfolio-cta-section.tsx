"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { TextShimmerWave } from "@/components/motion-primitives/text-shimmer-wave";
import { TextRoll } from "@/components/motion-primitives/text-roll";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

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

      // Animate text
      gsap.fromTo(
        textRef.current,
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate buttons
      gsap.fromTo(
        buttonsRef.current,
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to <TextShimmerWave className="text-primary">Restore</TextShimmerWave> Your Rug?
          </h2>
          
          <p 
            ref={textRef}
            className="text-lg md:text-xl text-muted-foreground mb-10"
          >
            <TextRoll>
              Contact us today for a free consultation and estimate. Our experts will assess your rug and provide a detailed restoration plan tailored to your needs.
            </TextRoll>
          </p>
          
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <BoxReveal duration={0.5}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg font-semibold px-8 py-6">
                Get Free Estimate
              </Button>
            </BoxReveal>
            <BoxReveal duration={0.5} boxColor="#4338ca">
              <Button size="lg" variant="outline" className="border-2 hover:bg-accent text-lg font-semibold px-8 py-6">
                Schedule Consultation
              </Button>
            </BoxReveal>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 text-sm text-muted-foreground"
          >
            <p>Or call us directly at <span className="font-semibold">(555) 123-4567</span></p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
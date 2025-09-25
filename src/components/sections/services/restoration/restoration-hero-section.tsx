"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

export function RestorationHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-4">
              <BoxReveal>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <TextRoll>Rug Restoration Services</TextRoll>
                </h1>
              </BoxReveal>
            </div>
            <TextRoll delay={0.3}>
              <p className="text-lg mb-6">
                Bringing new life to your damaged, worn, or faded rugs with our professional repair techniques and craftsmanship.
              </p>
            </TextRoll>
            <TextRoll delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#repair-process">Learn Our Process</Link>
                </Button>
              </div>
            </TextRoll>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/portfolio.jpg"
              alt="Rug Restoration Services"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
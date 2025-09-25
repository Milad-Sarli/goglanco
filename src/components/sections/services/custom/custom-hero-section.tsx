"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

export function CustomHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-4">
              <BoxReveal>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <TextRoll>Custom Rug Services</TextRoll>
                </h1>
              </BoxReveal>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg mb-6"
            >
              Tailored rug services designed to meet your specific needs and requirements. From custom sizing to unique designs, we bring your vision to life.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg">
                <Link href="/contact">Get a Quote</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#custom-process">Learn Our Process</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/features/happy-male-carrying-carpet-new-home_329181-12615.jpg"
              alt="Custom Rug Services"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
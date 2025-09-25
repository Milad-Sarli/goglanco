"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

export function ColorFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Expert Color Matching",
      description: "Our specialists precisely match your rug's original colors using specialized techniques."
    },
    {
      title: "Safe Dye Processes",
      description: "We use eco-friendly, colorfast dyes that won't fade or bleed over time."
    },
    {
      title: "Targeted Treatment",
      description: "We focus only on the faded areas, preserving the original character of your rug."
    },
    {
      title: "Long-lasting Results",
      description: "Our color restoration treatments are designed to maintain vibrancy for years to come."
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 p-4">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/portfolio.jpg"
              alt="Color restoration features"
              fill
              className="object-cover"
            />
          </motion.div>
          
          <div ref={featuresRef}>
            <div className="mb-6">
              <BoxReveal>
                <h2 className="text-3xl font-bold mb-4">
                  <TextRoll>Why Choose Our Color Restoration</TextRoll>
                </h2>
              </BoxReveal>
              <p className="text-muted-foreground">
                Our color restoration service brings back the vibrant beauty of your faded rugs using specialized techniques and premium materials.
              </p>
            </div>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2 * index,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="feature-item"
                >
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

export function ColorCtaSection() {
  return (
    <section className="py-16 bg-primary/5 p-4">
      <div className="container">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <BoxReveal>
            <h2 className="text-3xl font-bold mb-4">
              <TextRoll>Ready to Restore Your Rug's Colors?</TextRoll>
            </h2>
          </BoxReveal>
          <TextRoll delay={0.3}>
            <p className="text-muted-foreground mb-8">
              Contact us today to discuss your color restoration needs and bring back the vibrant beauty of your valuable rugs.
            </p>
          </TextRoll>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
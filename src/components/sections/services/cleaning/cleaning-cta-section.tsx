"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

export function CleaningCTASection() {
  return (
   <section className="py-16 bg-primary/5 p-4">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Deeper Clean?</h2>
          <p className="text-muted-foreground mb-8">
             Schedule your professional rug cleaning service today and experience the difference our expert care can make.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Book Now</Link>
          </Button>
        </div>
      </div> 
    </section>
  );
}
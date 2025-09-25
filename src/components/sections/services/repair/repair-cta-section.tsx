"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { TextRoll } from "@/components/animations/text-roll";
import { BoxReveal } from "@/components/animations/box-reveal";

export function RepairCTASection() {
  return ( 
   <section className="py-16 bg-primary/5 p-4">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Restore Your Valuable Rugs?</h2>
          <p className="text-muted-foreground mb-8">
             Contact us today for a free consultation and quote. Our expert team is ready to bring new life to your treasured rugs.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div> 
    </section>
  );
}
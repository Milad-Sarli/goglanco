"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextShimmerWave } from "@/components/motion-primitives/text-shimmer-wave";

export function CleaningCTASection() {
  return (
   <motion.section 
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     transition={{ duration: 0.8 }}
     viewport={{ once: true }}
     className="py-16 bg-primary/5 p-4"
   >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Ready for a <TextShimmerWave className="text-primary">Deeper Clean</TextShimmerWave>?
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-muted-foreground mb-8"
          >
             Schedule your professional rug cleaning service today and experience the difference our expert care can make.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button size="lg" asChild>
              <Link href="/contact">Book Now</Link>
            </Button>
          </motion.div>
        </div>
      </div> 
    </motion.section>
  );
}
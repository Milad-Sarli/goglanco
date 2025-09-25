"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RestorationCtaSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Restore Your Rug?</h2>
          <p className="text-muted-foreground mb-8">
            Contact us today to discuss your rug restoration needs and bring back the beauty of your valuable rugs.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button> 
        </div>
      </div>
    </section>
  );
}
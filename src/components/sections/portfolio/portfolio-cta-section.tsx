"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextShimmerWave } from "@/components/motion-primitives/text-shimmer-wave";
import { TextRoll } from "@/components/motion-primitives/text-roll";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Define an interface for CTA Section data
interface CTAData {
  title: string;
  description: string;
  buttonText: string;
}

export function PortfolioCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [ctaData, setCtaData] = useState<CTAData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCTAData() {
      try {
        const response = await axiosInstance.get<CTAData>("/api/portfolio/cta");
        setCtaData(response.data);
      } catch (e: unknown) {
        console.error("Failed to fetch CTA data:", e);
        let errorMessage = "An unknown error occurred while fetching CTA data.";
        if (e instanceof Error) {
          errorMessage = e.message;
        } else if (typeof e === "object" && e !== null && "message" in e) {
          errorMessage = (e as { message: string }).message;
        }
        setError(errorMessage);
        // Fallback to default static content if fetch fails
        setCtaData({
          title: "Ready to Restore Your Rug?",
          description: "Contact us today for a free consultation and estimate. Our experts will assess your rug and provide a detailed restoration plan tailored to your needs.",
          buttonText: "Get Free Estimate"
        });
      }
    }
    fetchCTAData();

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
    <motion.section 
      ref={sectionRef} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            ref={headingRef}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            {ctaData && ctaData.title ? (
              // If all fields are identical, use fallback
              ctaData.title === ctaData.description && ctaData.title === ctaData.buttonText ? (
                <>
                  Ready to <TextShimmerWave className="text-primary">Restore</TextShimmerWave> Your Rug?
                </>
              ) : (
                // If title contains 'Restore', shimmer that word
                ctaData.title.includes("Restore") ? (
                  <>
                    {ctaData.title.split("Restore")[0]}
                    <TextShimmerWave className="text-primary">Restore</TextShimmerWave>
                    {ctaData.title.split("Restore")[1]}
                  </>
                ) : (
                  <>{ctaData.title}</>
                )
              )
            ) : (
              <>
                Ready to <TextShimmerWave className="text-primary">Restore</TextShimmerWave> Your Rug?
              </>
            )}
          </motion.h2>
          
          <motion.p 
            ref={textRef}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground mb-10"
          >
            <TextRoll>
              {ctaData && ctaData.title === ctaData.description && ctaData.title === ctaData.buttonText
                ? "Contact us today for a free consultation and estimate. Our experts will assess your rug and provide a detailed restoration plan tailored to your needs."
                : ctaData?.description || "Contact us today for a free consultation and estimate. Our experts will assess your rug and provide a detailed restoration plan tailored to your needs."}
            </TextRoll>
          </motion.p>
          {error && <p className="text-red-500 text-center mb-4">Error: {error}. Displaying default content.</p>}
          <motion.div 
            ref={buttonsRef}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                asChild
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg font-semibold px-8 py-6"
              >
                <Link href="/contact">
                  {ctaData && ctaData.title === ctaData.description && ctaData.title === ctaData.buttonText
                    ? "Get Free Estimate"
                    : ctaData?.buttonText || "Get Free Estimate"}
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 text-sm text-muted-foreground"
          >
            {/* Phone number removed as per new data structure */}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
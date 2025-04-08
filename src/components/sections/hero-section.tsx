'use client';

import { TextShimmerWave } from "@/components/motion-primitives/text-shimmer-wave";
import { TextRoll } from "@/components/motion-primitives/text-roll";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import heroService, { HeroData } from "@/services/heroService";
import { Skeleton } from "@/components/ui/skeleton";

export function HeroSection() {
  const [isImageError, setIsImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await heroService.getHeroData();
        setHeroData(data);
      } catch (error) {
        console.error('Failed to load hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
        <div className="container relative z-10 mx-auto px-4 pt-16 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-20 w-3/4 mx-auto mb-8" />
            <Skeleton className="h-8 w-2/3 mx-auto mb-12" />
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
              <Skeleton className="h-14 w-40 mx-auto" />
              <Skeleton className="h-14 w-40 mx-auto" />
              <Skeleton className="h-14 w-40 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return null;
  }

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gray-900">
        <Image
          src={heroData.mainImage}
          alt="Beautiful Persian Rug"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover"
          priority
          unoptimized
          style={{ minHeight: '100vh' }}
          onError={() => setIsImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        <BlurFade className="absolute inset-0">
          <div className="w-full h-full" />
        </BlurFade>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 mx-auto px-4 pt-16 pb-24"
      >
        <div className="max-w-4xl mx-auto text-center">
          <TextShimmerWave className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            {heroData.title}
          </TextShimmerWave>
          <TextRoll className="text-xl md:text-2xl text-gray-100 mb-12 font-medium">
            {heroData.subtitle}
          </TextRoll>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <BoxReveal duration={0.5}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-lg font-semibold px-8 py-6">
                Get Free Estimate
              </Button>
            </BoxReveal>
            <BoxReveal duration={0.5} boxColor="#4338ca">
              <Button size="lg" variant="outline" className=" dark:text-white border-2 border-white dark:border-white hover:bg-white/10 dark:hover:bg-white/10 text-lg font-semibold px-8 py-6">
                Our Services
              </Button>
            </BoxReveal>
            <BoxReveal duration={0.5} boxColor="#312e81">
              <Button size="lg" variant="ghost" className="text-white dark:text-white hover:bg-white/10 dark:hover:bg-white/10 text-lg font-semibold px-8 py-6">
                View Portfolio
              </Button>
            </BoxReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-3">{heroData.stats.rugsRestored}+</div>
              <div className="text-gray-200 text-lg font-medium">Rugs Restored</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-3">{heroData.stats.yearsExperience}+</div>
              <div className="text-gray-200 text-lg font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-3">{heroData.stats.satisfactionRate}%</div>
              <div className="text-gray-200 text-lg font-medium">Satisfaction Rate</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <VelocityScroll className="text-white/90 py-6 text-lg font-medium bg-gradient-to-t from-black/90 to-transparent">
          EXPERT RUG REPAIR • PROFESSIONAL RESTORATION • TRUSTED SERVICE • SINCE 2009
        </VelocityScroll>
      </div>
    </section>
  );
} 
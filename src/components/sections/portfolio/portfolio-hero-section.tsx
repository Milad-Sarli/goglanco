"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { TextShimmerWave } from "@/components/motion-primitives/text-shimmer-wave";
import { TextRoll } from "@/components/motion-primitives/text-roll";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Define an interface for the Hero Section data
interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export function PortfolioHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_FALLBACK_IMAGE_URL = "/portfolio.jpg";

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/hero`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        // Ensure that responseData.data exists and matches the HeroData interface
        if (responseData && responseData.data) {
          setHeroData(responseData.data);
        } else {
          // Handle cases where the structure is not as expected, or log an error
          console.error("API response did not contain expected 'data' field or was null");
          // Fallback to static content if data is not in the expected format
          throw new Error("Invalid data structure from API");
        }
      } catch (e: unknown) {
        console.error("Failed to fetch hero data:", e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
        // Keep existing static content as fallback
        setHeroData({
          title: "Our Portfolio of Rug Restoration",
          subtitle: "Explore our gallery of before and after transformations. Each project showcases our commitment to preserving the beauty and value of fine rugs and carpets.",
          imageUrl: DEFAULT_FALLBACK_IMAGE_URL,
          buttonText: "View Gallery",
          secondaryButtonText: "Get a Quote",
          secondaryButtonLink: "/contact",
        });
      }
    }

    fetchHeroData();

    const ctx = gsap.context(() => {
      // Initial animation for the hero section
      gsap.fromTo(
        headingRef.current,
        { 
          y: 100, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out" 
        }
      );

      gsap.fromTo(
        textRef.current,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.3, 
          ease: "power3.out" 
        }
      );

      gsap.fromTo(
        imageRef.current,
        { 
          scale: 0.8, 
          opacity: 0 
        },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.2, 
          delay: 0.5, 
          ease: "power3.out" 
        }
      );

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleViewGalleryClick = () => {
    const gallerySection = document.getElementById("portfolio-gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/80"
    >
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            {heroData && heroData.title ? (
              <>
                <TextShimmerWave className="text-primary">
                  {heroData.title.includes(" of ") ? heroData.title.split(" of ")[0] : heroData.title}
                </TextShimmerWave>
                {heroData.title.includes(" of ") && (
                  <>{heroData.title.substring(heroData.title.indexOf(" of "))}</>
                )}
              </>
            ) : (
              <>
                <TextShimmerWave className="text-primary">Our Portfolio</TextShimmerWave> 
                <span> of Rug Restoration</span>
              </>
            )}
          </h1>
          <p 
            ref={textRef}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
          >
            <TextRoll>
              {heroData ? heroData.subtitle : "Explore our gallery of before and after transformations. Each project showcases our commitment to preserving the beauty and value of fine rugs and carpets."}
            </TextRoll>
          </p>
          {error && <p className="text-red-500">Error loading hero content: {error}. Displaying default content.</p>}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <BoxReveal duration={0.5}>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg font-semibold px-8 py-6"
                onClick={handleViewGalleryClick}
              >
                {heroData?.buttonText || "View Gallery"}
              </Button>
            </BoxReveal>
            <BoxReveal duration={0.5} boxColor="#4338ca">
              <Link href={heroData?.secondaryButtonLink || "/contact"}>
                <Button size="lg" variant="outline" className="border-2 hover:bg-accent text-lg font-semibold px-8 py-6">
                  {heroData?.secondaryButtonText || "Get a Quote"}
                </Button>
              </Link>
            </BoxReveal>
          </div>
        </div>
        <div 
          ref={imageRef}
          className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
        >
          <Image
            src={(heroData && heroData.imageUrl) ? heroData.imageUrl : DEFAULT_FALLBACK_IMAGE_URL}
            alt="Rug restoration portfolio showcase"
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
} 
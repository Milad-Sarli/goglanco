"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function AboutStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sticky effect for the image
      gsap.to(stickyRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Animate content as it comes into view
      const paragraphs = contentRef.current?.querySelectorAll("p");
      if (paragraphs) {
        paragraphs.forEach((p, i) => {
          gsap.fromTo(
            p,
            { 
              y: 50, 
              opacity: 0 
            },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.8, 
              delay: i * 0.2,
              scrollTrigger: {
                trigger: p,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // Parallax effect for the image
      gsap.to(imageRef.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[150vh] bg-background"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sticky image container */}
          <div 
            ref={stickyRef}
            className="relative h-[70vh] lg:h-[90vh] rounded-lg overflow-hidden shadow-2xl"
          >
            <div 
              ref={imageRef}
              className="absolute inset-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1000"
                alt="Our story in rug restoration"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          {/* Content that scrolls */}
          <div 
            ref={contentRef}
            className="space-y-8 py-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
            
            <p className="text-lg text-muted-foreground">
              Founded in 2000, Goglanco began as a small family business with a passion for preserving the artistry of fine rugs. What started as a modest operation has grown into a trusted name in rug restoration, serving clients nationwide.
            </p>
            
            <p className="text-lg text-muted-foreground">
              Our founder, John Smith, brought decades of experience in textile conservation to the business. His vision was to create a service that treated each rug not just as an item, but as a piece of cultural heritage deserving of expert care.
            </p>
            
            <p className="text-lg text-muted-foreground">
              Over the years, we've expanded our expertise to handle everything from delicate antique Persian rugs to modern designer pieces. Our team of skilled artisans combines traditional techniques with innovative methods to achieve exceptional results.
            </p>
            
            <p className="text-lg text-muted-foreground">
              Today, we're proud to have restored thousands of rugs, each with its own unique story. Our commitment to quality and attention to detail remains unchanged, as we continue to honor the craftsmanship of these timeless pieces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
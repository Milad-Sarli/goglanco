"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MAP_EMBED_URL = "https://www.google.com/maps?q=37.3192311,-121.9837819&z=16&output=embed";
const MAP_LINK_URL = "https://www.google.com/maps?q=37.3192311,-121.9837819&z=16";

export function ContactMapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
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

      gsap.fromTo(
        mapContainerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: mapContainerRef.current,
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
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Find Us on the <span className="text-primary">Map</span>
        </h2>

        <a
          href={MAP_LINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div
            ref={mapContainerRef}
            className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Goglanco location on Google Maps"
            />
          </div>
        </a>
      </div>
    </section>
  );
}

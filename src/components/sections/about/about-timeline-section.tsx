"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "2000",
    title: "The Beginning",
    description: "Goglanco was founded with a small workshop and a big vision to preserve the artistry of fine rugs."
  },
  {
    year: "2005",
    title: "Expansion",
    description: "Expanded our services to include specialized restoration for antique Persian and Oriental rugs."
  },
  {
    year: "2010",
    title: "Innovation",
    description: "Introduced advanced cleaning and restoration techniques, setting new industry standards."
  },
  {
    year: "2015",
    title: "National Recognition",
    description: "Received the National Heritage Preservation Award for our contributions to textile conservation."
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Launched our online consultation platform, making our expertise accessible to clients nationwide."
  },
  {
    year: "2023",
    title: "Today",
    description: "Continuing to grow and innovate, with a team of expert artisans and a commitment to excellence."
  }
];

export function AboutTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
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

      // Animate timeline line
      gsap.fromTo(
        ".timeline-line",
        { 
          scaleY: 0,
          transformOrigin: "top center"
        },
        { 
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate timeline events with stagger effect
      const timelineEvents = timelineRef.current?.querySelectorAll(".timeline-event");
      if (timelineEvents) {
        gsap.fromTo(
          timelineEvents,
          { 
            x: (index) => index % 2 === 0 ? -100 : 100,
            opacity: 0
          },
          { 
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 60%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Our <span className="text-primary">Timeline</span>
        </h2>
        
        <div 
          ref={timelineRef}
          className="relative max-w-4xl mx-auto"
        >
          {/* Timeline line */}
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 bg-primary/30"></div>
          
          {/* Timeline events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className={`timeline-event relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                  <div className="bg-card p-6 rounded-lg shadow-lg">
                    <div className="text-primary font-bold text-xl mb-2">{event.year}</div>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 
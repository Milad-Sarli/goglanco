"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Visit Us",
    details: "123 Rug Restoration Lane, Textile District, NY 10001",
    link: "https://maps.google.com/?q=123+Rug+Restoration+Lane+NY+10001",
    linkText: "Get Directions"
  },
  {
    icon: <Phone className="w-8 h-8 text-primary" />,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    link: "tel:+15551234567",
    linkText: "Call Now"
  },
  {
    icon: <Mail className="w-8 h-8 text-primary" />,
    title: "Email Us",
    details: "info@goglanco.com",
    link: "mailto:info@goglanco.com",
    linkText: "Send Email"
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Business Hours",
    details: "Monday - Friday: 9am - 6pm, Saturday: 10am - 4pm",
    link: null,
    linkText: null
  }
];

export function ContactInfoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Animate info cards with stagger effect
      const cards = cardsRef.current?.querySelectorAll(".info-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { 
            y: 50, 
            opacity: 0,
            scale: 0.9
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 70%",
              end: "top 30%",
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
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          How to <span className="text-primary">Reach</span> Us
        </h2>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="info-card bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{info.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
              <p className="text-muted-foreground mb-4">{info.details}</p>
              {info.link && (
                <a 
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-primary font-medium hover:underline"
                >
                  {info.linkText}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
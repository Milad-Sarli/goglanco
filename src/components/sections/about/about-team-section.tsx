"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "John Smith",
    role: "Founder & Master Restorer",
    bio: "With over 30 years of experience in textile conservation, John brings unparalleled expertise to every project.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000"
  },
  {
    name: "Sarah Johnson",
    role: "Senior Artisan",
    bio: "Specializing in Persian and Oriental rugs, Sarah's attention to detail ensures the highest quality restoration.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000"
  },
  {
    name: "Michael Chen",
    role: "Technical Director",
    bio: "Michael leads our innovation efforts, developing new techniques for challenging restoration projects.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000"
  },
  {
    name: "Emily Rodriguez",
    role: "Customer Relations",
    bio: "Emily ensures every client receives personalized attention and expert guidance throughout their project.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000"
  }
];

export function AboutTeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

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

      // Animate description
      gsap.fromTo(
        descriptionRef.current,
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
            trigger: descriptionRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate team members with stagger effect
      const teamMembers = teamRef.current?.querySelectorAll(".team-member");
      if (teamMembers) {
        gsap.fromTo(
          teamMembers,
          { 
            y: 100, 
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
              trigger: teamRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Create a parallax effect for team member images
      teamMembers?.forEach((member) => {
        const image = member.querySelector(".team-image");
        if (image) {
          gsap.to(image, {
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: member,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });
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
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Meet Our <span className="text-primary">Team</span>
        </h2>
        
        <p 
          ref={descriptionRef}
          className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16"
        >
          Our team of skilled artisans and experts brings decades of combined experience in rug restoration and preservation.
        </p>
        
        <div 
          ref={teamRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="team-member bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="team-image absolute inset-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
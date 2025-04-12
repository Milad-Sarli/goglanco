"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface AboutTeamSectionProps {
  team: TeamMember[];
}

export function AboutTeamSection({ team = [] }: AboutTeamSectionProps) {
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
          {team.map((member, index) => (
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
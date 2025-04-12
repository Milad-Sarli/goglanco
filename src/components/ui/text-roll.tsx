"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TextRollProps {
  children: React.ReactNode;
  className?: string;
}

export function TextRoll({ children, className = "" }: TextRollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    gsap.set(text, { y: 50, opacity: 0 });

    const animation = gsap.to(text, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={textRef}>
        {children}
      </div>
    </div>
  );
} 
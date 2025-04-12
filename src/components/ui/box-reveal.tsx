"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BoxRevealProps {
  children: React.ReactNode;
  duration?: number;
  boxColor?: string;
  className?: string;
}

export function BoxReveal({ 
  children, 
  duration = 0.8, 
  boxColor = "#000", 
  className = "" 
}: BoxRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const box = boxRef.current;
    if (!container || !box) return;

    gsap.set(container, { overflow: "hidden" });
    gsap.set(box, { 
      position: "absolute",
      inset: 0,
      backgroundColor: boxColor,
      transformOrigin: "left",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(box, {
      scaleX: 0,
      duration: duration,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [duration, boxColor]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {children}
      <div ref={boxRef} />
    </div>
  );
} 
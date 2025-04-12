"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TextShimmerWaveProps {
  children: React.ReactNode;
  className?: string;
}

export function TextShimmerWave({ children, className = "" }: TextShimmerWaveProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const shimmer = gsap.to(text, {
      backgroundPosition: "200% 0",
      duration: 2,
      ease: "none",
      repeat: -1,
    });

    return () => {
      shimmer.kill();
    };
  }, []);

  return (
    <div
      ref={textRef}
      className={`inline-block bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
      style={{ backgroundSize: "200% 100%" }}
    >
      {children}
    </div>
  );
} 
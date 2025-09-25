"use client";

import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface TextRollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function TextRoll({
  children,
  delay = 0.1,
  duration = 0.5,
  className = "",
}: TextRollProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
    >
      {children}
    </motion.div>
  );
}
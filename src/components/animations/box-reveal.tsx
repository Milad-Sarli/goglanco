"use client";

import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface BoxRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  boxColor?: string;
  delay?: number;
  duration?: number;
}

export function BoxReveal({
  children,
  width = "fit-content",
  boxColor = "var(--primary)",
  delay = 0.25,
  duration = 0.5,
}: BoxRevealProps) {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration, delay: delay }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration * 1.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: boxColor,
          zIndex: 20,
        }}
      />
    </div>
  );
}
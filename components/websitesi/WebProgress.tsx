"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export default function WebProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-sc-accent"
    />
  );
}

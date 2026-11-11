'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { MotionConfig, useReducedMotion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function Providers({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [reduceMotion]);

  return (
    <MotionConfig
      reducedMotion={reduceMotion ? "user" : "never"}
      transition={{ type: "spring", damping: 25, stiffness: 120 }}
    >
      {children}
    </MotionConfig>
  );
}
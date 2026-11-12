'use client';

import { MotionConfig, useReducedMotion } from 'motion/react';

export function Providers({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig
      reducedMotion={reduceMotion ? 'user' : 'never'}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
    >
      {children}
    </MotionConfig>
  );
}

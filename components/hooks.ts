'use client';

import { useEffect, useState } from 'react';

/**
 * True on viewports narrower than the given breakpoint (default: below lg).
 * Used to skip heavy/animated content (3D lab, cursor particles, auto-drifting
 * canvases) on phones so the page stays fast.
 */
export function useIsMobile(breakpoint = 1023) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);

  return mobile;
}

/**
 * True only after mount, on viewports at least `minWidth` wide. Starts false so
 * heavy, network-hungry modules (the Three.js lab, image spiral) are never
 * mounted during the first paint on phones — they only appear on large screens.
 */
export function useIsDesktop(minWidth = 1024) {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [minWidth]);

  return desktop;
}

/** True on touch-primary devices (no fine pointer) — for cursor-only effects. */
export function useIsTouchOnly() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return touch;
}

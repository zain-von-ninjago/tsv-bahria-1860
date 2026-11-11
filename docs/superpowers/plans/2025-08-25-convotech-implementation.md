# ConvoTech Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a scroll-driven narrative website for ConvoTech with 7 pixel art scenes, atmospheric transitions, service cards, and 6 additional animated pages — all with masterpiece-level animation quality.

**Architecture:** Next.js 14 App Router with React. Homepage is a single continuous scroll story (hero → 7 pixel art scenes → service cards in dark transitions → contact zone). Inner pages (Industries, Process, Partners, ROI Calculator, FAQ, About) share the same dark/warm aesthetic with heavy animation. Pixel art is procedurally generated on Canvas 2D, layered into Three.js for atmospheric effects. GSAP ScrollTrigger drives all scroll-linked animations. anime.js handles micro-interactions and text reveals.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Three.js, anime.js, GSAP (ScrollTrigger), @napi-rs/canvas (server-side pixel art generation)

**Spec:** `docs/superpowers/specs/2025-08-25-convotech-design.md`

## Global Constraints

- Next.js 14 with App Router (not Pages Router)
- TypeScript strict mode
- Tailwind CSS for utility styling
- No `as any`, `@ts-ignore`, or `@ts-expect-error`
- All animations target 60fps
- Fonts: Space Grotesk (display), Inter (body), Playfair Display (accent) via Google Fonts
- Color palette defined in `lib/colors.ts` — all colors must reference this file
- Pixel art canvas: 1920x1080 base, 2x for retina
- Three.js only loaded on homepage (code-split)
- All components are client components where animation is needed (`'use client'`)
- Deployment target: Vercel

---

## Phase 1: Project Foundation (Tasks 1-3)

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

**Dependencies to install:**
```bash
npx create-next-app@14 convotech --typescript --tailwind --eslint --app --src-dir=false
cd convotech
npm install three @types/three animejs gsap @napi-rs/canvas
```

- [ ] **Step 1:** Run create-next-app with TypeScript + Tailwind + App Router
- [ ] **Step 2:** Install additional dependencies (three, animejs, gsap, @napi-rs/canvas)
- [ ] **Step 3:** Verify `npm run dev` starts without errors
- [ ] **Step 4:** Clean default page content — leave minimal `app/page.tsx` with just "ConvoTech" text
- [ ] **Step 5:** Commit

```bash
git add .
git commit -m "feat: scaffold Next.js project with dependencies"
```

---

### Task 2: Global Styles, Fonts, Color Palette

**Files:**
- Create: `lib/colors.ts`
- Modify: `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`

**Interfaces:**
- Produces: `COLORS` object exported from `lib/colors.ts` (used by all components)

- [ ] **Step 1:** Create `lib/colors.ts` with the full palette

```typescript
export const COLORS = {
  deepNight: '#0a0a1a',
  midnight: '#1a1a2e',
  indigo: '#2d2b55',
  earth: '#8b6914',
  amber: '#e6a817',
  gold: '#f4a261',
  sunrise: '#ff9f43',
  ember: '#e74c3c',
  teal: '#00b4d8',
  cyanGlow: '#00fff5',
  cream: '#fdf6e3',
  white: '#ffffff',
} as const;

export type ColorKey = keyof typeof COLORS;
```

- [ ] **Step 2:** Update `tailwind.config.ts` to extend colors with the palette

```typescript
import type { Config } from 'tailwindcss';
import { COLORS } from './lib/colors';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-night': COLORS.deepNight,
        'midnight': COLORS.midnight,
        'indigo-dark': COLORS.indigo,
        'earth': COLORS.earth,
        'amber': COLORS.amber,
        'gold': COLORS.gold,
        'sunrise': COLORS.sunrise,
        'ember': COLORS.ember,
        'teal': COLORS.teal,
        'cyan-glow': COLORS.cyanGlow,
        'cream': COLORS.cream,
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3:** Update `app/globals.css` with base styles

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

html {
  scroll-behavior: smooth;
  background-color: #0a0a1a;
  color: #fdf6e3;
}

body {
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

::selection {
  background-color: rgba(244, 162, 97, 0.3);
  color: #ffffff;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0a1a;
}
::-webkit-scrollbar-thumb {
  background: #f4a261;
  border-radius: 3px;
}
```

- [ ] **Step 4:** Update `app/layout.tsx` to import fonts and set metadata

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ConvoTech — Business Consulting & Technology',
  description: 'Building empires through technology and strategy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-deep-night text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5:** Commit

```bash
git add lib/colors.ts tailwind.config.ts app/globals.css app/layout.tsx
git commit -m "feat: add global styles, fonts, and color palette"
```

---

### Task 3: Reusable UI Components

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/FloatingInput.tsx`, `components/ui/AnimatedCounter.tsx`

**Interfaces:**
- Consumes: `COLORS` from `lib/colors.ts`
- Produces: Reusable animated components used across all pages

- [ ] **Step 1:** Create `components/ui/Button.tsx`

```tsx
'use client';
import { useRef } from 'react';
import { animate } from 'animejs';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  const handleHover = (entering: boolean) => {
    if (fillRef.current) {
      animate(fillRef.current, {
        translateX: entering ? '0%' : '-101%',
        duration: 300,
        ease: 'inOut',
      });
    }
  };

  const handleClick = () => {
    if (btnRef.current) {
      animate(btnRef.current, {
        scale: [1, 0.95, 1.02, 1],
        duration: 400,
        ease: 'spring(1, 80, 10)',
      });
    }
    onClick?.();
  };

  const baseClasses = 'relative overflow-hidden px-8 py-4 font-display font-semibold text-sm tracking-wider uppercase cursor-pointer border-none';
  const variantClasses = variant === 'primary'
    ? 'bg-gold text-deep-night'
    : 'bg-transparent border-2 border-gold text-gold';

  return (
    <button
      ref={btnRef}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={handleClick}
    >
      <span
        ref={fillRef}
        className="absolute inset-0 bg-sunrise translate-x-[-101%]"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
```

- [ ] **Step 2:** Create `components/ui/Card.tsx`

```tsx
'use client';
import { useRef, useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function Card({ children, className = '', glowColor = '#f4a261' }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`);
  };

  const handleMouseLeave = () => setTransform('');

  return (
    <div
      ref={cardRef}
      className={`relative bg-midnight/80 backdrop-blur-md border border-white/5 rounded-xl p-6 transition-shadow duration-300 hover:shadow-[0_0_30px_${glowColor}20] ${className}`}
      style={{ transform, transition: 'transform 0.1s ease-out, box-shadow 0.3s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3:** Create `components/ui/FloatingInput.tsx`

```tsx
'use client';
import { useState } from 'react';

interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

export function FloatingInput({ label, type = 'text', value, onChange, multiline }: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const baseClasses = 'w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-cream font-body text-base outline-none transition-colors duration-300';
  const focusClasses = focused ? 'border-gold' : '';

  const inputClasses = `${baseClasses} ${focusClasses}`;

  return (
    <div className="relative mt-6">
      {multiline ? (
        <textarea
          className={`${inputClasses} resize-none h-24`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          className={inputClasses}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-body ${
          isActive
            ? 'top-[-20px] text-xs text-gold'
            : 'top-3 text-white/40'
        }`}
      >
        {label}
      </label>
    </div>
  );
}
```

- [ ] **Step 4:** Create `components/ui/AnimatedCounter.tsx`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { value: 0 };
          animate(obj, {
            value: target,
            duration,
            ease: 'inOut',
            onUpdate: () => setCount(Math.round(obj.value)),
          });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={`font-display font-bold ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
```

- [ ] **Step 5:** Commit

```bash
git add components/ui/
git commit -m "feat: add reusable animated UI components (Button, Card, FloatingInput, AnimatedCounter)"
```

---

## Phase 2: Animation System (Tasks 4-5)

### Task 4: Text Reveal Components + Animation Utilities

**Files:**
- Create: `lib/animations.ts`, `components/ScrollStory/TextReveal.tsx`

**Interfaces:**
- Consumes: `COLORS` from `lib/colors.ts`
- Produces: `TextReveal` component (used in all scenes), animation utility functions

- [ ] **Step 1:** Create `lib/animations.ts`

```typescript
import { stagger, animate } from 'animejs';

export function createScrollTimeline(
  element: HTMLElement,
  callbacks: { onProgress: (progress: number) => void }[]
) {
  let ticking = false;

  const update = () => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = Math.max(0, Math.min(1,
      (viewportHeight - rect.top) / (viewportHeight + rect.height)
    ));
    callbacks.forEach(cb => cb.onProgress(progress));
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  return () => window.removeEventListener('scroll', onScroll);
}

export function revealCharacters(
  element: HTMLElement,
  options: { delay?: number; duration?: number; stagger?: number } = {}
) {
  const text = element.textContent || '';
  element.textContent = '';
  element.style.visibility = 'visible';

  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(20px)';
    element.appendChild(span);
    return span;
  });

  animate(chars, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: options.duration || 400,
    delay: stagger(options.stagger || 30, { start: options.delay || 0 }),
    ease: 'out',
  });
}

export function wordWipe(element: HTMLElement, options: { delay?: number; duration?: number } = {}) {
  const text = element.textContent || '';
  const words = text.split(' ');
  element.textContent = '';
  element.style.visibility = 'visible';

  const wordSpans = words.map(word => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    span.style.clipPath = 'inset(0 100% 0 0)';
    element.appendChild(span);
    const space = document.createTextNode('\u00A0');
    element.appendChild(space);
    return span;
  });

  animate(wordSpans, {
    clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
    duration: options.duration || 600,
    delay: stagger(150, { start: options.delay || 0 }),
    ease: 'inOut',
  });
}
```

- [ ] **Step 2:** Create `components/ScrollStory/TextReveal.tsx`

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { revealCharacters, wordWipe } from '@/lib/animations';

type RevealType = 'characters' | 'wordWipe' | 'splitFade' | 'typewriter' | 'scalePop';

interface TextRevealProps {
  text: string;
  type?: RevealType;
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}

export function TextReveal({ text, type = 'characters', className = '', delay = 0, triggerOnScroll = true }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    if (!triggerOnScroll) {
      triggerReveal(el);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          triggerReveal(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, type, delay, triggerOnScroll]);

  const triggerReveal = (el: HTMLElement) => {
    switch (type) {
      case 'characters':
        revealCharacters(el, { delay, duration: 400, stagger: 30 });
        break;
      case 'wordWipe':
        wordWipe(el, { delay, duration: 600 });
        break;
      case 'typewriter':
        typewriterEffect(el, delay);
        break;
      default:
        revealCharacters(el, { delay });
    }
  };

  const typewriterEffect = (el: HTMLElement, delay: number) => {
    el.textContent = '';
    el.style.visibility = 'visible';
    const chars = text.split('');
    let i = 0;
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    el.appendChild(cursor);

    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < chars.length) {
          const span = document.createTextNode(chars[i]);
          el.insertBefore(span, cursor);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => cursor.remove(), 2000);
        }
      }, 50);
    }, delay);
  };

  return (
    <div
      ref={ref}
      className={`visibility-hidden ${className}`}
      style={{ visibility: 'hidden' }}
    >
      {type === 'splitFade' ? text : undefined}
    </div>
  );
}
```

- [ ] **Step 3:** Commit

```bash
git add lib/animations.ts components/ScrollStory/TextReveal.tsx
git commit -m "feat: add text reveal components and animation utilities"
```

---

### Task 5: Three.js Background System

**Files:**
- Create: `components/ScrollStory/ThreeBackground.tsx`

**Interfaces:**
- Consumes: `COLORS` from `lib/colors.ts`
- Produces: `ThreeBackground` component (atmospheric particles, fog, light rays)

- [ ] **Step 1:** Create `components/ScrollStory/ThreeBackground.tsx`

```tsx
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  sceneIndex: number;
  progress: number;
}

export function ThreeBackground({ sceneIndex, progress }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Particles
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#f4a261'),
      new THREE.Color('#e6a817'),
      new THREE.Color('#00b4d8'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation loop
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.005;

      particles.rotation.y = time * 0.1;
      particles.rotation.x = Math.sin(time * 0.3) * 0.05;

      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.001;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  // Update opacity based on scene progress
  useEffect(() => {
    if (rendererRef.current) {
      const opacity = Math.max(0, Math.min(1, progress * 2));
      rendererRef.current.domElement.style.opacity = String(opacity);
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add components/ScrollStory/ThreeBackground.tsx
git commit -m "feat: add Three.js atmospheric particle background"
```

---

## Phase 3: Homepage Scroll Story (Tasks 6-10)

### Task 6: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `TextReveal` from `components/ScrollStory/TextReveal.tsx`, `COLORS` from `lib/colors.ts`
- Produces: Hero section rendered at top of homepage

- [ ] **Step 1:** Create `components/sections/Hero.tsx`

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { TextReveal } from '@/components/ScrollStory/TextReveal';

export function Hero() {
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (arrowRef.current) {
      animate(arrowRef.current, {
        translateY: [0, 10, 0],
        duration: 1500,
        loop: true,
        ease: 'inOut',
      });
    }
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-night to-deep-night" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(244, 162, 97, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight">
          <TextReveal text="ConvoTech" type="characters" delay={500} />
        </h1>
        <p className="font-accent text-xl md:text-2xl text-gold/80 italic max-w-xl mx-auto">
          <TextReveal text="Building empires through technology and strategy" type="wordWipe" delay={1500} />
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={arrowRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4L10 16M10 16L4 10M10 16L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 2:** Update `app/page.tsx` to include Hero

```tsx
import { Hero } from '@/components/sections/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3:** Run `npm run dev` and verify Hero renders with animations
- [ ] **Step 4:** Commit

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: add animated hero section"
```

---

### Task 7: Pixel Art System + First 3 Scenes

**Files:**
- Create: `lib/pixel-art.ts`, `components/ScrollStory/PixelArtCanvas.tsx`, `components/ScrollStory/scenes/scene1.ts`, `scene2.ts`, `scene3.ts`

**Interfaces:**
- Consumes: `COLORS` from `lib/colors.ts`
- Produces: `PixelArtCanvas` component, scene generator functions

- [ ] **Step 1:** Create `lib/pixel-art.ts` with helper functions

```typescript
export interface PixelLayer {
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => void;
  parallaxSpeed: number;
}

export function createPixelCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  pixelSize: number,
  layers: PixelLayer[]
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = width;
  canvas.height = height;

  let frame = 0;
  let animId = 0;

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;

    layers.forEach((layer, i) => {
      ctx.save();
      const offset = Math.sin(frame * 0.01 + i) * layer.parallaxSpeed * 10;
      ctx.translate(0, offset);
      layer.draw(ctx, width, height, frame);
      ctx.restore();
    });

    frame++;
    animId = requestAnimationFrame(render);
  };

  render();

  return () => cancelAnimationFrame(animId);
}

export function drawPixelRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  color: string,
  pixelSize: number
) {
  ctx.fillStyle = color;
  for (let px = x; px < x + w; px += pixelSize) {
    for (let py = y; py < y + h; py += pixelSize) {
      ctx.fillRect(
        Math.floor(px / pixelSize) * pixelSize,
        Math.floor(py / pixelSize) * pixelSize,
        pixelSize, pixelSize
      );
    }
  }
}

export function drawPixelCircle(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  radius: number,
  color: string,
  pixelSize: number
) {
  ctx.fillStyle = color;
  for (let x = cx - radius; x < cx + radius; x += pixelSize) {
    for (let y = cy - radius; y < cy + radius; y += pixelSize) {
      if (Math.hypot(x - cx, y - cy) < radius) {
        ctx.fillRect(
          Math.floor(x / pixelSize) * pixelSize,
          Math.floor(y / pixelSize) * pixelSize,
          pixelSize, pixelSize
        );
      }
    }
  }
}
```

- [ ] **Step 2:** Create `components/ScrollStory/scenes/scene1.ts` — "Alone in the Dark"

```typescript
import { PixelLayer, drawPixelRect, drawPixelCircle } from '@/lib/pixel-art';
import { COLORS } from '@/lib/colors';

export function createScene1Layers(): PixelLayer[] {
  return [
    // Background sky
    {
      parallaxSpeed: 0.1,
      draw: (ctx, w, h) => {
        // Gradient sky
        for (let y = 0; y < h * 0.6; y += 4) {
          const t = y / (h * 0.6);
          const r = Math.floor(10 + t * 20);
          const g = Math.floor(10 + t * 15);
          const b = Math.floor(26 + t * 30);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(0, y, w, 4);
        }
        // Horizon glow
        ctx.fillStyle = 'rgba(244, 162, 97, 0.08)';
        ctx.fillRect(0, h * 0.55, w, h * 0.1);
      },
    },
    // Ground
    {
      parallaxSpeed: 0.3,
      draw: (ctx, w, h) => {
        const groundY = h * 0.6;
        // Earth
        for (let y = groundY; y < h; y += 4) {
          const t = (y - groundY) / (h - groundY);
          const r = Math.floor(40 + t * 15);
          const g = Math.floor(30 + t * 10);
          const b = Math.floor(15 + t * 5);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(0, y, w, 4);
        }
        // Cracks
        ctx.strokeStyle = 'rgba(20, 15, 10, 0.6)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 15; i++) {
          const sx = Math.random() * w;
          const sy = groundY + Math.random() * (h - groundY) * 0.5;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          for (let j = 0; j < 5; j++) {
            ctx.lineTo(sx + (Math.random() - 0.5) * 80, sy + Math.random() * 40);
          }
          ctx.stroke();
        }
      },
    },
    // Dead trees
    {
      parallaxSpeed: 0.5,
      draw: (ctx, w, h) => {
        const drawTree = (x: number, baseY: number, scale: number) => {
          const trunkColor = '#1a1510';
          drawPixelRect(ctx, x, baseY - 60 * scale, 4 * scale, 60 * scale, trunkColor, 4);
          // Branches
          ctx.strokeStyle = trunkColor;
          ctx.lineWidth = 2;
          for (let i = 0; i < 4; i++) {
            const branchY = baseY - 20 * scale - i * 12 * scale;
            const dir = i % 2 === 0 ? 1 : -1;
            ctx.beginPath();
            ctx.moveTo(x + 2 * scale, branchY);
            ctx.lineTo(x + dir * 20 * scale, branchY - 15 * scale);
            ctx.stroke();
          }
        };
        drawTree(w * 0.15, h * 0.62, 1.2);
        drawTree(w * 0.85, h * 0.61, 1.0);
        drawTree(w * 0.75, h * 0.63, 0.8);
      },
    },
    // Lone figure
    {
      parallaxSpeed: 0.7,
      draw: (ctx, w, h) => {
        const cx = w * 0.5;
        const cy = h * 0.58;
        // Body
        drawPixelRect(ctx, cx - 3, cy - 20, 6, 16, '#2a2520', 2);
        // Head
        drawPixelCircle(ctx, cx, cy - 24, 5, '#3a3530', 2);
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(cx, cy - 2, 12, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      },
    },
    // Horizon glow
    {
      parallaxSpeed: 0.2,
      draw: (ctx, w, h, time) => {
        const glowIntensity = 0.05 + Math.sin(time * 0.02) * 0.02;
        const gradient = ctx.createRadialGradient(w * 0.5, h * 0.58, 0, w * 0.5, h * 0.58, w * 0.4);
        gradient.addColorStop(0, `rgba(244, 162, 97, ${glowIntensity})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      },
    },
  ];
}
```

- [ ] **Step 3:** Create `components/ScrollStory/scenes/scene2.ts` — "First Light"

```typescript
import { PixelLayer, drawPixelRect, drawPixelCircle } from '@/lib/pixel-art';
import { COLORS } from '@/lib/colors';

export function createScene2Layers(): PixelLayer[] {
  return [
    {
      parallaxSpeed: 0.1,
      draw: (ctx, w, h) => {
        // Dawn sky gradient
        for (let y = 0; y < h * 0.65; y += 4) {
          const t = y / (h * 0.65);
          const r = Math.floor(10 + t * 80);
          const g = Math.floor(10 + t * 50);
          const b = Math.floor(40 + t * 20);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(0, y, w, 4);
        }
        // Sun glow
        const gradient = ctx.createRadialGradient(w * 0.5, h * 0.55, 0, w * 0.5, h * 0.55, w * 0.5);
        gradient.addColorStop(0, 'rgba(244, 162, 97, 0.3)');
        gradient.addColorStop(0.5, 'rgba(230, 168, 23, 0.1)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      },
    },
    {
      parallaxSpeed: 0.3,
      draw: (ctx, w, h) => {
        const groundY = h * 0.6;
        for (let y = groundY; y < h; y += 4) {
          const t = (y - groundY) / (h - groundY);
          const r = Math.floor(60 + t * 20);
          const g = Math.floor(45 + t * 10);
          const b = Math.floor(20 + t * 5);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(0, y, w, 4);
        }
        // Long shadows
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.58);
        ctx.lineTo(w * 0.5 - 200, h * 0.7);
        ctx.lineTo(w * 0.5 - 180, h * 0.72);
        ctx.lineTo(w * 0.5, h * 0.6);
        ctx.fill();
      },
    },
    {
      parallaxSpeed: 0.7,
      draw: (ctx, w, h, time) => {
        const cx = w * 0.5;
        const cy = h * 0.55;
        // Walking figure
        drawPixelRect(ctx, cx - 3, cy - 18, 6, 14, '#3a3025', 2);
        drawPixelCircle(ctx, cx, cy - 22, 5, '#4a4035', 2);
        // Blueprint glow in hands
        const glow = 0.5 + Math.sin(time * 0.05) * 0.3;
        ctx.fillStyle = `rgba(0, 180, 216, ${glow})`;
        ctx.fillRect(cx + 4, cy - 12, 8, 6);
      },
    },
  ];
}
```

- [ ] **Step 4:** Create `components/ScrollStory/scenes/scene3.ts` — "Laying the Foundation"

```typescript
import { PixelLayer, drawPixelRect, drawPixelCircle } from '@/lib/pixel-art';

export function createScene3Layers(): PixelLayer[] {
  return [
    {
      parallaxSpeed: 0.1,
      draw: (ctx, w, h) => {
        for (let y = 0; y < h * 0.65; y += 4) {
          const t = y / (h * 0.65);
          const r = Math.floor(30 + t * 60);
          const g = Math.floor(25 + t * 40);
          const b = Math.floor(50 + t * 20);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(0, y, w, 4);
        }
      },
    },
    {
      parallaxSpeed: 0.3,
      draw: (ctx, w, h) => {
        const groundY = h * 0.6;
        for (let y = groundY; y < h; y += 4) {
          const t = (y - groundY) / (h - groundY);
          ctx.fillStyle = `rgb(${70 + t * 15}, ${55 + t * 10}, ${25 + t * 5})`;
          ctx.fillRect(0, y, w, 4);
        }
        // Foundation stones
        for (let i = 0; i < 8; i++) {
          drawPixelRect(ctx, w * 0.4 + i * 20 - 80, h * 0.58, 18, 12, '#5a4a2a', 2);
        }
      },
    },
    {
      parallaxSpeed: 0.5,
      draw: (ctx, w, h) => {
        // Kneeling figure
        const cx = w * 0.5;
        const cy = h * 0.56;
        drawPixelRect(ctx, cx - 4, cy - 10, 8, 10, '#3a3025', 2);
        drawPixelCircle(ctx, cx, cy - 14, 5, '#4a4035', 2);
        // Approaching figures in distance
        for (let i = 0; i < 4; i++) {
          const fx = w * 0.2 + i * 40;
          const fy = h * 0.58;
          const scale = 0.4;
          drawPixelRect(ctx, fx, fy - 8 * scale, 4 * scale, 8 * scale, '#2a2520', 2);
        }
      },
    },
    {
      parallaxSpeed: 0.2,
      draw: (ctx, w, h, time) => {
        // Morning fog
        const fogOpacity = 0.08 + Math.sin(time * 0.01) * 0.03;
        ctx.fillStyle = `rgba(200, 200, 220, ${fogOpacity})`;
        for (let i = 0; i < 5; i++) {
          const y = h * 0.5 + i * 20;
          ctx.fillRect(0, y, w, 30);
        }
      },
    },
  ];
}
```

- [ ] **Step 5:** Create `components/ScrollStory/PixelArtCanvas.tsx`

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { createPixelCanvas, PixelLayer } from '@/lib/pixel-art';

interface PixelArtCanvasProps {
  layers: PixelLayer[];
  progress: number;
}

export function PixelArtCanvas({ layers, progress }: PixelArtCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = createPixelCanvas(canvasRef.current, 1920, 1080, 4, layers);
    return () => cleanup?.();
  }, [layers]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover"
      style={{
        imageRendering: 'pixelated',
        opacity: Math.min(1, progress * 3),
      }}
    />
  );
}
```

- [ ] **Step 6:** Commit

```bash
git add lib/pixel-art.ts components/ScrollStory/PixelArtCanvas.tsx components/ScrollStory/scenes/
git commit -m "feat: add pixel art system and first 3 scenes"
```

---

### Task 8: Scenes 4-7 + DarkTransition Component

**Files:**
- Create: `components/ScrollStory/scenes/scene4.ts`, `scene5.ts`, `scene6.ts`, `scene7.ts`, `components/ScrollStory/DarkTransition.tsx`

**Interfaces:**
- Consumes: `PixelLayer` from `lib/pixel-art.ts`
- Produces: Scene layers for scenes 4-7, `DarkTransition` component

- [ ] **Step 1:** Create scenes 4-7 following the same pattern as scenes 1-3

Each scene should follow this structure:
```typescript
import { PixelLayer, drawPixelRect, drawPixelCircle } from '@/lib/pixel-art';

export function createSceneNLayers(): PixelLayer[] {
  return [
    { parallaxSpeed: 0.1, draw: (ctx, w, h) => { /* sky */ } },
    { parallaxSpeed: 0.3, draw: (ctx, w, h) => { /* ground/midground */ } },
    { parallaxSpeed: 0.5, draw: (ctx, w, h) => { /* structures/figures */ } },
    { parallaxSpeed: 0.2, draw: (ctx, w, h, time) => { /* effects/particles */ } },
  ];
}
```

Scene content per the spec:
- **Scene4:** Half-built tower, scaffolding, cranes, workers, flickering lights
- **Scene5:** Zoomed out, connected buildings via glowing lines, trees returning
- **Scene6:** Full cityscape, glowing windows, data streams, starfield
- **Scene7:** Figure walking toward new dawn, city behind, bright sunrise ahead

- [ ] **Step 2:** Create `components/ScrollStory/DarkTransition.tsx`

```tsx
'use client';
import { ServiceCard } from './ServiceCard';

interface DarkTransitionProps {
  service?: {
    title: string;
    description: string;
    icon: string;
    position: 'left' | 'right' | 'both';
  };
  progress: number;
}

export function DarkTransition({ service, progress }: DarkTransitionProps) {
  const opacity = progress < 0.3
    ? progress / 0.3
    : progress > 0.7
      ? (1 - progress) / 0.3
      : 1;

  return (
    <div className="relative h-[150vh] bg-deep-night flex items-center justify-center">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(10, 10, 26, 0.8) 0%, #0a0a1a 100%)`,
          opacity,
        }}
      />

      {/* Service card */}
      {service && (
        <div
          className={`relative z-10 ${service.position === 'both' ? 'flex gap-8' : ''}`}
          style={{
            opacity: Math.max(0, Math.min(1, (progress - 0.2) * 3)),
            transform: `translateX(${service.position === 'left' ? '-50px' : service.position === 'right' ? '50px' : '0'}px)`,
          }}
        >
          {service.position === 'both' ? (
            <>
              <ServiceCard {...service} side="left" />
              <ServiceCard {...service} side="right" />
            </>
          ) : (
            <ServiceCard {...service} side={service.position} />
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3:** Create `components/ScrollStory/ServiceCard.tsx`

```tsx
'use client';
import { Card } from '@/components/ui/Card';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  side: 'left' | 'right';
}

export function ServiceCard({ title, description, icon, side }: ServiceCardProps) {
  return (
    <Card
      className={`w-[350px] ${side === 'left' ? 'mr-auto ml-8' : 'ml-auto mr-8'}`}
      glowColor="#f4a261"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-display text-lg text-cream mb-2">{title}</h3>
      <p className="font-body text-sm text-white/60 leading-relaxed">{description}</p>
      <div className="mt-4 h-[2px] bg-gradient-to-r from-gold via-sunrise to-transparent" />
    </Card>
  );
}
```

- [ ] **Step 4:** Create service data in `lib/services.ts`

```typescript
export const services = [
  {
    id: 'strategy',
    title: 'Strategy Consulting',
    description: 'We help businesses define their vision and build the roadmap to get there. From market analysis to operational restructuring — we turn ambition into action.',
    icon: '🎯',
    position: 'left' as const,
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    description: 'Legacy systems holding you back? We modernize your tech stack, workflows, and digital presence — without disrupting what already works.',
    icon: '⚡',
    position: 'right' as const,
  },
  {
    id: 'technology',
    title: 'Technology Solutions',
    description: 'Custom software, integrations, and systems built around your business — not the other way around. Scalable. Reliable. Yours.',
    icon: '🔧',
    position: 'left' as const,
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    description: 'Migrate, scale, and operate on modern cloud architecture. AWS, Azure, GCP — we design the infrastructure that grows with you.',
    icon: '☁️',
    position: 'both' as const,
  },
  {
    id: 'analytics',
    title: 'Data Analytics',
    description: 'Turn raw data into decisions. Dashboards, predictive models, and reporting systems that reveal what your business is actually telling you.',
    icon: '📊',
    position: 'both' as const,
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description: 'Your empire needs walls. We audit, harden, and monitor your systems so you can build without fear.',
    icon: '🛡️',
    position: 'right' as const,
  },
];
```

- [ ] **Step 5:** Commit

```bash
git add components/ScrollStory/scenes/ components/ScrollStory/DarkTransition.tsx components/ScrollStory/ServiceCard.tsx lib/services.ts
git commit -m "feat: add scenes 4-7, dark transitions, and service cards"
```

---

### Task 9: Assemble Full Scroll Story

**Files:**
- Create: `components/ScrollStory/ScrollStory.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: All scene layers, DarkTransition, PixelArtCanvas, ThreeBackground, TextReveal
- Produces: Complete scroll story component

- [ ] **Step 1:** Create `components/ScrollStory/ScrollStory.tsx`

This is the main orchestrator. It:
1. Contains all7 scenes + 6 dark transitions + contact zone
2. Tracks scroll progress
3. Renders PixelArtCanvas + ThreeBackground + TextReveal per scene
4. Passes service data to DarkTransition components

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { PixelArtCanvas } from './PixelArtCanvas';
import { ThreeBackground } from './ThreeBackground';
import { DarkTransition } from './DarkTransition';
import { TextReveal } from './TextReveal';
import { ContactZone } from './ContactZone';
import { createScene1Layers } from './scenes/scene1';
// ... import all scene layers
import { services } from '@/lib/services';

const scenes = [
  { layers: createScene1Layers(), text: 'Every empire starts with a single step into the unknown.', serviceAfter: null },
  { layers: createScene2Layers(), text: 'When the world sleeps, builders dream.', serviceAfter: 0 }, // Strategy
  { layers: createScene3Layers(), text: 'Foundation is not concrete. It is conviction.', serviceAfter: 1 }, // Digital
  { layers: createScene4Layers(), text: 'Ideas become structures. Structures become empires.', serviceAfter: 2 }, // Technology
  { layers: createScene5Layers(), text: 'No empire stands alone. Every connection is a bridge to what\'s next.', serviceAfter: 3 }, // Cloud + Analytics
  { layers: createScene6Layers(), text: 'From nothing. From doubt. From the dark. Everything.', serviceAfter: 4 }, // Security
  { layers: createScene7Layers(), text: 'Your empire is waiting.', serviceAfter: null },
];

export function ScrollStory() {
  const [activeScene, setActiveScene] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const sceneHeight = vh * 1.5; // scene + transition
      const totalScenes = scenes.length;

      const rawProgress = scrollY / (sceneHeight * totalScenes);
      const scene = Math.min(Math.floor(rawProgress * totalScenes), totalScenes - 1);
      const progress = (rawProgress * totalScenes) - scene;

      setActiveScene(scene);
      setSceneProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <ThreeBackground sceneIndex={activeScene} progress={sceneProgress} />

      {scenes.map((scene, i) => (
        <div key={i}>
          {/* Scene */}
          <section className="relative h-screen overflow-hidden">
            <PixelArtCanvas layers={scene.layers} progress={sceneProgress} />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="max-w-2xl text-center px-8">
                <TextReveal
                  text={scene.text}
                  type="characters"
                  className="font-accent text-2xl md:text-4xl text-cream/90 leading-relaxed"
                  delay={300}
                />
              </div>
            </div>
          </section>

          {/* Dark transition + optional service card */}
          {i < scenes.length - 1 && (
            <DarkTransition
              progress={sceneProgress}
              service={scene.serviceAfter !== null ? services[scene.serviceAfter] : undefined}
            />
          )}
        </div>
      ))}

      {/* Contact zone at the end */}
      <ContactZone />
    </div>
  );
}
```

- [ ] **Step 2:** Update `app/page.tsx`

```tsx
import { Hero } from '@/components/sections/Hero';
import { ScrollStory } from '@/components/ScrollStory/ScrollStory';

export default function Home() {
  return (
    <main>
      <Hero />
      <ScrollStory />
    </main>
  );
}
```

- [ ] **Step 3:** Run `npm run dev` — verify scroll story works end-to-end
- [ ] **Step 4:** Commit

```bash
git add components/ScrollStory/ScrollStory.tsx app/page.tsx
git commit -m "feat: assemble complete scroll story with all scenes and transitions"
```

---

### Task 10: Contact Zone

**Files:**
- Create: `components/ScrollStory/ContactZone.tsx`

**Interfaces:**
- Consumes: `FloatingInput`, `Button` from `components/ui/`
- Produces: Contact section at end of scroll

- [ ] **Step 1:** Create `components/ScrollStory/ContactZone.tsx`

```tsx
'use client';
import { useState } from 'react';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { Button } from '@/components/ui/Button';
import { TextReveal } from './TextReveal';

export function ContactZone() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // In production: send to API endpoint
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-deep-night flex items-center justify-center">
        <div className="text-center">
          <TextReveal text="Message sent. We'll be in touch." type="characters" className="font-accent text-3xl text-gold" />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-deep-night relative flex items-center">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(244, 162, 97, 0.1) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-5 gap-16">
        {/* Form — left 60% */}
        <div className="md:col-span-3">
          <TextReveal
            text="Your empire is waiting. Let's build it together."
            type="wordWipe"
            className="font-accent text-3xl md:text-4xl text-cream mb-12"
          />

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <FloatingInput label="Name" value={name} onChange={setName} />
            <FloatingInput label="Email" type="email" value={email} onChange={setEmail} />
            <FloatingInput label="Company" value={company} onChange={setCompany} />
            <FloatingInput label="Tell us about your project" value={message} onChange={setMessage} multiline />

            <div className="mt-8">
              <Button onClick={handleSubmit}>Send Message</Button>
            </div>
          </form>
        </div>

        {/* Details — right 40% */}
        <div className="md:col-span-2 flex flex-col justify-center gap-8">
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-2">Email</h4>
            <p className="font-body text-cream/70">hello@convotech.pk</p>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-2">Location</h4>
            <p className="font-body text-cream/70">Pakistan</p>
          </div>
          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-2">Social</h4>
            <div className="flex gap-4 text-cream/50">
              <span className="hover:text-gold cursor-pointer transition-colors">LinkedIn</span>
              <span className="hover:text-gold cursor-pointer transition-colors">Twitter</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add components/ScrollStory/ContactZone.tsx
git commit -m "feat: add contact zone at end of scroll story"
```

---

## Phase 4: Navigation & Layout (Task 11)

### Task 11: Navbar + Footer

**Files:**
- Create: `components/Navbar.tsx`, `components/Footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `COLORS` from `lib/colors.ts`
- Produces: Navigation components used across all pages

- [ ] **Step 1:** Create `components/Navbar.tsx`

```tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/industries', label: 'Industries' },
  { href: '/process', label: 'Process' },
  { href: '/partners', label: 'Partners' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-deep-night/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-white hover:text-gold transition-colors">
            ConvoTech
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-body text-sm text-white/60 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/#contact"
              className="font-body text-sm text-gold border border-gold/30 px-4 py-2 hover:bg-gold/10 transition-all"
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="space-y-1.5">
              <div className={`w-6 h-0.5 bg-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Scroll progress bar */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold via-sunrise to-ember"
            style={{ width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}
          />
        )}
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-deep-night/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-3xl text-white hover:text-gold transition-colors"
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="font-display text-3xl text-gold"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2:** Create `components/Footer.tsx`

```tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-deep-night border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-lg text-white/40">
          © 2025 ConvoTech. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-white/30">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <Link href="/industries" className="hover:text-gold transition-colors">Industries</Link>
          <Link href="/about" className="hover:text-gold transition-colors">About</Link>
          <Link href="/#contact" className="hover:text-gold transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3:** Update `app/layout.tsx` to include Navbar and Footer

```tsx
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'ConvoTech — Business Consulting & Technology',
  description: 'Building empires through technology and strategy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-deep-night text-cream antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4:** Commit

```bash
git add components/Navbar.tsx components/Footer.tsx app/layout.tsx
git commit -m "feat: add glass morphism navbar and footer"
```

---

## Phase 5: Inner Pages (Tasks 12-17)

### Task 12: Industries Page

**Files:**
- Create: `app/industries/page.tsx`, `components/industries/IndustryCard.tsx`, `lib/industries.ts`

- [ ] **Step 1:** Create `lib/industries.ts`

```typescript
export const industries = [
  { slug: 'finance', name: 'Finance & Banking', icon: '🏦', description: 'Digital banking, fintech solutions, regulatory compliance.', stats: { clients: 45, projects: 120 } },
  { slug: 'healthcare', name: 'Healthcare', icon: '🏥', description: 'Telemedicine platforms, EHR systems, patient management.', stats: { clients: 30, projects: 85 } },
  { slug: 'real-estate', name: 'Real Estate', icon: '🏗️', description: 'Property management systems, virtual tours, CRM integration.', stats: { clients: 55, projects: 95 } },
  { slug: 'ecommerce', name: 'E-Commerce', icon: '🛒', description: 'Marketplace platforms, inventory management, payment systems.', stats: { clients: 70, projects: 200 } },
  { slug: 'logistics', name: 'Logistics', icon: '🚚', description: 'Fleet management, route optimization, supply chain analytics.', stats: { clients: 25, projects: 60 } },
  { slug: 'manufacturing', name: 'Manufacturing', icon: '🏭', description: 'ERP systems, IoT integration, production optimization.', stats: { clients: 35, projects: 75 } },
];
```

- [ ] **Step 2:** Create `components/industries/IndustryCard.tsx`

```tsx
'use client';
import { Card } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface IndustryCardProps {
  name: string;
  icon: string;
  description: string;
  stats: { clients: number; projects: number };
}

export function IndustryCard({ name, icon, description, stats }: IndustryCardProps) {
  return (
    <Card className="group cursor-pointer">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-display text-xl text-cream mb-2 group-hover:text-gold transition-colors">{name}</h3>
      <p className="font-body text-sm text-white/50 mb-6">{description}</p>
      <div className="flex gap-6 text-sm">
        <div>
          <AnimatedCounter target={stats.clients} className="text-gold text-lg" />
          <span className="text-white/30 ml-1">clients</span>
        </div>
        <div>
          <AnimatedCounter target={stats.projects} className="text-gold text-lg" />
          <span className="text-white/30 ml-1">projects</span>
        </div>
      </div>
    </Card>
  );
}
```

- [ ] **Step 3:** Create `app/industries/page.tsx`

```tsx
import { industries } from '@/lib/industries';
import { IndustryCard } from '@/components/industries/IndustryCard';
import { TextReveal } from '@/components/ScrollStory/TextReveal';

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-deep-night pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <TextReveal text="Industries We Serve" type="wordWipe" className="font-display text-4xl md:text-5xl text-white" />
          <p className="font-body text-white/50 mt-4 max-w-xl mx-auto">
            Deep expertise across sectors. We understand your world so we can transform it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} {...industry} />
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 4:** Commit

```bash
git add app/industries/ components/industries/ lib/industries.ts
git commit -m "feat: add industries page with animated cards"
```

---

### Task 13: Process Page

**Files:**
- Create: `app/process/page.tsx`, `components/process/ProcessTimeline.tsx`, `components/process/ProcessStep.tsx`

- [ ] **Step 1:** Create `app/process/page.tsx` with animated SVG timeline

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { TextReveal } from '@/components/ScrollStory/TextReveal';

const steps = [
  { title: 'Discovery', description: 'We listen. We learn your business, your challenges, your goals.', icon: '🔍' },
  { title: 'Strategy', description: 'We design a roadmap tailored to your vision and market reality.', icon: '📋' },
  { title: 'Design', description: 'User experiences and system architectures that work beautifully.', icon: '🎨' },
  { title: 'Build', description: 'Agile development with transparent milestones and constant communication.', icon: '⚙️' },
  { title: 'Launch', description: 'Deployment, testing, optimization — we ship when it\'s right.', icon: '🚀' },
  { title: 'Support', description: 'Ongoing maintenance, monitoring, and evolution. We don\'t disappear.', icon: '🛡️' },
];

export default function ProcessPage() {
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return;
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const pathLength = lineRef.current.getTotalLength();
      lineRef.current.style.strokeDashoffset = String(pathLength * (1 - scrollPercent));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-deep-night pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <TextReveal text="How We Work" type="wordWipe" className="font-display text-4xl md:text-5xl text-white" />
        </div>

        <div className="relative">
          {/* SVG connecting line */}
          <svg className="absolute left-8 top-0 h-full w-1" style={{ overflow: 'visible' }}>
            <path
              ref={lineRef}
              d="M 4 0 L 4 1000"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f4a261" />
                <stop offset="100%" stopColor="#00b4d8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-8 ml-4">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-deep-night font-bold text-sm shrink-0 relative z-10">
                  {i + 1}
                </div>
                <div>
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <h3 className="font-display text-2xl text-cream mb-2">{step.title}</h3>
                  <p className="font-body text-white/50 max-w-md">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add app/process/ components/process/
git commit -m "feat: add process page with animated SVG timeline"
```

---

### Task 14: Partners Page

**Files:**
- Create: `app/partners/page.tsx`, `components/partners/LogoWall.tsx`

- [ ] **Step 1:** Create `app/partners/page.tsx`

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { TextReveal } from '@/components/ScrollStory/TextReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const partners = [
  { name: 'AWS', logo: '☁️' },
  { name: 'Microsoft Azure', logo: '🔷' },
  { name: 'Google Cloud', logo: '🟢' },
  { name: 'Salesforce', logo: '☁️' },
  { name: 'SAP', logo: '🟠' },
  { name: 'Oracle', logo: '🔴' },
  { name: 'IBM', logo: '🔵' },
  { name: 'Cisco', logo: '🌐' },
];

export default function PartnersPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.partner-card');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(cards, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: stagger(100),
            ease: 'out',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-deep-night pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <TextReveal text="Our Partners" type="wordWipe" className="font-display text-4xl md:text-5xl text-white" />
          <p className="font-body text-white/50 mt-4">Technology partnerships that power our solutions.</p>
        </div>

        <div className="text-center mb-16">
          <AnimatedCounter target={50} suffix="+" className="text-5xl text-gold" />
          <p className="font-body text-white/40 mt-2">Technology Partners Worldwide</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="partner-card bg-midnight/50 backdrop-blur-sm border border-white/5 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-gold/30 hover:shadow-[0_0_30px_rgba(244,162,97,0.1)] transition-all duration-300 cursor-pointer opacity-0"
            >
              <span className="text-4xl">{partner.logo}</span>
              <span className="font-body text-sm text-white/60">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add app/partners/ components/partners/
git commit -m "feat: add partners page with animated logo wall"
```

---

### Task 15: ROI Calculator

**Files:**
- Create: `app/roi-calculator/page.tsx`, `components/roi/CalculatorForm.tsx`, `components/roi/ResultsViz.tsx`

- [ ] **Step 1:** Create `app/roi-calculator/page.tsx`

```tsx
'use client';
import { useState } from 'react';
import { CalculatorForm } from '@/components/roi/CalculatorForm';
import { ResultsViz } from '@/components/roi/ResultsViz';
import { TextReveal } from '@/components/ScrollStory/TextReveal';

export default function ROICalculatorPage() {
  const [results, setResults] = useState<null | {
    savings: number;
    efficiency: number;
    roi: number;
    timeline: string;
  }>(null);

  const handleCalculate = (data: { size: number; spend: number; painPoints: string[] }) => {
    // Simplified calculation — in production, use real formulas
    const savings = Math.round(data.spend * 0.3);
    const efficiency = Math.min(95, 40 + data.painPoints.length * 8);
    const roi = Math.round((savings / data.spend) * 100);
    setResults({ savings, efficiency, roi, timeline: '6-12 months' });
  };

  return (
    <main className="min-h-screen bg-deep-night pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <TextReveal text="ROI Calculator" type="wordWipe" className="font-display text-4xl md:text-5xl text-white" />
          <p className="font-body text-white/50 mt-4">See what ConvoTech can save you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <CalculatorForm onCalculate={handleCalculate} />
          {results && <ResultsViz results={results} />}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2:** Create `components/roi/CalculatorForm.tsx`

```tsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface CalculatorFormProps {
  onCalculate: (data: { size: number; spend: number; painPoints: string[] }) => void;
}

const painPointOptions = [
  'Outdated systems', 'Slow processes', 'Data silos', 'Security concerns',
  'Poor user experience', 'Scaling issues', 'High maintenance costs',
];

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [size, setSize] = useState(50);
  const [spend, setSpend] = useState(100000);
  const [painPoints, setPainPoints] = useState<string[]>([]);

  const togglePain = (point: string) => {
    setPainPoints(prev =>
      prev.includes(point) ? prev.filter(p => p !== point) : [...prev, point]
    );
  };

  return (
    <div className="bg-midnight/50 backdrop-blur-sm border border-white/5 rounded-xl p-8">
      <div className="mb-8">
        <label className="font-display text-sm text-gold mb-2 block">Company Size</label>
        <input
          type="range"
          min="10" max="1000" value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full accent-gold"
        />
        <span className="font-body text-white/40 text-sm">{size} employees</span>
      </div>

      <div className="mb-8">
        <label className="font-display text-sm text-gold mb-2 block">Annual Tech Spend</label>
        <input
          type="range"
          min="10000" max="5000000" step="10000" value={spend}
          onChange={(e) => setSpend(Number(e.target.value))}
          className="w-full accent-gold"
        />
        <span className="font-body text-white/40 text-sm">${spend.toLocaleString()}</span>
      </div>

      <div className="mb-8">
        <label className="font-display text-sm text-gold mb-4 block">Pain Points</label>
        <div className="flex flex-wrap gap-2">
          {painPointOptions.map((point) => (
            <button
              key={point}
              onClick={() => togglePain(point)}
              className={`px-3 py-1.5 rounded-full text-xs font-body border transition-all ${
                painPoints.includes(point)
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-white/10 text-white/40 hover:border-white/20'
              }`}
            >
              {point}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={() => onCalculate({ size, spend, painPoints })}>
        Calculate ROI
      </Button>
    </div>
  );
}
```

- [ ] **Step 3:** Create `components/roi/ResultsViz.tsx`

```tsx
'use client';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Card } from '@/components/ui/Card';

interface ResultsVizProps {
  results: {
    savings: number;
    efficiency: number;
    roi: number;
    timeline: string;
  };
}

export function ResultsViz({ results }: ResultsVizProps) {
  return (
    <div className="space-y-6">
      <Card glowColor="#00b4d8">
        <h4 className="font-display text-sm text-gold mb-1">Projected Annual Savings</h4>
        <AnimatedCounter target={results.savings} prefix="$" className="text-3xl text-white" />
      </Card>

      <Card glowColor="#f4a261">
        <h4 className="font-display text-sm text-gold mb-1">Efficiency Gain</h4>
        <AnimatedCounter target={results.efficiency} suffix="%" className="text-3xl text-white" />
      </Card>

      <Card glowColor="#00fff5">
        <h4 className="font-display text-sm text-gold mb-1">Return on Investment</h4>
        <AnimatedCounter target={results.roi} suffix="%" className="text-3xl text-white" />
      </Card>

      <Card>
        <h4 className="font-display text-sm text-gold mb-1">Expected Timeline</h4>
        <p className="font-body text-2xl text-white">{results.timeline}</p>
      </Card>
    </div>
  );
}
```

- [ ] **Step 4:** Commit

```bash
git add app/roi-calculator/ components/roi/
git commit -m "feat: add ROI calculator with animated results"
```

---

### Task 16: FAQ Page

**Files:**
- Create: `app/faq/page.tsx`, `components/faq/Accordion.tsx`, `lib/faq.ts`

- [ ] **Step 1:** Create `lib/faq.ts`

```typescript
export const faqData = [
  {
    category: 'General',
    items: [
      { q: 'What does ConvoTech do?', a: 'We are a business consulting and technology company. We help businesses transform through strategy, custom software, cloud infrastructure, and data analytics.' },
      { q: 'Where are you based?', a: 'Headquartered in Pakistan, serving clients globally across multiple industries.' },
      { q: 'How long have you been in business?', a: 'We have been building empires for businesses for several years, with a growing portfolio of successful projects.' },
    ],
  },
  {
    category: 'Services',
    items: [
      { q: 'What industries do you serve?', a: 'Finance, Healthcare, Real Estate, E-Commerce, Logistics, and Manufacturing — with deep expertise in each.' },
      { q: 'Do you work with startups?', a: 'Yes. We work with businesses of all sizes, from early-stage startups to established enterprises.' },
      { q: 'What is your engagement model?', a: 'Discovery → Strategy → Design → Build → Launch → Support. We stay with you throughout the journey.' },
    ],
  },
  {
    category: 'Process',
    items: [
      { q: 'How long does a typical project take?', a: 'Depends on scope. Small projects: 4-8 weeks. Large transformations: 3-6 months. We provide timelines during the discovery phase.' },
      { q: 'Do you provide ongoing support?', a: 'Yes. Every engagement includes a support phase. We also offer retainer-based maintenance and monitoring.' },
    ],
  },
];
```

- [ ] **Step 2:** Create `components/faq/Accordion.tsx`

```tsx
'use client';
import { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
}

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button
        className="w-full py-5 flex items-center justify-between text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-display text-cream text-lg">{question}</span>
        <span className={`text-gold text-xl transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="font-body text-white/50 pb-5 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { q: string; a: string }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div>
      {items.map((item, i) => (
        <AccordionItem key={i} question={item.q} answer={item.a} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3:** Create `app/faq/page.tsx`

```tsx
import { faqData } from '@/lib/faq';
import { Accordion } from '@/components/faq/Accordion';
import { TextReveal } from '@/components/ScrollStory/TextReveal';

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-deep-night pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <TextReveal text="Frequently Asked Questions" type="wordWipe" className="font-display text-4xl md:text-5xl text-white" />
        </div>

        {faqData.map((section) => (
          <div key={section.category} className="mb-12">
            <h3 className="font-display text-sm uppercase tracking-widest text-gold mb-6">{section.category}</h3>
            <Accordion items={section.items} />
          </div>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 4:** Commit

```bash
git add app/faq/ components/faq/ lib/faq.ts
git commit -m "feat: add FAQ page with animated accordion"
```

---

### Task 17: About Page

**Files:**
- Create: `app/about/page.tsx`, `components/about/TeamSection.tsx`, `components/about/Timeline.tsx`, `components/about/Mission.tsx`

- [ ] **Step 1:** Create `app/about/page.tsx`

```tsx
import { TeamSection } from '@/components/about/TeamSection';
import { Timeline } from '@/components/about/Timeline';
import { Mission } from '@/components/about/Mission';
import { TextReveal } from '@/components/ScrollStory/TextReveal';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-deep-night pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <TextReveal text="About ConvoTech" type="wordWipe" className="font-display text-4xl md:text-5xl text-white" />
        </div>

        <Mission />
        <Timeline />
        <TeamSection />
      </div>
    </main>
  );
}
```

- [ ] **Step 2:** Create `components/about/Mission.tsx`

```tsx
'use client';
import { TextReveal } from '@/components/ScrollStory/TextReveal';

export function Mission() {
  return (
    <section className="mb-24 max-w-3xl mx-auto text-center">
      <TextReveal
        text="We believe every business deserves technology that works for it — not against it."
        type="characters"
        className="font-accent text-2xl md:text-3xl text-cream/90 leading-relaxed"
      />
      <p className="font-body text-white/40 mt-8 leading-relaxed">
        ConvoTech was founded on a simple idea: technology should be a bridge, not a barrier.
        We combine strategic thinking with technical excellence to build systems that grow with
        your business. From the first consultation to the final deployment, we're partners in
        your empire.
      </p>
    </section>
  );
}
```

- [ ] **Step 3:** Create `components/about/Timeline.tsx`

```tsx
'use client';

const events = [
  { year: '2020', title: 'Founded', description: 'ConvoTech born from a vision to bridge business and technology.' },
  { year: '2021', title: 'First Major Client', description: 'Delivered our first enterprise transformation project.' },
  { year: '2022', title: 'Team Growth', description: 'Expanded to 25+ specialists across strategy, design, and engineering.' },
  { year: '2023', title: 'Global Reach', description: 'Started serving clients across 5+ countries.' },
  { year: '2024', title: '500+ Projects', description: 'Milestone: delivered over 500 successful projects.' },
];

export function Timeline() {
  return (
    <section className="mb-24">
      <h3 className="font-display text-sm uppercase tracking-widest text-gold mb-12 text-center">Our Journey</h3>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold/50 to-transparent" />
        <div className="space-y-12">
          {events.map((event, i) => (
            <div key={i} className="flex items-start gap-8 ml-4">
              <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0 relative z-10" />
              <div>
                <span className="font-display text-gold text-sm">{event.year}</span>
                <h4 className="font-display text-xl text-cream mt-1">{event.title}</h4>
                <p className="font-body text-white/40 mt-1">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4:** Create `components/about/TeamSection.tsx`

```tsx
'use client';
import { Card } from '@/components/ui/Card';

const team = [
  { name: 'Team Member 1', role: 'Founder & CEO', bio: 'Visionary leader with 15+ years in business consulting and technology.' },
  { name: 'Team Member 2', role: 'CTO', bio: 'Technology architect specializing in cloud infrastructure and digital transformation.' },
  { name: 'Team Member 3', role: 'Head of Strategy', bio: 'Strategic thinker who turns market insights into actionable roadmaps.' },
];

export function TeamSection() {
  return (
    <section>
      <h3 className="font-display text-sm uppercase tracking-widest text-gold mb-12 text-center">The Team</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member, i) => (
          <Card key={i} className="text-center">
            <div className="w-20 h-20 rounded-full bg-midnight border border-white/10 mx-auto mb-4 flex items-center justify-center text-2xl">
              {member.name.charAt(0)}
            </div>
            <h4 className="font-display text-lg text-cream">{member.name}</h4>
            <p className="font-body text-sm text-gold mt-1">{member.role}</p>
            <p className="font-body text-xs text-white/40 mt-3">{member.bio}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5:** Commit

```bash
git add app/about/ components/about/
git commit -m "feat: add about page with mission, timeline, and team"
```

---

## Phase 6: Polish & Deploy (Tasks 18-19)

### Task 18: Performance Optimization

- [ ] **Step 1:** Add dynamic imports for Three.js (code-split)

```tsx
// In app/page.tsx, replace static import with:
import dynamic from 'next/dynamic';
const ScrollStory = dynamic(() => import('@/components/ScrollStory/ScrollStory').then(m => ({ default: m.ScrollStory })), { ssr: false });
```

- [ ] **Step 2:** Add `loading.tsx` for each route
- [ ] **Step 3:** Verify Lighthouse score > 90 on homepage
- [ ] **Step 4:** Commit

```bash
git add .
git commit -m "perf: code-split Three.js, add loading states"
```

---

### Task 19: Vercel Deployment Config

- [ ] **Step 1:** Create `vercel.json` if needed (usually not required for Next.js)
- [ ] **Step 2:** Verify `npm run build` passes without errors
- [ ] **Step 3:** Initialize git repo if not already done, push to GitHub
- [ ] **Step 4:** Connect repo to Vercel and deploy
- [ ] **Step 5:** Verify deployment URL works
- [ ] **Step 6:** Commit

```bash
git add .
git commit -m "chore: configure for Vercel deployment"
```

---

## Summary

| Phase | Tasks | Deliverable |
|-------|-------|-------------|
| 1. Foundation | 1-3 | Project scaffold, styles, UI components |
| 2. Animation | 4-5 | Text reveals, Three.js background |
| 3. Scroll Story | 6-10 | Hero, 7 scenes, dark transitions, service cards, contact zone |
| 4. Navigation | 11 | Navbar, footer, layout |
| 5. Inner Pages | 12-17 | Industries, Process, Partners, ROI, FAQ, About |
| 6. Polish | 18-19 | Performance, deployment |

**Total:19 tasks** → ~4-6 hours of implementation time

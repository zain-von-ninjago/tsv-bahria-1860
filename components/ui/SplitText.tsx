'use client';

import { motion } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';
}

export function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.03,
  as: Component = 'span',
}: SplitTextProps) {
  const words = text.split(' ');

  if (!words.length) return <Component className={className}>{text}</Component>;

  return (
    <Component className={`${className} inline-flex flex-wrap`} aria-label={text} style={{ columnGap: '0.35em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-nowrap"
          initial={{ opacity: 0, y: 1.25, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0)' }}
          viewport={{ once: true, amount: 0.3, margin: '-50px' }}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.32, 0.72, 0, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
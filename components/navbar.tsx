'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { PhosphorIcons } from '@/components/icons';

const navLinks = [
  { href: '#why-join-us', label: 'Why Join Us' },
  { href: '#coach', label: 'Meet the Coach' },
  { href: '#success', label: 'Success Stories' },
  { href: '#training', label: 'How We Train' },
  { href: '#waitlist', label: 'Age Groups & Fees' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const navRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('waitlist');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const progress = y / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`liquid-glass fixed top-4 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100vw-1rem)] rounded-full transition-shadow duration-500 ${
          scrolled
            ? 'shadow-[0_20px_60px_-12px_rgba(0,0,0,0.75),0_0_40px_-8px_rgba(0,212,170,0.18),inset_0_1px_0_0_rgba(255,255,255,0.14)]'
            : ''
        }`}
        style={{ padding: '0.6rem 1.25rem' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-8">
          <Link
            href="#top"
            className="flex items-center gap-2.5 group"
            aria-label="TSV Bahria 1860 — back to top"
          >
            <img
              src="/logo/tsv-bahria-1860-nobg.png"
              alt=""
              aria-hidden="true"
              className="h-8 w-8 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_12px_rgba(0,212,170,0.45)]"
            />
            <span className="font-display font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-300 whitespace-nowrap">
              TSV Bahria 1860
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6" role="menubar">
            {navLinks.map((link, i) => {
              const isWaitlist = link.href === '#waitlist';
              return (
                <a
                  key={link.href}
                  href={isWaitlist ? '#waitlist' : link.href}
                  onClick={isWaitlist ? scrollToWaitlist : undefined}
                  className="relative text-small font-medium text-foreground-muted hover:text-foreground transition-colors duration-300 group"
                  role="menuitem"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                  <span className="absolute bottom-[-4px] left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              );
            })}
          </div>

          <a href="#waitlist" onClick={scrollToWaitlist} className="hidden md:inline-flex btn-primary !px-5 !py-2.5 !text-small relative overflow-hidden group/cta">
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover/cta:translate-x-full"
              aria-hidden="true"
            />
            Join Free Waitlist
          </a>

          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <PhosphorIcons.Hamburger
              className={`h-6 w-6 transition-all duration-500 ease-spring ${mobileOpen ? 'rotate-45' : ''}`}
              strokeWidth={2}
            />
          </button>
        </div>

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-accent transition-all duration-1000"
          style={{
            width: `${scrollProgress * 100}%`,
            transformOrigin: 'left',
          }}
          aria-hidden="true"
        />
      </nav>

      <AnimatePresence mode="wait">
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-10 px-6 pb-24"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <button
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <PhosphorIcons.X className="h-6 w-6" strokeWidth={2} />
            </button>

            <nav className="flex flex-col items-center gap-6" role="menubar">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="font-display text-3xl md:text-4xl font-medium text-foreground hover:text-accent transition-colors"
                  role="menuitem"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed bottom CTA on mobile — always visible for one-tap signup */}
      <a
        href="#waitlist"
        onClick={scrollToWaitlist}
        className="md:hidden fixed bottom-4 left-4 right-4 z-40 btn-primary justify-center shadow-2xl"
        aria-label="Join the free waitlist"
      >
        <PhosphorIcons.Whatsapp className="h-5 w-5" strokeWidth={2} />
        Join Free Waitlist
      </a>
    </>
  );
}

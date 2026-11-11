import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#050508',
          elevated: '#0a0a12',
          card: '#0d0d18',
        },
        foreground: {
          DEFAULT: '#f8f8f8',
          muted: '#a0a0b0',
          subtle: '#686878',
        },
        accent: {
          DEFAULT: '#00d4aa',
          soft: '#00d4aa22',
          glow: '#00d4aa44',
        },
        gold: {
          DEFAULT: '#e8c56d',
          soft: '#e8c56d22',
        },
        border: {
          DEFAULT: '#1a1a28',
          strong: '#2a2a3a',
        },
        primary: '#00d4aa',
        secondary: '#e8c56d',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Geist', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3.5rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '600' }],
        'hero-sm': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'section': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.005em' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'small': ['0.875rem', { lineHeight: '1.6' }],
        'micro': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '40': '10rem',
        '48': '12rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
        'pill': '9999px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'spring-slow': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      boxShadow: {
        'double': '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px -4px rgba(0,0,0,0.5)',
        'double-hover': '0 0 0 1px rgba(255,255,255,0.1), 0 8px 32px -4px rgba(0,0,0,0.6)',
        'inner-glow': 'inset 0 1px 1px rgba(255,255,255,0.08)',
        'accent-glow': '0 0 40px -8px rgba(0, 212, 170, 0.4)',
        'gold-glow': '0 0 40px -8px rgba(232, 197, 109, 0.3)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(ellipse at center, var(--tw-gradient-from) 0%, transparent 70%)',
        'mesh-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,212,170,0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(232,197,109,0.1), transparent)',
      },
    },
  },
  plugins: [],
};

export default config;
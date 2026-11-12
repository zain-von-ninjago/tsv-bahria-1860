'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PhosphorIcons } from '@/components/icons';
import { SplitText } from '@/components/ui/SplitText';

// â”€â”€â”€ ReactBits components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
import ScrollVelocity from '@/components/reactbits/ScrollVelocity';
import SwarmCursor from '@/components/reactbits/SwarmCursor';
import CircularCarousel from '@/components/reactbits/CircularCarousel';
import ParticleText from '@/components/reactbits/ParticleText';
// Scanner removed (gray flash fix)
import FlipCard from '@/components/reactbits/FlipCard';
import ScrollExpand from '@/components/reactbits/ScrollExpand';
import InfiniteSpiral from '@/components/reactbits/InfiniteSpiral';
import DepthText from '@/components/reactbits/DepthText';
import AeroShards from '@/components/reactbits/AeroShards';
import { AnatomyLab } from '@/components/anatomy-lab/AnatomyLab';
import { useIsMobile, useIsTouchOnly, useIsDesktop } from '@/components/hooks';

// â”€â”€â”€ Contact constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const WHATSAPP_NUMBER = '4915757292178'; // +49 15757292178
const WHATSAPP_DISPLAY = '+49 1575 7292178';
const EMAIL = 'zainasad@gmail.com';

// â”€â”€â”€ Age â†’ Squad mapping (exact per plan) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function squadForAge(age: number): string {
  if (age <= 8) return 'U9';
  if (age === 9) return 'U10';
  if (age === 10) return 'U11';
  if (age === 11) return 'U12';
  if (age === 12) return 'U13';
  if (age <= 14) return 'U15';
  if (age === 15) return 'U16';
  if (age === 16) return 'U17';
  if (age === 17) return 'U18';
  if (age === 18) return 'U19';
  return 'U23 Senior Transition';
}

// â”€â”€â”€ Training stage data (exact per plan) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function stageForAge(age: number) {
  if (age <= 11) {
    return {
      stage: 'Foundation Stage',
      focus: 'Ball mastery, loving the game, and quick feet.',
      how: 'Zero boring laps. Lots of touches on the ball, 1v1 dribbling games, basic passing, and fun coordination drills to build balance and agility.',
    };
  }
  if (age <= 14) {
    return {
      stage: 'Smart Tactics Stage',
      focus: 'Teamwork, scanning the field, and body shape.',
      how: 'Learning how to pass and move as a unit, look around before receiving the ball, press opponents together, and build safe bodyweight strength.',
    };
  }
  if (age <= 18) {
    return {
      stage: 'High-Intensity Stage',
      focus: 'Pro-league speed, match tactics, and athletic power.',
      how: 'Fast-paced drills teaching the 4 parts of the game (attacking, defending, and fast transitions), position-specific coaching, and structured gym/resistance training to prevent injuries.',
    };
  }
  return {
    stage: 'Pro Transition Stage',
    focus: 'Senior BOL/Landesliga match intensity and peak fitness.',
    how: 'Advanced tactical game plans, high-speed conditioning, full strength & physio programs, and preparing to dominate senior competitive matches.',
  };
}

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const heroFacts = [
  {
    icon: 'Trophy',
    title: '2 out of 2 Players (100%)',
    desc: 'Coached privately by Zain went on to play for European Youth National Teams.',
  },
  {
    icon: 'UsersThree',
    title: 'Ages U9 to U23',
    desc: 'Teams and training for kids, teenagers, young adults, and girls.',
  },
  {
    icon: 'SoccerBall',
    title: 'Pro League Experience',
    desc: 'Coached and played in competitive leagues in Munich.',
  },
  {
    icon: 'Lightning',
    title: 'Pro Club Pathway',
    desc: 'Experience working with elite youth talent pipelines (NLZ).',
  },
] as const;

const comparisonRows = [
  {
    old: 'Running endless laps around the field without touching the ball.',
    ours: 'Every drill uses the ball and teaches you how to think fast in real match situations.',
  },
  {
    old: 'Just throwing a ball on the pitch for a random match with no real coaching.',
    ours: 'Step-by-step coaching on how to pass, move, press, and score as a real team.',
  },
  {
    old: 'No fitness training, no injury care, and no clear plan to help you improve.',
    ours: 'Proper gym and strength training, injury prevention, and fair chances for every hardworking player \u2014 zero politics.',
  },
];

const mentors = [
  {
    name: 'Michael K\u00F6llner',
    role: 'Fitness & Conditioning Staff',
    photo: '/images/kollner.webp',
    init: 'MK',
    background:
      'Top-flight pro manager (coached 1860 Munich & 1. FC N\u00FCrnberg) and former head of the DFB\u2019s national youth talent program.',
    takeaway: 'How to build pro-level stamina, fitness, and youth talent programs.',
  },
  {
    name: 'Oliver Beer',
    role: 'Assistant Coach',
    photo: '/images/oliver-beer.jpg',
    init: 'OB',
    background:
      'Former pro player, youth academy boss, and coach at TSV 1860 Munich and FC Augsburg.',
    takeaway: 'How pro academies run daily training and teach smart positioning.',
  },
  {
    name: 'Rainer Berg',
    role: 'Assistant Coach',
    photo: '/images/rainer-berg.jpg',
    init: 'RB',
    background:
      'Former 1. Bundesliga goalkeeper (1860 Munich, N\u00FCrnberg) and former Bayern Munich II player.',
    takeaway: 'How to organize a rock-solid defense, train goalkeepers, and stay calm in big matches.',
  },
  {
    name: 'Suad Sadovi\u0107',
    role: 'Assistant Coach',
    photo: '/images/suad-sadovic.jpg',
    init: 'SS',
    background: 'Experienced UEFA A-License manager in Bavarian regional leagues.',
    takeaway: 'How to study opponents, plan match tactics, and lead a team.',
  },
  {
    name: 'Josip Hrgovic',
    role: 'Assistant Coach',
    photo: '/images/josip-hrgovic.jpg',
    init: 'JH',
    background: 'Competitive Bavarian league coach.',
    takeaway: 'Running fast-paced, high-energy pitch sessions and preparing squads for matchday.',
  },
];

// Big animated coach showcase (DepthCarousel) â€” crest first, then every mentor portrait
const showcaseItems = mentors.map((m) => ({ src: m.photo as string, title: m.name, subtitle: m.role, alt: m.name }));

const neuriedBoxes = [
  {
    icon: 'Trophy',
    title: 'Won the League & Promoted',
    desc: 'Helped coach the team to win the championship and get promoted to the higher league (BOL).',
  },
  {
    icon: 'UsersThree',
    title: 'Coached Every Age Group',
    desc: 'Coached U9, U10, U11, U12, U13, U15, U16, U17, U18, U19, Assistant Coach for U23, and led Girls\u2019 Football Development.',
  },
  {
    icon: 'Lightning',
    title: 'Pro Youth Pipeline (NLZ)',
    desc: 'Worked in the official talent partnership between TSV Neuried and pro club SpVgg Unterhaching to help top kids move up to pro academies.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Team Physio, Gym Coach & Office Staff',
    desc: 'Worked as the team\u2019s injury physio and gym trainer, and even helped the club office choose and manage their new artificial turf pitches (Kunstrasen).',
  },
] as const;

const playerStories = [
  {
    name: 'Faabian Bozic',
    result: 'National Youth Team Call-Up',
    trained: 'Fast first touch under pressure, looking around before getting the ball (scanning), quick footwork, and 1v1 skills.',
    photo: '/images/fabian-bozic.webp',
  },
  {
    name: 'Matheo Gudelj',
    result: 'Croatian Youth National Team',
    trained: 'Smart positioning on the field, powerful shooting, fast decision-making on the ball, and strength training.',
    photo: '/images/mateo-gudelj.webp',
  },
];

const trainingBoxes = [
  {
    icon: 'Target',
    title: 'Smart Match Tactics (The 4 Parts of the Game)',
    what: 'What it means:',
    desc: 'Football has 4 moments: when we have the ball, when the other team has the ball, the second we win it, and the second we lose it. We teach you exactly where to run and what to do in all 4 moments.',
  },
  {
    icon: 'Lightning',
    title: 'Strength, Speed & Injury Care',
    what: 'What it means:',
    desc: 'You cannot play fast if you are weak or always injured. We teach safe, age-friendly strength exercises, proper warm-ups, and injury care so you stay strong and healthy all season.',
  },
  {
    icon: 'UsersThree',
    title: "Training Built for Your Exact Age (Plus Girls' Teams)",
    what: 'What it means:',
    desc: 'A 9-year-old shouldn\u2019t train like a 19-year-old. Because Coach Zain has coached every single age group from U9 to U23 \u2014 and built girls\u2019 football programs in Bavaria \u2014 every group gets drills made for their exact level.',
  },
  {
    icon: 'Whistle',
    title: 'Training Our Assistant Coaches',
    what: 'What it means:',
    desc: 'Every local coach who joins TSV Bahria 1860 is trained personally by Coach Zain every week. This makes sure every single player on every pitch gets the exact same elite standard of coaching.',
  },
] as const;

const categories = ['Boys\u2019 Team', 'Girls\u2019 Team', '1-on-1 Private Training'];
const positions = ['Goalkeeper', 'Center Back', 'Fullback', 'Central Midfield', 'Winger', 'Striker'];
const levels = ['Beginner', 'School Team', 'Local Academy', 'Club Level'];

// Spiral reel items - non-logo action photos (pic animation folder, then images folder)
const spiralItems = [
  { src: '/images/pic-animation/1860 Munich stands.jpg', alt: '1860 Munich stands' },
  { src: '/images/pic-animation/2000x1125.jpeg', alt: 'Match action' },
  { src: '/images/pic-animation/bb.jpg', alt: 'Training moment' },
  { src: '/images/pic-animation/fan.jpg', alt: 'Fans' },
  { src: '/images/pic-animation/images.jfif', alt: 'Pitch action' },
  { src: '/images/pic-animation/köllner.jpg', alt: 'Michael Köllner' },
  { src: '/images/pic-animation/rainer.jfif', alt: 'Rainer Berg' },
  { src: '/images/pic-animation/rmnga.jpg', alt: 'Matchday' },
  { src: '/images/oliver-beer.jpg', alt: 'Oliver Beer' },
  { src: '/images/suad-sadovic.jpg', alt: 'Suad Sadovic' },
  { src: '/images/josip-hrgovic.jpg', alt: 'Josip Hrgovic' },
  { src: '/images/football-girls-real.jfif', alt: 'U12 girls' },
];

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function HomeClient() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Mobile / touch devices keep the cursor layer mounted but idle, so the page
  // tree is never torn down and rebuilt after hydration.
  const isMobile = useIsMobile();
  const isTouchOnly = useIsTouchOnly();
  const isDesktop = useIsDesktop();

  return (
    <main id="top" className="relative min-h-screen pb-24 md:pb-0">
        <Hero y={heroY} opacity={heroOpacity} reduce={!!reduceMotion} />
        <VelocityTicker />
        <WhyJoinUs />
        <Coach />
        <SuccessStories />
        <MediaMoment />
        <HowWeTrain />
        <HeritageBand />
        {isDesktop && <SpiralReel />}
        <Waitlist />
        <ContactStrip />
      </main>
  );
}

// â”€â”€â”€ Hero background (WebGPU shards when available, acid fallback) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block bg-[#050508]" aria-hidden="true">
      <AeroShards
        className="absolute inset-0"
        shardColor="#0b141a"
        accentColor="#00d4aa"
        backgroundColor="#050508"
        material="glass"
        placement="full"
        count={12}
        speed={0.3}
        glow={0.3}
        vignette={0.7}
        markers="none"
        mouseInteraction={false}
        pulseOnClick={false}
      />
      {/* readability scrims */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050508_88%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

// â”€â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Hero({ y, opacity, reduce }: { y: any; opacity: any; reduce: boolean }) {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-28 pb-16">
      <HeroBackground />
      <motion.div
        className="container-main relative z-10 w-full"
        style={{ y: reduce ? 0 : y, opacity: reduce ? 1 : opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 bg-accent/10 border border-accent/20 text-accent text-micro font-medium tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              KARACHI, PAKISTAN &mdash; REAL PRO-CLUB FOOTBALL TRAINING
            </motion.div>

            <motion.h1
              className="text-hero font-display font-bold tracking-tight text-foreground mb-6 uppercase leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              <SplitText text="Train like a pro." className="block" />
              <span className="text-gradient-accent block">Right here in Karachi.</span>
            </motion.h1>

            <motion.p
              className="text-body-lg text-foreground-muted max-w-xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              TSV Bahria 1860 is not a casual evening time-pass camp. We bring real pro-club training,
              fitness, and smart football tactics to young players in Pakistan.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <a href="#waitlist" className="btn-primary group">
                Join the Free Waitlist
                <PhosphorIcons.ArrowRight
                  className="btn-icon h-10 w-10 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </a>
              <a href="#coach" className="btn-secondary group">
                Meet Coach Zain
                <PhosphorIcons.ArrowDown
                  className="btn-icon h-6 w-6 transition-transform duration-300 group-hover:translate-y-1"
                  strokeWidth={2}
                />
              </a>
            </motion.div>
          </div>

          {/* Right: modern crest + 4 fact boxes */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="sm:col-span-2 flex justify-center mb-2"
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img
                src="/logo/tsv-bahria-1860-modern.webp"
                alt="TSV Bahria 1860 crest"
                decoding="async"
                className="h-40 md:h-52 w-auto drop-shadow-[0_0_60px_rgba(0,212,170,0.35)]"
                whileHover={{ scale: 1.04, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              />
            </motion.div>
            {heroFacts.map((f, i) => {
              const Icon = PhosphorIcons[f.icon];
              return (
                <motion.div
                  key={f.title}
                  className="card-double group"
                  whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="card-inner !p-6 h-full">
                    <div className="h-10 w-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <div className="font-display font-semibold text-foreground mb-1 text-small">{f.title}</div>
                    <p className="text-small text-foreground-muted leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// â”€â”€â”€ Velocity ticker (scroll-velocity marquee) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function VelocityTicker() {
  return (
    <section className="py-5 border-y border-border/40 bg-background-elevated/40 overflow-hidden">
      <ScrollVelocity
        texts={[
          'REAL GERMAN TRAINING \u2014 U9 TO U23 \u2014 GIRLS\u2019 FOOTBALL \u2014 PRO CLUB PATHWAY (NLZ) \u2014 BAHRIA TOWN KARACHI \u2014 TSV BAHRIA 1860 \u2014 ',
        ]}
        velocity={70}
        numCopies={4}
        fadeEdges
        gap={24}
        color="#f8f8f8"
        scrollerClassName="!text-[clamp(1.4rem,3.5vw,2.6rem)] !font-display !font-bold !uppercase !tracking-tight !leading-[1.15] !drop-shadow"
        velocityMapping={{ input: [0, 1400], output: [0, 4.5] }}
        skewWithVelocity={6}
        draggable
      />
    </section>
  );
}

// â”€â”€â”€ Section 2: Why Join Us â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function WhyJoinUs() {
  return (
    <section id="why-join-us" className="section">
      <div className="container-main">
        <div className="text-center mb-16">
          <div className="eyebrow eyebrow-accent mb-6 mx-auto">Why Join Us</div>
          <h2 className="text-section font-display font-bold tracking-tight text-foreground uppercase">
            <SplitText text="What Makes Us Different?" className="block justify-center" />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* The Old Way */}
          <motion.div
            className="card-double"
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="card-inner">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <PhosphorIcons.X className="h-4 w-4 text-red-400" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground-muted uppercase tracking-wide">
                  The Old Way
                </h3>
              </div>
              <p className="text-micro text-foreground-muted mb-6">Normal local academies</p>
              <ul className="space-y-5">
                {comparisonRows.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 pb-5 border-b border-border/40 last:border-0 last:pb-0">
                    <span className="mt-1 h-5 w-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <PhosphorIcons.X className="h-3 w-3 text-red-400" strokeWidth={2.5} />
                    </span>
                    <span className="text-body text-foreground-muted">{r.old}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* The Munich Way */}
          <motion.div
            className="card-double !border-accent/30"
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="card-inner relative overflow-hidden">
              {/* subtle sweep shine */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(105deg,transparent_40%,rgba(0,212,170,0.08)_50%,transparent_60%)]"
                aria-hidden="true"
              />
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <PhosphorIcons.Check className="h-4 w-4 text-accent" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground uppercase tracking-wide">
                  The Munich Way
                </h3>
              </div>
              <p className="text-micro text-accent mb-6 font-medium">TSV Bahria 1860</p>
              <ul className="space-y-5">
                {comparisonRows.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 pb-5 border-b border-border/40 last:border-0 last:pb-0">
                    <span className="mt-1 h-5 w-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <PhosphorIcons.Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
                    </span>
                    <span className="text-body text-foreground">{r.ours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ Section 3: Meet the Coach â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Coach() {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section id="coach" className="section bg-background-elevated/30 overflow-hidden">
      <div className="container-main">
        <div className="text-center mb-16">
          <div className="eyebrow eyebrow-accent mb-6 mx-auto">Meet the Coach</div>
          <h2 className="text-section font-display font-bold tracking-tight text-foreground uppercase">
            <SplitText text="Learn from someone who lived it." className="block justify-center" />
          </h2>
        </div>

        {/* Bio */}
        <motion.div
          className="card-double max-w-4xl mx-auto mb-20"
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="card-inner flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="h-24 w-24 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
              <PhosphorIcons.Whistle className="h-10 w-10 text-accent relative" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-2xl text-foreground mb-1">
                Zain Rizvi Syed
              </h3>
              <div className="text-small text-accent font-medium mb-4">
                Founder, Head Coach &amp; Fitness Trainer
              </div>
              <p className="text-body text-foreground-muted leading-relaxed">
                Up to age 20, Zain played and coached in tough competitive leagues in Bavaria
                (Landesliga and BOL) and trained at a coaching course in Basel, Switzerland.
                He doesn&apos;t just teach football skills &mdash; he is also a trained team physio and
                strength coach who knows how to build strong, fast, injury-free players.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Big animated coach showcase (DepthCarousel) */}
        <div className="mb-3">
          <h3 className="font-display font-semibold text-xl text-foreground uppercase tracking-wide mb-2 text-center">
            Pro Coaches Zain Worked With in Munich
          </h3>
          <p className="text-small text-foreground-muted text-center">
            Real learning, real clubs &mdash; straight from European professional football.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="h-[400px] md:h-[480px]">
            <CircularCarousel
              items={showcaseItems}
              preset="orbit"
              cardWidth={190}
              aspectRatio={4 / 5}
              gap={16}
              curve={0.55}
              tilt={10}
              perspective={1200}
              autoplay={isMobile ? 'off' : 'drift'}
              speed={0.28}
              interval={3200}
              direction="right"
              draggable
              momentum={0.9}
              snap
              pauseOnHover
              focusOnClick
              parallax={0.35}
              captions
              cornerRadius={16}
              depthFade={0.55}
              onChange={(i) => setActiveShowcase(i)}
              className="h-full"
            />
          </div>
          <div className="text-center mt-5 min-h-[3.2rem]">
            <div className="font-display font-semibold text-lg text-foreground">
              {showcaseItems[activeShowcase]?.title}
            </div>
            <div className="text-small text-accent">
              {showcaseItems[activeShowcase]?.subtitle}
            </div>
          </div>
        </div>

        {/* Mentor info cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {mentors.map((m, i) => (
            <motion.div
              key={m.name}
              className="card-double group"
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="card-inner h-full flex flex-col !p-6">
                <div className="flex items-center gap-4 mb-5">
                  {m.photo ? (
                    <motion.img
                      src={m.photo!}
                      alt={m.name}
                      className="h-16 w-16 rounded-full object-cover border border-border"
                      whileHover={{ scale: 1.12, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-display font-semibold text-accent">
                      {m.init}
                    </div>
                  )}
                  <div>
                    <div className="font-display font-semibold text-foreground">{m.name}</div>
                    <div className="text-micro text-foreground-muted">{m.role}</div>
                  </div>
                </div>
                <p className="text-small text-foreground-muted leading-relaxed mb-4 flex-1">
                  {m.background}
                </p>
                <div className="flex items-start gap-2 pt-4 border-t border-border/40">
                  <PhosphorIcons.Check className="h-4 w-4 text-accent shrink-0 mt-0.5" strokeWidth={2} />
                  <p className="text-small text-foreground leading-snug">{m.takeaway}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Part B: TSV Neuried 4 boxes */}
        <div className="mt-20 mb-4">
          <h3 className="font-display font-semibold text-xl text-foreground uppercase tracking-wide mb-2 text-center">
            Real Club Success at TSV Neuried
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {neuriedBoxes.map((b, i) => {
            const Icon = PhosphorIcons[b.icon];
            return (
              <motion.div
                key={b.title}
                className="card-double"
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 2) * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="card-inner !p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-display font-semibold text-foreground">{b.title}</h4>
                  </div>
                  <p className="text-small text-foreground-muted leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ Section 4: Success Stories (scanner backdrop + particle banner + flips) â”€
function SuccessStories() {
  const isMobile = useIsMobile();
  return (
    <section id="success" className="section relative overflow-hidden">
      {/* Subtle animated backdrop (CSS only, no canvas flash) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(0,212,170,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(232,197,109,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="container-main relative">
        {/* Banner */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="card-double overflow-hidden">
            <div className="card-inner text-center !p-10 md:!p-14 relative">
              <div className="text-center mb-8">
                <div className="eyebrow eyebrow-accent mb-6 mx-auto">Success Stories</div>
              </div>
              <div className="relative h-[130px] sm:h-[170px] md:h-[220px] w-full flex items-center justify-center">
                {isMobile ? (
                  <h3 className="font-display font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(1.9rem,8vw,2.6rem)] text-foreground">
                    2 Players.<br />
                    <span className="text-accent">2 National Teams.</span>
                  </h3>
                ) : (
                  <ParticleText
                    className="h-full w-full"
                    text="2 PLAYERS. 2 NATIONAL TEAMS."
                    color="#f8f8f8"
                    highlightColor="#00d4aa"
                    highlightMode="motion"
                    intro="gather"
                    clickBurst={true}
                    pointerRepel={45}
                    repelRadius={90}
                    idleDrift={0.4}
                    glow={true}
                    fontSize="clamp(1.6rem, 5.2vw, 3.4rem)"
                    fontWeight={800}
                    fontFamily="var(--font-display), system-ui, sans-serif"
                  />
                )}
              </div>
              <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto mt-6">
                The best proof of a good coach is how much his players improve. Zain trained two
                players 1-on-1 back in Bavaria, and both of them were chosen for their country&apos;s youth
                national teams.
              </p>
              <p className="hidden md:block text-micro text-foreground-subtle mt-3">
                (The headline is made of live particles &mdash; move your cursor through it, click to bust it up.)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Player flip cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto justify-items-center">
          {playerStories.map((p) => (
            <FlipCard
              key={p.name}
              front={
                <div className="h-full flex flex-col justify-between p-8 text-left">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/25 self-start">
                    <PhosphorIcons.Flag className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    <span className="text-micro font-bold text-accent uppercase tracking-wide">
                      Youth National Team
                    </span>
                  </div>
                  <div>
                    <motion.img
                      src={p.photo!}
                      alt={p.name}
                      className="h-20 w-20 rounded-full object-cover border border-accent/20 mb-4 transition-all duration-300 group-hover:scale-105"
                      whileHover={{ scale: 1.1 }}
                    />
                    <h3 className="font-display font-semibold text-3xl text-white mb-2">{p.name}</h3>
                    <div className="text-body text-foreground-muted">{p.result}</div>
                  </div>
                  <div className="text-micro text-foreground-subtle">Click to see what we trained &rarr;</div>
                </div>
              }
              back={
                <div className="h-full flex flex-col p-8 text-left bg-accent/10">
                  <div className="text-micro text-accent uppercase tracking-wider mb-3 font-medium">
                    What we trained
                  </div>
                  <p className="text-body text-foreground leading-relaxed flex-1">{p.trained}</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                    <PhosphorIcons.Trophy className="h-5 w-5 text-gold shrink-0" strokeWidth={1.5} />
                    <span className="text-small text-foreground-muted">
                      Trained 1-on-1 by Coach Zain before national team selection.
                    </span>
                  </div>
                </div>
              }
              width={320}
              height={380}
              radius={22}
              background="#0d0d18"
              tilt
              glare
              glareOpacity={0.12}
              hoverScale={1.02}
              flipOnClick
              draggable
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ Full-bleed media moment (ScrollExpand) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MediaMoment() {
  return (
    <section className="py-12 md:py-16 bg-background-elevated/30">
      <div className="container-main mb-8 text-center">
        <div className="eyebrow eyebrow-accent mb-6 mx-auto">Inside European Football</div>
        <h2 className="text-section font-display font-bold tracking-tight text-foreground uppercase">
          <SplitText text="This is the level we train for." className="block justify-center" />
        </h2>
      </div>
      <ScrollExpand
        src="/images/football-girls-real.jfif"
        alt="Coach Zain's U12 girls regional cup winning team"
        title="Coach Zain's experience with the U12 girls regional cup winning team."
        scrollHint="Keep scrolling"
        startWidth={44}
        startHeight={54}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.3}
        overlayScrim={0.3}
        useWindowScroll
      />
    </section>
  );
}

// â”€â”€â”€ Section 5: How We Train (+ PaperCrumple interactive) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function HowWeTrain() {
  const isDesktop = useIsDesktop();
  return (
    <section id="training" className="section bg-background-elevated/30">
      <div className="container-main">
        <div className="text-center mb-16">
          <div className="eyebrow eyebrow-accent mb-6 mx-auto">How We Train</div>
          <h2 className="text-section font-display font-bold tracking-tight text-foreground uppercase">
            <SplitText text="What players actually do here" className="block justify-center" />
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {trainingBoxes.map((b, i) => {
            const Icon = PhosphorIcons[b.icon];
            return (
              <motion.div
                key={b.title}
                className="card-double group"
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 2) * 0.12, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="card-inner h-full">
                  <div className="h-11 w-11 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-accent/20 group-hover:rotate-6">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">{b.title}</h3>
                  <div className="text-micro text-accent uppercase tracking-wider mb-2 font-medium">{b.what}</div>
                  <p className="text-body text-foreground-muted leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3D Athlete Biomechanics Lab (desktop only — phones skip it for speed) */}
        {isDesktop && <AnatomyLab />}
      </div>
    </section>
  );
}

// â”€â”€â”€ 1860 Heritage band (DepthText) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function HeritageBand() {
  const isMobile = useIsMobile();
  return (
    <section className="section-tight py-20 md:py-28">
      <div className="container-main text-center">
        <div className="eyebrow eyebrow-accent mb-6 mx-auto">The 1860 Heritage</div>
        <div className="h-[150px] md:h-[230px] w-full flex items-center justify-center mb-8">
          <DepthText
            className="w-full"
            text="1860"
            layers={12}
            faceColor="#f8f8f8"
            depthColor="#00d4aa"
            gradientDepth
            pointerTracking={!isMobile}
            autoOrbit={!isMobile}
            orbitSpeed={0.6}
            hoverPush={26}
            float={!isMobile}
            fontSize="clamp(4.5rem, 16vw, 10rem)"
            fontWeight={800}
            intro
          />
        </div>
        <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
          The academy carries the identity of <span className="text-foreground font-medium">TSV 1860 Munich</span> &mdash;
          the club at the heart of Coach Zain&apos;s coaching journey. Same standards, same
          discipline, now in Karachi.
        </p>
      </div>
    </section>
  );
}

// â”€â”€â”€ InfiniteSpiral reel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SpiralReel() {
  return (
    <section
      className="py-16 border-y border-border/40 bg-background-elevated/30 overflow-hidden"
      aria-hidden="true"
    >
      <div className="h-[380px] md:h-[500px]">
        <InfiniteSpiral
          items={spiralItems}
          speed={0.45}
          animationMode="auto"
          radius={200}
          cardWidth={200}
          cardHeight={150}
          verticalSpacing={64}
          cardsPerTurn={6}
          centerScale={1.15}
          edgeFade={0.08}
          edgeBlur={4}
          grayscale={0.25}
          pauseOnHover
          perspective={1100}
        />
      </div>
      <div className="text-center text-micro text-foreground-subtle uppercase tracking-widest mt-6">
        The TSV Bahria 1860 circle
      </div>
    </section>
  );
}

// â”€â”€â”€ Section 6: Waitlist, Fees & Dynamic Training Guide â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Waitlist() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    category: categories[0],
    position: positions[4],
    strengths: '',
    experience: levels[0],
    injuries: '',
    whatsapp: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactMissing, setContactMissing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const age = parseInt(form.age, 10);
  const validAge = !isNaN(age) && age >= 7 && age <= 23;
  const squad = validAge ? squadForAge(age) : null;
  const stage = validAge ? stageForAge(age) : null;

  const canWhatsapp = form.whatsapp.trim().length >= 6;
  const canEmail = /.+@.+\..+/.test(form.email.trim());

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const buildMessage = () =>
    [
      'TSV BAHRIA 1860 \u2014 FREE WAITLIST SIGN-UP',
      '',
      `Player Name: ${form.name}`,
      `Age: ${age} \u2192 ${squad} Squad (${stage?.stage})`,
      `Category: ${form.category}`,
      `Position: ${form.position}`,
      `Playing Level: ${form.experience}`,
      `Strengths & Weaknesses: ${form.strengths || '\u2014'}`,
      `Past Injuries: ${form.injuries || 'None'}`,
      `WhatsApp: ${form.whatsapp || '\u2014'}`,
      `Email: ${form.email || '\u2014'}`,
    ].join('\n');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validAge) return;
    if (!canWhatsapp && !canEmail) {
      setContactMissing(true);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          age,
          category: form.category,
          position: form.position,
          experience: form.experience,
          strengths: form.strengths,
          injuries: form.injuries,
          whatsapp: form.whatsapp,
          email: form.email,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Submission failed');
      }
      if (canWhatsapp) {
        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`,
          '_blank',
          'noopener,noreferrer'
        );
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="section">
      <div className="container-main">
        <div className="text-center mb-16">
          <div className="eyebrow eyebrow-accent mb-6 mx-auto">Age Groups &amp; Fees</div>
          <h2 className="text-section font-display font-bold tracking-tight text-foreground uppercase">
            <SplitText text="Join the free waitlist" className="block justify-center" />
          </h2>
          <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto mt-4">
            Pick your age and see exactly which team you join and how we train you. No guesswork.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left: fees */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            {[
              {
                badge: 'FREE \u2022 0 PKR',
                badgeClass: 'bg-accent/10 border-accent/20 text-accent',
                title: 'Waitlist & Academy News',
                desc: 'Get first access to trial dates, launch news, and direct updates via WhatsApp and Email.',
              },
              {
                badge: '4,000 PKR \u2022 One-time',
                badgeClass: 'bg-gold/10 border-gold/20 text-gold',
                title: 'Registration (only when you join)',
                desc: 'Paid only after you attend trials and officially join. Covers your fitness & skill test, official player registration, and training equipment (balls, cones, bibs, and goals).',
              },
              {
                badge: '3,000 PKR / month',
                badgeClass: 'bg-white/5 border-border/40 text-foreground',
                title: 'Monthly Training Fee',
                desc: 'All weekly pro-standard pitch sessions, strength and conditioning, and injury prevention care.',
              },
            ].map((f) => (
              <div key={f.title} className="card-double">
                <div className="card-inner !p-6">
                  <span className={`inline-block text-micro font-bold px-3 py-1 rounded-full border mb-4 ${f.badgeClass}`}>
                    {f.badge}
                  </span>
                  <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-small text-foreground-muted leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: interactive card */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="card-double">
              <div className="card-inner !p-7 md:!p-10">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="h-16 w-16 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                      <PhosphorIcons.Check className="h-8 w-8 text-accent" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                      You&apos;re on the list!
                    </h3>
                    <p className="text-foreground-muted max-w-md mx-auto mb-8">
                      WhatsApp should have opened with your details ready to send to Coach Zain.
                      Didn&apos;t open? Use the buttons below.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {canWhatsapp && (
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary !py-3 !px-6 !text-small"
                        >
                          <PhosphorIcons.Whatsapp className="h-5 w-5" strokeWidth={2} />
                          Open WhatsApp Again
                        </a>
                      )}
                      {canEmail && (
                        <a
                          href={`mailto:${EMAIL}?subject=${encodeURIComponent('TSV Bahria 1860 — Free Waitlist Sign-Up')}&body=${encodeURIComponent(buildMessage())}`}
                          className="btn-secondary !py-3 !px-6 !text-small"
                        >
                          <PhosphorIcons.Mail className="h-5 w-5" strokeWidth={2} />
                          Send via Email
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-small text-foreground-muted mb-2">Player&apos;s Legal Full Name *</label>
                        <input
                          required
                          value={form.name}
                          onChange={set('name')}
                          className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                          placeholder="e.g. Ahmed Raza"
                        />
                      </div>
                      <div>
                        <label className="block text-small text-foreground-muted mb-2">
                          Player&apos;s Exact Age * <span className="text-accent">(7&ndash;23)</span>
                        </label>
                        <input
                          required
                          type="number"
                          min={7}
                          max={23}
                          value={form.age}
                          onChange={set('age')}
                          className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                          placeholder="e.g. 11"
                        />
                      </div>
                    </div>

                    {/* Squad badge */}
                    {validAge && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-3 rounded-xl bg-accent/10 border border-accent/25 px-4 py-3"
                      >
                        <PhosphorIcons.Trophy className="h-6 w-6 text-accent shrink-0" strokeWidth={1.5} />
                        <p className="text-small text-foreground">
                          At age <b>{age}</b>, you will play in our <b>{squad} Squad</b>{' '}
                          <span className="text-accent font-medium">({stage?.stage})</span>
                        </p>
                      </motion.div>
                    )}
                    {form.age !== '' && !validAge && (
                      <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/25 px-4 py-3">
                        <PhosphorIcons.X className="h-5 w-5 text-red-400 shrink-0" strokeWidth={2} />
                        <p className="text-small text-foreground">
                          Please enter an age between 7 and 23.
                        </p>
                      </div>
                    )}

                    {/* Dynamic training preview */}
                    {validAge && stage && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-xl bg-white/5 border border-border/50 px-5 py-4 space-y-3"
                      >
                        <div>
                          <div className="text-micro text-accent uppercase tracking-wider font-medium mb-1">
                            Main Focus
                          </div>
                          <p className="text-small text-foreground">{stage.focus}</p>
                        </div>
                        <div>
                          <div className="text-micro text-accent uppercase tracking-wider font-medium mb-1">
                            How Training Works
                          </div>
                          <p className="text-small text-foreground-muted leading-relaxed">{stage.how}</p>
                        </div>
                        {form.category === 'Girls\u2019 Team' && (
                          <div className="pt-3 border-t border-border/40">
                            <div className="text-micro text-accent uppercase tracking-wider font-medium mb-1">
                              Girls\u2019 Football Note
                            </div>
                            <p className="text-small text-foreground-muted leading-relaxed">
                              Boys &amp; girls train to the same elite standard. For Girls\u2019 squads,
                              Coach Zain (who led Girls&apos; Football Development in Bavaria) adds extra
                              focus on female-specific injury prevention (like knee and ankle strength)
                              in a supportive, dedicated environment.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-small text-foreground-muted mb-2">Category *</label>
                        <select
                          aria-label="Category"
                          value={form.category}
                          onChange={set('category')}
                          className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                        >
                          {categories.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-small text-foreground-muted mb-2">Favoured Position *</label>
                        <select
                          aria-label="Favoured Position"
                          value={form.position}
                          onChange={set('position')}
                          className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                        >
                          {positions.map((p) => (
                            <option key={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-small text-foreground-muted mb-2">
                        Your Main Strengths &amp; Weaknesses <span className="opacity-60">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        value={form.strengths}
                        onChange={set('strengths')}
                        className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors resize-none"
                        placeholder="e.g. Fast dribbler and good shooting, but need to improve stamina and left foot"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-small text-foreground-muted mb-2">
                          Current Playing Level *
                        </label>
                        <select
                          aria-label="Current Playing Level"
                          value={form.experience}
                          onChange={set('experience')}
                          className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                        >
                          {levels.map((l) => (
                            <option key={l}>{l}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-small text-foreground-muted mb-2">
                          Any Past Injuries? <span className="opacity-60">(optional)</span>
                        </label>
                        <input
                          value={form.injuries}
                          onChange={set('injuries')}
                          className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground focus:border-accent focus:outline-none transition-colors"
                          placeholder="e.g. None, or a past knee injury"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-small text-foreground-muted mb-2">
                          Parent / Player WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={form.whatsapp}
                          onChange={(e) => { set('whatsapp')(e); setContactMissing(false); }}
                          className={`w-full rounded-xl bg-background border px-4 py-3 text-foreground focus:outline-none transition-colors ${contactMissing ? 'border-red-500/70' : 'border-border focus:border-accent'}`}
                          placeholder="+92 300 0000000"
                        />
                      </div>
                      <div>
                        <label className="block text-small text-foreground-muted mb-2">Email Address</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => { set('email')(e); setContactMissing(false); }}
                          className={`w-full rounded-xl bg-background border px-4 py-3 text-foreground focus:outline-none transition-colors ${contactMissing ? 'border-red-500/70' : 'border-border focus:border-accent'}`}
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-small text-red-400 text-center">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting || !validAge}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <PhosphorIcons.Whatsapp className="h-5 w-5" strokeWidth={2} />
                      {submitting ? 'Sending...' : 'Join the Free Waitlist'}
                    </button>
                    <p className="text-micro text-foreground-muted text-center">
                      Your details go straight to Coach Zain. It&apos;s 100% free.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// â”€â”€â”€ Contact strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ContactStrip() {
  return (
    <section id="contact" className="section-tight bg-background-elevated/30 border-t border-border/40">
      <div className="container-main">
        <div className="text-center mb-12">
          <div className="eyebrow eyebrow-accent mb-6 mx-auto">Contact</div>
          <h2 className="text-section font-display font-bold tracking-tight text-foreground uppercase">
            <SplitText text="Questions? Talk to Coach Zain" className="block justify-center" />
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: PhosphorIcons.Whatsapp,
              label: 'WhatsApp (Fastest)',
              value: WHATSAPP_DISPLAY,
              href: `https://wa.me/${WHATSAPP_NUMBER}`,
            },
            {
              icon: PhosphorIcons.Mail,
              label: 'Email',
              value: EMAIL,
              href: `mailto:${EMAIL}`,
            },
            {
              icon: PhosphorIcons.MapPin,
              label: 'Location',
              value: 'Bahria Town, Karachi',
              href: 'https://maps.google.com/?q=Bahria+Town+Karachi',
            },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-double block group"
            >
              <div className="card-inner text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                  <c.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <div className="text-small text-foreground-muted mb-1">{c.label}</div>
                <div className="text-foreground font-medium">{c.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

# ConvoTech Website — Design Spec

**Date:** 2025-08-25
**Domain:** convotech.pk
**Company:** ConvoTech — Business Consulting & Technology

---

## 1. Overview

A scroll-driven narrative website for a business consulting and technology company. The homepage tells the story of building an empire through7 detailed pixel art scenes, connected by atmospheric dark transitions. Services and Contact are woven directly into the scroll story — appearing as beautifully animated cards during the dark transitions between scenes, so the narrative never breaks. After Scene7, a smooth transition loops back to Scene1 as the landing backdrop with the final CTA and contact form. Custom cursor animations throughout. Heavy typography animations accompany each scene. An About page exists as a separate route.

**Tech Stack:** Next.js 14 (App Router) + React + Three.js + anime.js + Tailwind CSS
**Deployment:** Vercel
**Design Philosophy:** Masterpiece-level animation, warm dawn palette, emotional storytelling

---

## 2. The Story — 7 Scenes

The scroll journey tells a wordless story of building something from nothing. Each scene is a detailed pixel art illustration rendered on an HTML5 Canvas, revealed progressively as the user scrolls. Between scenes, the viewport fades to deep darkness, creating the feeling of time passing and distance.

### Scene 1: "Alone in the Dark"
- **Visual:** A single figure standing on cracked, barren earth. The sky is deep indigo-black. The faintest hint of warm light on the far horizon. Dead trees, scattered rocks. The figure is small, isolated.
- **Mood:** Loneliness, emptiness, the very beginning.
- **Text (animated):** "Every empire starts with a single step into the unknown."
- **Color focus:** Deep indigos (#1a1a2e), muted browns, single warm highlight on horizon.

### Scene 2: "First Light"
- **Visual:** The same landscape, but dawn is breaking. Golden light spills across the cracked ground. The figure is walking forward now, carrying something. A faint blueprint or plan glows in their hands. Long shadows stretch behind them.
- **Mood:** Hope emerging, determination, the first spark.
- **Text (animated):** "When the world sleeps, builders dream."
- **Color focus:** Warm golds (#f4a261) bleeding into the indigo sky, long dramatic shadows.

### Scene 3: "Laying the Foundation"
- **Visual:** The figure is now kneeling, placing the first stone of a structure. Around them, the ground is being cleared. Other figures are beginning to appear in the distance, walking toward the center. Early morning fog. Tools and materials scattered.
- **Mood:** Purpose, craft, the work beginning.
- **Text (animated):** "Foundation is not concrete. It is conviction."
- **Color focus:** Earth tones (#8b6914), warm amber (#e6a817), soft morning fog.

### Scene 4: "Rising Structure"
- **Visual:** A half-built structure dominates the scene. Scaffolding, cranes, workers climbing. The structure is clearly a tower or building. Lights flicker inside some floors. The figure from Scene1 is now overseeing, pointing, directing. Dust and activity everywhere.
- **Mood:** Energy, collaboration, momentum building.
- **Text (animated):** "Ideas become structures. Structures become empires."
- **Color focus:** Steel grays mixed with warm interior lights (#ff9f43), orange safety lights.

### Scene 5: "Network"
- **Visual:** The structure is nearly complete but now we zoom out. We see it's not just one building — it's connected to other buildings via glowing lines (roads, data streams, fiber optics). The landscape has transformed. Trees are growing back. Other people are building their own structures nearby, all connected.
- **Mood:** Connection, ecosystem, technology linking everything.
- **Text (animated):** "No empire stands alone. Every connection is a bridge to what's next."
- **Color focus:** Cyan-blue connection lines (#00b4d8) against warm building lights, green returning to landscape.

### Scene 6: "The Empire"
- **Visual:** Full panoramic cityscape. Glowing windows, tall towers, animated vehicles moving between buildings, data streams flowing through the sky. The original figure stands atop the tallest building, looking out. Stars are visible above. The city stretches to the horizon.
- **Mood:** Achievement, scale, the dream realized.
- **Text (animated):** "From nothing. From doubt. From the dark. Everything."
- **Color focus:** Full warm palette — golds, ambers, teals, with deep navy sky and starfield.

### Scene 7: "Looking Forward"
- **Visual:** The figure turns away from the city view and walks toward a new horizon. Behind them, the city glows. Ahead, a new dawn is breaking — even brighter than Scene 2. The path continues. The story isn't over.
- **Mood:** Aspiration, the journey continues, invitation to join.
- **Text (animated):** "Your empire is waiting. Let's build it together."
- **CTA:** "Start Your Journey →" button appears with a pulse animation.
- **Color focus:** Brilliant gold-white sunrise, the warmest moment in the entire scroll.

### Scene 7 → Landing Transition (Loop Back to Scene 1)

After Scene7, instead of fading to a plain dark contact zone, the scroll **smoothly transitions back to Scene1's pixel art** — the same lone figure on cracked earth at dawn. But this time, the figure is not alone. The city from Scene6 is now visible in the far background, glowing. The figure stands facing the viewer, hand extended. This creates a powerful cyclical narrative: the empire was built, and now the viewer is invited to take that hand.

The Scene1 backdrop serves as the landing/contact section background. Overlaid on this pixel art:
- The contact form (left 60%)
- Company details (right 40%)
- The text "Your empire is waiting. Let's build it together." remains visible above the form
- The cursor changes to a warm glow when hovering over the form

**Technical:** The Scene1 canvas is re-rendered with modifications (city in background, figure facing viewer) and pinned while the user fills out the contact form.

---

## 3. Dark Transitions Between Scenes

Between each scene, the viewport fades to near-black over approximately 1.5-2 viewport heights of scroll distance. These transitions serve dual purpose:

1. **Atmospheric separation** — time passing, emotional breathing room, the feeling of a longer journey
2. **Service & contact integration** — beautiful animated cards appear in the darkness, emerging from the void as if they were always part of the story

### Transition Anatomy

Each transition zone is 1.5vh of scroll:
- **0-30%:** Previous scene fades to black, ambient particles drift
- **30-70%:** Content zone — service cards or contact elements animate in from the sides, floating in the dark void with subtle glow
- **70-100%:** Content fades, next scene begins emerging from darkness

The pixel art canvas fades opacity; ambient particles (dust, light motes, embers) float throughout. Service cards appear to be floating in the same dark space as the story — they don't feel like UI, they feel like part of the world.

---

## 4. Color Palette — "Warm Dawn"

| Name | Hex | Use |
|------|-----|-----|
| Deep Night | #0a0a1a | Darkest backgrounds, transition zones |
| Midnight | #1a1a2e | Scene backgrounds, secondary dark |
| Indigo | #2d2b55 | Sky gradients, accent dark |
| Earth | #8b6914 | Ground, foundations, organic elements |
| Amber | #e6a817 | Warm highlights, golden hour light |
| Gold | #f4a261 | Primary warm accent, dawn light |
| Sunrise | #ff9f43 | Bright warm highlights, CTAs |
| Ember | #e74c3c | Rare accent, energy, fire |
| Teal | #00b4d8 | Technology accent, connection lines |
| Cyan Glow | #00fff5 | Data streams, tech highlights (sparse) |
| Cream | #fdf6e3 | Light text on dark backgrounds |
| White | #ffffff | Headlines, high-contrast text |

**Dominant:** Deep Night + Gold/Amber. The site should feel like 80% darkness, 20% warm light.

---

## 4b. Service Cards — Integrated Into the Story

Services appear as floating cards during the dark transitions between scenes. Each card is thematically tied to the story moment it follows. Cards alternate left/right across transitions for visual rhythm.

### Card Design
- **Style:** Glass morphism — frosted dark background (#0a0a1a at 80% opacity), backdrop-blur, subtle warm border glow
- **Size:** ~350px wide, ~200px tall
- **Icon:** Small animated icon (glowing line art, not filled) in the card's accent color
- **Title:** Space Grotesk, 18px, cream color, word-wipe animation
- **Description:** Inter, 14px, muted cream, split-fade animation
- **Accent line:** Thin 2px gradient line at top of card (warm palette)
- **Entrance:** Card slides in from the side (alternating left/right) with a slight rotation, opacity fades from 0, subtle scale from 0.95 → 1.0
- **Mouse hover:** Card tilts slightly (3D perspective), border glow intensifies, background lightens

### Service Placement

| Transition | After Scene | Service Card | Position | Theme Tie |
|------------|-------------|--------------|----------|-----------|
| Dark 1→2 | Scene 1 (Alone) | — | — | No card — pure atmosphere |
| Dark 2→3 | Scene 2 (First Light) | **Strategy Consulting** | Left | The figure just had their first vision |
| Dark 3→4 | Scene 3 (Foundation) | **Digital Transformation** | Right | Transforming the raw plan into reality |
| Dark 4→5 | Scene 4 (Rising) | **Technology Solutions** | Left | Technology powering the construction |
| Dark 5→6 | Scene 5 (Network) | **Cloud Infrastructure** + **Data Analytics** | Both sides | The network needs cloud + data |
| Dark 6→7 | Scene 6 (Empire) | **Cybersecurity** | Right | Protecting what was built |
| Dark 7→End | Scene 7 (Forward) | **Contact Form** | Center | The journey ends with a connection |

### Service Card Content

Services are grouped into 6 categories, each mapping to a story moment. Full service lists available in `lib/services.ts`.

**Strategy & Planning** (after Scene 2 — "First Light")
Corporate Strategy Development, Business Model Design, Market Entry & Expansion, Growth Strategy, Strategic Planning Workshops, Process Mapping & Documentation, Process Redesign & Optimization, Workflow Standardization, SOP Development, Bottleneck Analysis
Icon: Compass/target line art
Tagline: "We help businesses define their vision and build the roadmap to get there. From market analysis to operational restructuring — we turn ambition into action."

**Digital Transformation** (after Scene 3 — "Foundation")
Digital Transformation Strategy, AI Readiness Assessment, AI Use-Case Identification, AI Adoption & Implementation, ERP/CRM Selection, Digital Problem Solving, Business Intelligence & Dashboarding, Process Automation (RPA/AI)
Icon: Gear transforming into circuit
Tagline: "Legacy systems holding you back? We modernize your tech stack, workflows, and digital presence — without disrupting what already works."

**Technology Solutions** (after Scene 4 — "Rising Structure")
IT Strategy Consulting, Cloud Adoption Advisory, Data Governance & Analytics, FinTech Process Optimization, Digital Banking Advisory, Cybersecurity Advisory
Icon: Building blocks / modular grid
Tagline: "Custom software, integrations, and systems built around your business — not the other way around. Scalable. Reliable. Yours."

**Cloud & Data** (after Scene 5 — "Network")
Cloud Infrastructure, Data Analytics, Business Intelligence, ERP/CRM Implementation, API Architecture, Open Banking Enablement
Icon: Cloud with connection nodes
Tagline: "Migrate, scale, and operate on modern cloud architecture. We design the infrastructure that grows with you."

**Cybersecurity & Compliance** (after Scene 6 — "Empire")
Cybersecurity Advisory, Compliance Health Check, Internal Control System Design, Regulatory Compliance Support, Internal Audit Setup, Fraud Investigation, IT Audits & ITGC Reviews, ESG Internal Controls
Icon: Shield with lock
Tagline: "Your empire needs walls. We audit, harden, and monitor your systems so you can build without fear."

**Operations & People** (alternative placement — can appear in any transition)
Operational Efficiency, Supply Chain Optimization, Quality Control, Cost Reduction, Productivity Improvement, HR Process Design, Talent Strategy, Leadership Development, Change Management, Organizational Restructuring
Icon: People/gear network
Tagline: "We optimize how your people, processes, and operations work together — so everything runs faster, leaner, and smarter."

---

## 4c. Contact Zone — End of Scroll (Scene 1 Loop-Back)

After Scene7, instead of fading to a plain dark section, the scroll **smoothly transitions back to Scene1's pixel art** — but modified. The lone figure now faces the viewer with an extended hand. The city from Scene6 glows in the far background. The empire was built, and now the viewer is invited to take that hand.

This modified Scene1 canvas serves as the backdrop for the contact section. Overlaid on this pixel art:
- **Left side (60%):** Contact form with floating labels, warm glow accents
- **Right side (40%):** Company details, social links, a small map placeholder
- **Above the form:** "Your empire is waiting. Let's build it together." in Playfair Display with character-reveal animation
- The cursor changes to a warm glow when hovering over the form

### Form Design
- **Fields:** Name, Email, Company, Message — floating labels that rise on focus
- **Input style:** Transparent background, bottom-border only (warm gold on focus)
- **Submit button:** Warm gradient fill animation on hover, scale spring on click
- **Validation:** Animated error messages (slide in from below)
- **Success state:** Form fades out, replaced by "Message sent. We'll be in touch." with a warm pulse animation

### Atmosphere
- The contact zone feels like the "campfire" at the end of the journey — warm, inviting, safe
- The pixel art backdrop creates continuity with the story — the user is still inside the narrative
- Subtle ambient glow behind the form (radial gradient, very soft)
- Particle density is lowest here — calm, settled, at peace

---

## 5. Typography

### Font Stack
- **Display / Headlines:** "Space Grotesk" (Google Fonts) — geometric, modern, techy but warm
- **Body / UI:** "Inter" (Google Fonts) — clean, readable, neutral
- **Accent / Story text:** "Playfair Display" (Google Fonts) — serif, emotional, editorial

### Animation Types (text)
All text on the site animates. No static text exists.

1. **Character Reveal** — Letters appear one by one with a slight upward slide. Used for scene story text.
2. **Word Wipe** — Words reveal left-to-right with a clip-path mask. Used for section headers.
3. **Split Fade** — Text splits into lines that fade in sequentially. Used for body paragraphs.
4. **Typewriter** — Classic type-on effect with cursor. Used for CTAs and taglines.
5. **Scale Pop** — Text scales from 0 to 1 with elastic easing. Used for numbers/stats.
6. **Glitch** — Brief digital distortion effect. Used for tech-related headings.
7. **Gradient Flow** — Animated gradient on text fill. Used for hero text on non-scroll pages.

---

## 6. Pixel Art Approach

### Rendering
- Each scene is a high-resolution pixel art illustration drawn on an HTML5 Canvas
- Canvas size: 1920x1080 base (rendered at 2x for retina = 3840x2160 internal)
- Pixel art style: detailed but clearly pixelated (not vector, not photorealistic)
- Target: each scene should feel like a beautifully detailed pixel art painting — think Hollow Knight background art or Fez landscapes, but warmer

### Generation
- Pixel art will be procedurally generated using Canvas 2D API
- Each scene has a layered structure: background → midground → foreground → character → effects
- Parallax scrolling within each scene (layers move at different speeds)
- Animated elements within scenes: flickering lights, moving clouds, flowing water/data streams, particle effects

### Integration with Three.js
- The pixel art canvas is used as a texture on a Three.js plane
- Three.js adds: depth of field blur, ambient particles (dust, light motes, embers), volumetric light rays, fog
- This combines the handcrafted pixel art feel with modern 3D atmosphere

---

## 7. Animation System

### Scroll Engine
- Custom scroll handler (not native CSS scroll-snap)
- Smooth interpolation between scroll position and scene state
- Each scene has a timeline that maps scroll progress (0→1) to animation state
- GSAP ScrollTrigger for scroll-linked animations

### Per-Scene Animation Timeline
When a scene enters the viewport:
1. Background fades in (0-20% scroll)
2. Pixel art layers reveal with parallax (10-60%)
3. Animated elements activate (20-80%)
4. Text begins character-by-character reveal (30-70%)
5. Text completes, scene holds (70-90%)
6. Scene fades to dark transition (90-100%)

### Ambient Effects
- **Dust particles:** Float throughout all scenes, density increases in later scenes
- **Light motes:** Golden particles in dawn scenes, cyan in tech scenes
- **Fog:** Procedural fog using layered gradients with slow drift
- **Vignette:** Subtle dark vignette on all scenes, intensifies during transitions

### UI Animations
- **Navbar:** Glass morphism background that appears on scroll. Links have underline slide animation on hover. Logo has a subtle glow pulse.
- **Buttons:** Fill animation on hover (warm gradient slides in from left). Scale with spring physics on click.
- **Cards:** Tilt on mouse move (3D perspective). Glow border on hover.
- **Page transitions:** Content slides out, brief dark pause, new content slides in.

### Cursor Animations
Custom cursor system throughout the site — the default OS cursor is hidden and replaced with a custom animated cursor:

- **Default state:** Small warm gold circle (8px) with a subtle trailing glow (16px outer ring, fades with delay)
- **Hovering links/buttons:** Cursor scales up to 1.5x, inner dot becomes the accent color (sunrise), outer ring expands
- **Hovering cards:** Cursor gets a soft radial glow that follows the mouse position on the card (like a flashlight effect)
- **In dark transitions:** Cursor becomes a single dim ember dot — minimal, atmospheric
- **Over pixel art scenes:** Cursor leaves a brief trail of tiny golden particles that fade quickly
- **Over form inputs:** Cursor changes to a text beam (vertical line) with warm glow
- **Click state:** Brief burst animation — the cursor ring pulses outward and fades

**Technical:** Custom `<Cursor />` component tracks mouse position via `mousemove`. Uses `requestAnimationFrame` for smooth trailing. CSS `mix-blend-mode: difference` for visibility on all backgrounds. The native cursor is hidden via `cursor: none` on `body`.

---

## 8. Page Structure

### Homepage (`/`) — The Entire Experience
- **Hero:** Company name "ConvoTech" in large animated text, tagline fades in below. Background: subtle animated gradient (dark indigo → gold). Scroll indicator arrow pulses at bottom.
- **Scroll Story:** The7 pixel art scenes with service cards and contact woven into the dark transitions. This IS the homepage — the entire page is the story.
  - Scene1 → Dark → Scene2 → Dark + **Strategy Consulting** card → Scene3 → Dark + **Digital Transformation** card → Scene4 → Dark + **Technology Solutions** card → Scene5 → Dark + **Cloud Infrastructure** + **Data Analytics** cards → Scene6 → Dark + **Cybersecurity** card → Scene7 → Dark → **Contact Zone** → Footer
- **Footer:** Minimal, social links, copyright.

### About (`/about`)
- Team section with hover-reveal bios
- Company timeline (animated vertical timeline with scroll)
- Mission/Vision with split-text animations
- Same animation quality as homepage (text reveals, parallax, warm palette)

### No separate Services or Contact pages
Everything is in the scroll story. The navbar links to `/about` and scrolls to the relevant section on the homepage for services/contact.

### Industries (`/industries`)
- Animated grid of industry cards (Finance, Healthcare, Real Estate, E-commerce, Logistics, Manufacturing)
- Each card has an icon, title, brief description, and "Learn More" link
- Clicking a card expands into a mini-landing with relevant stats, case study snippets, and tailored messaging
- Same dark/warm palette, cards have glass morphism + tilt animation
- Stats animated with scale-pop counters

### Process / How We Work (`/process`)
- Full-page animated timeline showing the engagement model
- Steps: Discovery → Strategy → Design → Build → Launch → Support
- Each step is a full viewport section with its own illustration/icon, title, description
- Steps connect with an animated line that draws as you scroll (SVG path animation)
- Scroll-linked: each step activates as you scroll past it
- Warm palette, consistent with homepage aesthetic

### Partners / Ecosystem (`/partners`)
- Logo wall with animated reveal (logos fade in staggered, with subtle float animation)
- Categories: Technology Partners (AWS, Azure, Google), Tool Partners (various)
- Each logo has a hover state (scale up, glow, tooltip with partnership details)
- Background: subtle animated gradient (deep indigo → midnight)
- Stats row: "Trusted by X+ partners" with animated counter

### ROI Calculator (`/roi-calculator`)
- Interactive single-page tool
- User inputs: company size, current tech spend, pain points (multi-select), goals
- Animated slider inputs with warm accent colors
- Results: animated data visualization (charts, counters) showing projected savings, efficiency gains, ROI timeline
- CTA: "Let's discuss your results →" links to contact zone on homepage
- Background: dark with subtle particle drift

### FAQ (`/faq`)
- Animated accordion with smooth expand/collapse
- Categories: General, Services, Pricing, Process, Technical
- Each answer reveals with a split-fade animation
- Search/filter bar at top with animated underline
- Background: dark with warm vignette

---

## 9. Navigation

- **Fixed top navbar:** Glass morphism (backdrop-blur), transparent initially, gains background on scroll
- **Logo:** "ConvoTech" in Space Grotesk, subtle glow
- **Links:** Home (scrolls to top), Industries (`/industries`), Process (`/process`), Partners (`/partners`), About (`/about`), Contact (scrolls to contact zone on homepage) — underline slide animation on hover
- **Mobile:** Hamburger menu with full-screen overlay. Menu items stagger-animate in. Sub-items collapsible.
- **Scroll progress:** A thin warm gradient progress bar at the very top of the viewport showing scroll position through the entire story (homepage only)

---

## 10. Business Value — Attracting Clients

Beyond the scroll story, these elements build credibility:

1. **Trust signals:** Client logos (placeholder initially), "Trusted by X+ businesses"
2. **Stats section:** Animated counters — "500+ Projects", "98% Satisfaction", "24/7 Support"
3. **Case studies:** Card grid with hover animations showing past work
4. **Testimonials:** Carousel with smooth transitions
5. **CTA sections:** Between major content blocks, warm CTA banners
6. **Contact accessibility:** Floating WhatsApp/contact button (bottom-right)

---

## 11. Performance Budget

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total bundle size | < 500KB gzipped |
| Pixel art assets | Pre-generated, lazy-loaded per scene |
| Three.js | Only loaded on homepage scroll section |
| Animation frame rate | 60fps stable |

- Pixel art canvases are pre-rendered and cached
- Three.js scene initializes only when scroll section is in view
- About page doesn't load Three.js or pixel art assets
- Service cards are lightweight (CSS + minimal JS) — no heavy dependencies
- All fonts use `font-display: swap`

---

## 12. File Structure

```
convotech/
├── app/
│   ├── layout.tsx              # Root layout, fonts, navbar
│   ├── page.tsx                # Homepage — hero + scroll story + contact zone
│   ├── about/page.tsx          # About page
│   ├── industries/
│   │   ├── page.tsx            # Industries grid
│   │   └── [slug]/page.tsx     # Individual industry landing
│   ├── process/page.tsx        # How We Work — animated timeline
│   ├── partners/page.tsx       # Partners / Ecosystem — logo wall
│   ├── roi-calculator/page.tsx # Interactive ROI calculator
│   ├── faq/page.tsx            # FAQ accordion
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ScrollStory/
│   │   ├── ScrollStory.tsx          # Main scroll container + timeline
│   │   ├── Scene.tsx                # Individual scene wrapper
│   │   ├── DarkTransition.tsx       # Fade-to-dark + service card slot
│   │   ├── PixelArtCanvas.tsx       # Canvas renderer for pixel art
│   │   ├── ThreeBackground.tsx      # Three.js atmospheric effects
│   │   ├── TextReveal.tsx           # Animated text component (7 types)
│   │   ├── ServiceCard.tsx          # Glass morphism service card
│   │   ├── ContactZone.tsx          # End-of-scroll contact section
│   │   └── scenes/                  # Per-scene pixel art generators
│   │       ├── scene1.ts            # Alone in the Dark
│   │       ├── scene2.ts            # First Light
│   │       ├── scene3.ts            # Laying the Foundation
│   │       ├── scene4.ts            # Rising Structure
│   │       ├── scene5.ts            # Network
│   │       ├── scene6.ts            # The Empire
│   │       └── scene7.ts            # Looking Forward
│   ├── industries/
│   │   ├── IndustryCard.tsx         # Animated industry card
│   │   └── IndustryHero.tsx         # Industry-specific hero
│   ├── process/
│   │   ├── ProcessTimeline.tsx      # Animated SVG timeline
│   │   └── ProcessStep.tsx          # Individual step component
│   ├── partners/
│   │   └── LogoWall.tsx             # Animated logo grid
│   ├── roi/
│   │   ├── CalculatorForm.tsx       # Input sliders/selects
│   │   └── ResultsViz.tsx           # Animated results charts
│   ├── faq/
│   │   └── Accordion.tsx            # Animated FAQ accordion
│   ├── ui/
│   │   ├── Button.tsx               # Animated button (fill, spring)
│   │   ├── Card.tsx                 # Base card with tilt/glow
│   │   ├── FloatingInput.tsx        # Floating label form input
│   │   └── AnimatedCounter.tsx      # Number counter animation
│   └── about/
│       ├── TeamSection.tsx
│       ├── Timeline.tsx
│       └── Mission.tsx
├── lib/
│   ├── animations.ts           # Shared animation utilities
│   ├── pixel-art.ts            # Pixel art generation helpers
│   ├── colors.ts               # Color palette constants
│   ├── services.ts             # Service card data (title, desc, icon)
│   ├── industries.ts           # Industry data and content
│   └── faq.ts                  # FAQ data
├── public/
│   └── fonts/
├── tailwind.config.ts
├── next.config.js
└── package.json
```

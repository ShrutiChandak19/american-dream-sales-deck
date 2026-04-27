# American Dream — Interactive Sales Deck

A fully interactive, browser-based sales deck for **American Dream** (East Rutherford, NJ) — the largest mall in the Western Hemisphere by GLA. Built as a high-impact pitch tool for retail tenants, brand sponsors, and event producers.

**Live URL:** _[Deploy to Netlify/Vercel and add link here]_

---

## What This Is

A purpose-built commercial pitch experience — not a static website. Think of it as a Digideck with the visual polish of a luxury brand and the interactivity of a modern SPA.

Key capabilities:
- **Perspective-switching** — The entire deck adapts its narrative and CTAs based on who's viewing: retail tenant, brand partner, or event producer
- **Non-linear navigation** — Dot navigation (right rail), icon sidebar, and TopNav all allow non-sequential exploration
- **Video-first storytelling** — Lazy-loaded, intersection-observer-gated background video across all sections
- **ROI Calculator** — Interactive projection tool using American Dream's verified 40M+ annual visitor base
- **Auto-tour mode** — Guided playback with NarrativeHUD for live sales calls
- **Leasing Panel** — Full-screen slide-out for retail/brand/event inquiry with segment-specific content

---

## Property: American Dream

- **Location:** East Rutherford, NJ — 5 miles from Manhattan
- **Size:** 3+ million sq ft
- **Anchors:** Nickelodeon Universe (largest indoor theme park in Western Hemisphere), DreamWorks Water Park, Big SNOW (North America's first indoor real-snow ski center), SEA LIFE Aquarium, Saks Fifth Avenue, The Avenue luxury wing (Hermès, Dior, Gucci)
- **Catchment:** 20M+ people within 1-hour drive; $150k+ avg household income
- **Visitors:** ~40M annually, projected 75M+ by 2026

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion (motion/react) |
| Charts | Recharts |
| Icons | Lucide React |
| Fonts | Playfair Display (headings) + Cormorant Garamond (body) |

---

## Design Decisions

**Typography:** Playfair Display for display headings (authority, heritage) paired with Cormorant Garamond for body copy (luxury fashion editorial feel). Both are serif — a deliberate break from the Inter/Roboto defaults that would undermine the luxury positioning.

**Color System:** Black canvas with `#D4AF37` gold as the single accent. Gold communicates premium; the restrained use of it (only for accents, CTAs, and active states) ensures it never cheapens. White is reserved for statistics and headlines that need maximum legibility.

**Perspective System:** A `PerspectiveContext` drives content variation across all sections. On load, a full-screen modal asks the viewer to self-identify as Retail Tenant, Brand Partner, or Event Producer. Every subsequent section — hero copy, stats, CTAs, the floating action button — adapts accordingly. This mirrors how a skilled sales rep would tailor their pitch in a live call.

**Snap Scrolling Architecture:** Each section is a full-viewport snap point. An `IntersectionObserver` on the scroll container (not the document) tracks the active section, updating the sidebar, dot navigation, and NarrativeHUD in sync.

**Video Performance:** All `VideoBackground` instances are lazy — they don't load or play until their section enters the viewport. The scroll container is passed as the `IntersectionObserver` root so trigger timing is accurate within the snap container.

**Modular Section Architecture:** Each section is a self-contained component accepting a `scrollContainer` ref and an optional `onOpenLeasing` callback. This makes sections independently testable and the overall layout easily reorderable.

---

## AI Tools Used

- **Midjourney v6** — Generated supplementary architectural renders of luxury retail environments and convention hall concepts where stock photography was insufficient
- **ChatGPT-4o** — Used for copywriting iterations on section headlines and narrative HUD text
- **Claude** — Architecture review, component structure planning, and code quality audit
- **Runway ML** — Video speed-ramp effects on the hero background clip

---

## Setup & Running Locally

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build

# Preview production build
npm run preview
```

No API keys or environment variables required.

---

## Deployment (Netlify)

```bash
npm run build
# Drag the /dist folder to Netlify drop zone at app.netlify.com/drop
# Or connect GitHub repo for auto-deploy
```

For Vercel:
```bash
npx vercel --prod
```

The build output is in `/dist`. No server-side rendering — pure static SPA.

---

## Project Structure

```
src/
├── App.tsx                    # Root layout, scroll state, section orchestration
├── index.css                  # Tailwind theme, snap-scroll container, fonts
├── lib/
│   ├── PerspectiveContext.tsx  # Global perspective state (retail/brand/event)
│   └── utils.ts               # cn() helper
└── components/
    ├── BigStatement.tsx        # Full-viewport stat callout
    ├── DotNavigation.tsx       # Right-rail section dots
    ├── ExploreInterest.tsx     # Interest-based navigation cards
    ├── FloatingCTA.tsx         # Fixed action button (perspective-aware)
    ├── LeasingPanel.tsx        # Full-screen inquiry slide-out
    ├── NarrativeHUD.tsx        # Auto-tour narrative overlay
    ├── PerspectiveModal.tsx    # Onboarding perspective chooser
    ├── Sidebar.tsx             # Left icon nav with magnetic effect
    ├── TopNav.tsx              # Fixed top bar with section links
    ├── VideoBackground.tsx     # Lazy-loaded, IntersectionObserver-gated video
    └── sections/
        ├── IntroSection.tsx    # Hero with hotspots, video progress ring
        ├── LocationSection.tsx # Market reach, demographics
        ├── RetailSection.tsx   # Traffic data, area chart
        ├── LuxurySection.tsx   # The Avenue luxury wing
        ├── LifestyleSection.tsx # Dining & lifestyle
        ├── EntertainmentSection.tsx # Nickelodeon Universe, DreamWorks, Big SNOW
        ├── ConventionSection.tsx    # Convention/expo capabilities
        ├── VenueTechModule.tsx      # Technical venue specs
        ├── EventsSection.tsx        # Event calendar & booking
        ├── SponsorshipSection.tsx   # Partnership tiers
        ├── ROIModule.tsx            # Interactive ROI calculator
        └── FooterSection.tsx        # Contact & navigation
```

---

## What I'd Improve With More Time

1. **Real video assets per section** — Source 6–8 distinct clips from American Dream's YouTube/press kit. Currently one hero clip serves all sections; distinct video per section would dramatically improve the "video-first" mandate.
2. **Real demographic data visualization** — Replace the static chart in RetailSection with a live-fetching data story showing actual 2023–2025 traffic growth from reported figures.
3. **Lighthouse optimization** — Add a CDN-hosted video (Cloudflare R2 or Bunny CDN) to eliminate the 21MB asset load, implement `<link rel="preload">` for above-fold assets, and add a service worker for offline capability.
4. **Leasing Panel form submission** — Connect to a real CRM endpoint (HubSpot, Salesforce) so inquiries are captured and tracked.
5. **Analytics** — Add Segment/Mixpanel to track perspective selection, section dwell time, and CTA clicks — the data a sales team actually needs.

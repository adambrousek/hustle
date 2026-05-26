# HUSTLE — Typographic scroll prototype

Bold single-page prototype for HUSTLE, a Czech social media and content agency.

## Setup

1. Place **HW Topol Bold.otf** in `public/fonts/HW Topol Bold.otf`
2. Install dependencies and run:

```bash
npm install
npm run dev
```

## Stack

- React + Vite
- GSAP ScrollTrigger (background washes + vertical parallax)
- Plain CSS (`src/styles.css`)

## Structure

- `src/App.jsx` — page sections and content
- `src/hooks/useScrollEffects.js` — ScrollTrigger background + parallax
- `src/data/proofs.js` — proof copy and background gradients

Desktop-first; basic mobile breakpoints included.

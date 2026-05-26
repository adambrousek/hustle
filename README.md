# HUSTLE — Typographic scroll prototype

Bold single-page prototype for HUSTLE, a Czech social media and content agency.

## Setup

1. Place fonts in `public/fonts/`:
   - **HW Topol Bold.otf** (headlines)
   - **Proxima Nova** — `ProximaNova-Regular.woff2` or `Proxima Nova Regular.otf` (body text)
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
- `public/logos/` — client logos (SVG, see `public/logos/README.md`)
- `public/extracted/` — images exported from pitch PDF
- `public/references/HUSTLE-Pitch-Tender.pdf` — source deck

## Revert before PDF sync

```bash
cp -r .backup-pre-pdf/src/* src/
```

See `.backup-pre-pdf/REVERT.md`.

Desktop-first; basic mobile breakpoints included.

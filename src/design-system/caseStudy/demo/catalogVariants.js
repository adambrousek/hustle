import {
  DEMO_INTRO,
  DEMO_INTRO_ASIDE,
  DEMO_INTRO_HERO_SPLIT,
  DEMO_ZIGZAG,
  DEMO_ZIGZAG_FLIP,
  DEMO_ZIGZAG_SHIFT,
  DEMO_ZIGZAG_BODY_PROOFS,
  DEMO_ZIGZAG_BODY_AWARDS,
  DEMO_ZIGZAG_SPLIT_PROSE,
  DEMO_ZIGZAG_OVERLAY,
  DEMO_ZIGZAG_CASE_LINK,
  DEMO_ZIGZAG_CASE_LINK_LOGO,
  DEMO_PROOF_CHAPTER,
  DEMO_KEY_LEARNINGS,
  DEMO_KEY_LEARNINGS_SIX,
  DEMO_CTA_CONTACT_PAGE,
} from './demoData.js';

const PILULKA_BG = {
  bg: '#006858',
  themeColor: '#006858',
  chromeBottom: '#003830',
};

const CS_BG = {
  bg: '#1868F0',
  themeColor: '#1868F0',
  chromeBottom: '#0E48B8',
};

const SPORTISIMO_BG = {
  bg: '#0058B0',
  themeColor: '#0058B0',
  chromeBottom: '#002858',
};

const RED_BG = {
  bg: '#F01818',
  themeColor: '#F01818',
  chromeBottom: '#CD0010',
};

const BLACK_BG = {
  bg: '#000000',
  themeColor: '#000000',
  chromeBottom: '#000000',
};

/** Stabilní ID pro sync knihovny — neměnit po nasazení. */
export const CATALOG_LIBRARY_IDS = {
  intro: 'a1000000-0000-4000-8000-000000000001',
  'intro-aside-proofs': 'a1000000-0000-4000-8000-000000000002',
  'zigzag-chapter': 'a1000000-0000-4000-8000-000000000003',
  'zigzag-chapter-flip': 'a1000000-0000-4000-8000-000000000004',
  'zigzag-chapter-shift': 'a1000000-0000-4000-8000-000000000005',
  'zigzag-body-proofs-stat': 'a1000000-0000-4000-8000-000000000006',
  'key-learnings': 'a1000000-0000-4000-8000-000000000007',
  'key-learnings-six': 'a1000000-0000-4000-8000-000000000008',
  'intro-hero-split': 'a1000000-0000-4000-8000-000000000009',
  'zigzag-body-proofs-awards': 'a1000000-0000-4000-8000-00000000000a',
  'proof-chapter': 'a1000000-0000-4000-8000-00000000000b',
  'zigzag-split-prose': 'a1000000-0000-4000-8000-00000000000c',
  'zigzag-overlay': 'a1000000-0000-4000-8000-00000000000d',
  'zigzag-case-link': 'a1000000-0000-4000-8000-00000000000e',
  'zigzag-case-link-logo': 'a1000000-0000-4000-8000-000000000011',
  cta: 'a1000000-0000-4000-8000-00000000000f',
  'cta-contact-page': 'a1000000-0000-4000-8000-000000000010',
};

function settingsFor(content, base, extra = {}) {
  return {
    ...base,
    variantId: extra.variantId,
    stackLayout: extra.stackLayout,
    layout: extra.layout ?? content.layout,
    flip: content.flip ?? false,
  };
}

/**
 * Kompletní katalog variant — jediný zdroj pravdy pro knihovnu, náhledy a seed.
 */
export const CATALOG_VARIANTS = [
  {
    variantId: 'intro',
    id: CATALOG_LIBRARY_IDS.intro,
    name: 'Intro',
    description: 'Hero kapitola — logo, stacked media, headline, prose.',
    type: 'intro',
    content: DEMO_INTRO,
    settings: settingsFor(DEMO_INTRO, PILULKA_BG, { variantId: 'intro', stackLayout: 'offset' }),
    defaultStackLayout: 'offset',
  },
  {
    variantId: 'intro-aside-proofs',
    id: CATALOG_LIBRARY_IDS['intro-aside-proofs'],
    name: 'Intro + Aside Proofs',
    description: 'Intro s oceněními / proof bloky vpravo od textu.',
    type: 'intro',
    content: DEMO_INTRO_ASIDE,
    settings: settingsFor(DEMO_INTRO_ASIDE, PILULKA_BG, { variantId: 'intro-aside-proofs', stackLayout: 'wide' }),
    defaultStackLayout: 'offset',
  },
  {
    variantId: 'intro-hero-split',
    id: CATALOG_LIBRARY_IDS['intro-hero-split'],
    name: 'Intro Hero Split',
    description: 'Homepage hero — velký nadpis vlevo, subhead + text + CTA vpravo.',
    type: 'intro',
    content: DEMO_INTRO_HERO_SPLIT,
    settings: settingsFor(DEMO_INTRO_HERO_SPLIT, RED_BG, {
      variantId: 'intro-hero-split',
      stackLayout: 'offset',
    }),
    defaultStackLayout: 'offset',
  },
  {
    variantId: 'zigzag-chapter',
    id: CATALOG_LIBRARY_IDS['zigzag-chapter'],
    name: 'Zigzag Chapter',
    description: 'Obsahová kapitola — text vlevo, media vpravo.',
    type: 'zigzag',
    content: DEMO_ZIGZAG,
    settings: settingsFor(DEMO_ZIGZAG, CS_BG, { variantId: 'zigzag-chapter', stackLayout: 'stagger' }),
    defaultStackLayout: 'stagger',
  },
  {
    variantId: 'zigzag-chapter-flip',
    id: CATALOG_LIBRARY_IDS['zigzag-chapter-flip'],
    name: 'Zigzag Chapter (Flip)',
    description: 'Zrcadlená varianta — media vlevo, text vpravo.',
    type: 'zigzag',
    content: DEMO_ZIGZAG_FLIP,
    settings: settingsFor(DEMO_ZIGZAG_FLIP, SPORTISIMO_BG, {
      variantId: 'zigzag-chapter-flip',
      stackLayout: 'cascade',
    }),
    defaultStackLayout: 'stagger',
  },
  {
    variantId: 'zigzag-chapter-shift',
    id: CATALOG_LIBRARY_IDS['zigzag-chapter-shift'],
    name: 'Zigzag Chapter + Shift',
    description: 'Kapitola s before/after shift blokem pod textem.',
    type: 'zigzag',
    content: DEMO_ZIGZAG_SHIFT,
    settings: settingsFor(DEMO_ZIGZAG_SHIFT, PILULKA_BG, {
      variantId: 'zigzag-chapter-shift',
      stackLayout: 'fan',
    }),
    defaultStackLayout: 'stagger',
  },
  {
    variantId: 'zigzag-body-proofs-stat',
    id: CATALOG_LIBRARY_IDS['zigzag-body-proofs-stat'],
    name: 'Zigzag + Body Proofs (Stat)',
    description: 'Nadpis jedním fontem, stat proof pod textem.',
    type: 'zigzag',
    content: DEMO_ZIGZAG_BODY_PROOFS,
    settings: settingsFor(DEMO_ZIGZAG_BODY_PROOFS, CS_BG, {
      variantId: 'zigzag-body-proofs-stat',
      stackLayout: 'tight',
    }),
    defaultStackLayout: 'stagger',
  },
  {
    variantId: 'zigzag-body-proofs-awards',
    id: CATALOG_LIBRARY_IDS['zigzag-body-proofs-awards'],
    name: 'Zigzag + Body Proofs (Awards)',
    description: 'Schodový nadpis, ocenění pod textem.',
    type: 'zigzag',
    content: DEMO_ZIGZAG_BODY_AWARDS,
    settings: settingsFor(DEMO_ZIGZAG_BODY_AWARDS, PILULKA_BG, {
      variantId: 'zigzag-body-proofs-awards',
      stackLayout: 'stagger',
    }),
    defaultStackLayout: 'stagger',
  },
  {
    variantId: 'proof-chapter',
    id: CATALOG_LIBRARY_IDS['proof-chapter'],
    name: 'Proof Chapter',
    description: 'Důkazová kapitola — delší prose, proof layout.',
    type: 'zigzag',
    content: DEMO_PROOF_CHAPTER,
    settings: settingsFor(DEMO_PROOF_CHAPTER, PILULKA_BG, {
      variantId: 'proof-chapter',
      stackLayout: 'stagger',
    }),
    defaultStackLayout: 'stagger',
  },
  {
    variantId: 'zigzag-split-prose',
    id: CATALOG_LIBRARY_IDS['zigzag-split-prose'],
    name: 'Zigzag Split Prose',
    description: 'Manifest system — nadpis vlevo, text + odrážky vpravo, bez médií.',
    type: 'zigzag',
    content: DEMO_ZIGZAG_SPLIT_PROSE,
    settings: settingsFor(DEMO_ZIGZAG_SPLIT_PROSE, RED_BG, { variantId: 'zigzag-split-prose' }),
  },
  {
    variantId: 'zigzag-overlay',
    id: CATALOG_LIBRARY_IDS['zigzag-overlay'],
    name: 'Zigzag Overlay',
    description: 'Always On — nadpis přes středové médium, logo + text + CTA vpravo.',
    type: 'zigzag',
    content: DEMO_ZIGZAG_OVERLAY,
    settings: settingsFor(DEMO_ZIGZAG_OVERLAY, BLACK_BG, {
      variantId: 'zigzag-overlay',
      stackLayout: 'stagger',
    }),
    defaultStackLayout: 'stagger',
  },
  {
    variantId: 'zigzag-case-link',
    id: CATALOG_LIBRARY_IDS['zigzag-case-link'],
    name: 'Zigzag Case Link',
    description: 'Case study — text, CTA odkaz a media vpravo.',
    type: 'zigzag',
    content: DEMO_ZIGZAG_CASE_LINK,
    settings: settingsFor(DEMO_ZIGZAG_CASE_LINK, CS_BG, {
      variantId: 'zigzag-case-link',
      stackLayout: 'stagger',
    }),
    defaultStackLayout: 'stagger',
  },
  {
    variantId: 'zigzag-case-link-logo',
    id: CATALOG_LIBRARY_IDS['zigzag-case-link-logo'],
    name: 'Zigzag Case Link + Logo',
    description: 'Case study — logo klienta nad odstavcem, CTA a media vpravo.',
    type: 'zigzag',
    content: DEMO_ZIGZAG_CASE_LINK_LOGO,
    settings: settingsFor(DEMO_ZIGZAG_CASE_LINK_LOGO, CS_BG, {
      variantId: 'zigzag-case-link-logo',
      stackLayout: 'stagger',
    }),
    defaultStackLayout: 'stagger',
  },
  {
    variantId: 'key-learnings',
    id: CATALOG_LIBRARY_IDS['key-learnings'],
    name: 'Key Learnings',
    description: 'Závěrečná sekce se 4 sloupci.',
    type: 'key-learnings',
    content: DEMO_KEY_LEARNINGS,
    settings: settingsFor(DEMO_KEY_LEARNINGS, PILULKA_BG, { variantId: 'key-learnings' }),
  },
  {
    variantId: 'key-learnings-six',
    id: CATALOG_LIBRARY_IDS['key-learnings-six'],
    name: 'Key Learnings (6)',
    description: 'Závěrečná sekce — 6 sloupců ve 2 řádcích (3×2).',
    type: 'key-learnings-six',
    content: DEMO_KEY_LEARNINGS_SIX,
    settings: settingsFor(DEMO_KEY_LEARNINGS_SIX, CS_BG, { variantId: 'key-learnings-six' }),
  },
  {
    variantId: 'cta',
    id: CATALOG_LIBRARY_IDS.cta,
    name: 'CTA',
    description: 'Kontaktní závěr (manifest contact block).',
    type: 'cta',
    content: {},
    settings: settingsFor({}, BLACK_BG, { variantId: 'cta', layout: 'sticky' }),
  },
  {
    variantId: 'cta-contact-page',
    id: CATALOG_LIBRARY_IDS['cta-contact-page'],
    name: 'CTA Contact Page',
    description: 'Plná kontaktní sekce — telefon, email, kancelář, fakturace, mapa.',
    type: 'cta',
    content: DEMO_CTA_CONTACT_PAGE,
    settings: settingsFor(DEMO_CTA_CONTACT_PAGE, BLACK_BG, {
      variantId: 'cta-contact-page',
      layout: 'contact-page',
    }),
  },
];

export function catalogVariantById(variantId) {
  return CATALOG_VARIANTS.find((v) => v.variantId === variantId) ?? null;
}

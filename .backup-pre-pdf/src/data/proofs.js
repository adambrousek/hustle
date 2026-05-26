export const HERO_BG =
  'radial-gradient(circle at 70% 15%, #FF3A3A 0%, transparent 30%), linear-gradient(180deg, #F01818 0%, #CD0010 100%)';

export const DEFAULT_RED_BG =
  'radial-gradient(circle at 65% 20%, #FF3A3A 0%, transparent 28%), linear-gradient(180deg, #F01818 0%, #CD0010 100%)';

export const DEEP_RED_BG =
  'radial-gradient(circle at 50% 30%, rgba(255,58,58,0.4) 0%, transparent 40%), linear-gradient(180deg, #F01818 0%, #7A0000 45%, #2B0004 100%)';

export const DARK_CTA_BG =
  'radial-gradient(circle at 40% 80%, rgba(122,0,0,0.5) 0%, transparent 45%), linear-gradient(180deg, #660008 0%, #2B0004 100%)';

export const BG_SECTIONS = [
  {
    id: 'cs',
    bg: 'radial-gradient(circle at 75% 35%, rgba(0,75,255,0.65) 0%, transparent 35%), radial-gradient(circle at 20% 80%, rgba(19,0,40,0.5) 0%, transparent 50%), linear-gradient(180deg, #F01818 0%, #130028 100%)',
  },
  {
    id: 'pilulka',
    bg: 'radial-gradient(circle at 30% 25%, rgba(0,168,107,0.55) 0%, transparent 38%), radial-gradient(circle at 85% 70%, rgba(0,60,43,0.6) 0%, transparent 45%), linear-gradient(180deg, #F01818 0%, #003C2B 100%)',
  },
  {
    id: 'sportisimo',
    bg: 'radial-gradient(circle at 70% 20%, rgba(0,102,255,0.6) 0%, transparent 36%), radial-gradient(circle at 15% 85%, rgba(2,11,45,0.7) 0%, transparent 48%), linear-gradient(180deg, #F01818 0%, #020B2D 100%)',
  },
  {
    id: 'kitkat',
    bg: 'radial-gradient(circle at 55% 25%, rgba(180,0,0,0.7) 0%, transparent 40%), radial-gradient(circle at 80% 75%, rgba(43,0,4,0.8) 0%, transparent 50%), linear-gradient(180deg, #F01818 0%, #2B0004 100%)',
  },
  {
    id: 'partnership',
    bg: 'radial-gradient(circle at 45% 40%, rgba(122,0,0,0.75) 0%, transparent 42%), linear-gradient(180deg, #F01818 0%, #7A0000 50%, #2B0004 100%)',
  },
];

export const PROOFS = [
  {
    id: 'cs',
    lines: ['DĚLÁME PROFILY,', 'KTERÉ PATŘÍ', 'MEZI NEJLEPŠÍ', 'V ČESKU'],
    lineXs: ['10vw', '6vw', '14vw', '8vw'],
    client: 'Česká spořitelna',
    description:
      'Z kanálů velké banky jsme vytvořili jeden z nejvýraznějších brandových profilů na českém trhu.',
    layout: 'layout-cs',
    visual: 'phone',
    tint: 'tint-blue',
  },
  {
    id: 'pilulka',
    lines: ['PŘES SOCIAL', 'RAZÍME', 'NOVÝ SMĚR'],
    lineXs: ['38vw', '32vw', '44vw'],
    client: 'Pilulka',
    description:
      'Pomáháme značce komunikovat posun od online lékárny k platformě pro zdraví, prevenci a dlouhověkost.',
    layout: 'layout-pilulka',
    visual: 'vertical',
    tint: 'tint-green',
  },
  {
    id: 'sportisimo',
    lines: ['VRACÍME', 'KANÁLŮM', 'ENERGII'],
    lineXs: ['8vw', '18vw', '12vw'],
    client: 'Sportisimo',
    description:
      'Do feedu vracíme sportovní emoci, komunitní inspiraci a důvody sledovat značku i mimo nákupní moment.',
    layout: 'layout-sportisimo',
    visual: 'wide',
    tint: 'tint-sport',
  },
  {
    id: 'kitkat',
    lines: ['NECHÁVÁME', 'ZNAČKY', 'SPOLU', 'MLUVIT'],
    lineXs: ['18vw', '28vw', '22vw', '34vw'],
    client: 'KitKat / F1 / Visa / Česká spořitelna',
    description:
      'Z partnerství neděláme loga vedle sebe. Děláme lokální social moment, kde spolu profily přirozeně interagují ve feedu.',
    layout: 'layout-kitkat',
    visual: 'social',
    tint: 'tint-race',
    bubbles: true,
  },
  {
    id: 'partnership',
    lines: ['Z PARTNERSTVÍ', 'DĚLÁME', 'DŮVOD', 'SLEDOVAT'],
    lineXs: ['12vw', '24vw', '16vw', '28vw'],
    client: 'Česká spořitelna × TV Nova × Jáma lvová',
    description:
      'Místo rozhovorů o soutěži stavíme obsah na odvaze začít podnikat.',
    layout: 'layout-partnership',
    visual: null,
    tint: null,
  },
];

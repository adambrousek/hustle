const IMG = '/extracted';
const LOGO = '/logos';

export const HERO_BG = '#F01818';

/** Solid colors for Safari/macOS browser chrome (theme-color + html/body fallback). */
export const HERO_THEME = '#F01818';
export const DEFAULT_RED_THEME = '#F01818';
export const DEEP_RED_THEME = '#7A0000';
export const DARK_CTA_THEME = '#660008';

/** Gradient edge colors (top / bottom linear stop) for chrome masks. */
export const HERO_CHROME_BOTTOM = '#CD0010';
export const DEFAULT_RED_CHROME_BOTTOM = '#CD0010';
export const DEEP_RED_CHROME_BOTTOM = '#2B0004';
export const DARK_CTA_CHROME_BOTTOM = '#2B0004';

export const DEFAULT_RED_BG = '#F01818';

export const DEEP_RED_BG = '#7A0000';

export const DARK_CTA_BG = '#660008';

export const BLACK_BG = '#000000';
export const BLACK_THEME = '#000000';
export const BLACK_CHROME_BOTTOM = '#000000';

/** Barvy a gradienty z PDF (case study slidy) */
export const BG_SECTIONS = [
  {
    id: 'cs',
    color: '#1868F0',
    chromeBottom: '#0E48B8',
    bg: '#1868F0',
  },
  {
    id: 'pilulka',
    color: '#006858',
    chromeBottom: '#003830',
    bg: '#006858',
  },
  {
    id: 'sportisimo',
    color: '#0058B0',
    chromeBottom: '#002858',
    bg: '#0058B0',
  },
  {
    id: 'kitkat',
    color: '#E81828',
    chromeBottom: '#7A0008',
    bg: '#E81828',
  },
  {
    id: 'partnership',
    color: '#1868F0',
    chromeBottom: '#0A2878',
    bg: '#1868F0',
  },
  {
    id: 'dofe',
    color: '#9C2088',
    chromeBottom: '#5C1048',
    bg: '#9C2088',
  },
];

export function getProofBg(slug) {
  return BG_SECTIONS.find((section) => section.id === slug) ?? null;
}

export const PROOFS = [
  {
    id: 'cs',
    lines: ['DĚLÁME PROFILY,', 'KTERÉ PATŘÍ', 'MEZI NEJLEPŠÍ', 'V ČESKU'],
    lineXs: ['8vw', '4vw', '16vw', '10vw'],
    logos: [
      { src: `${LOGO}/ceska-sporitelna.svg`, alt: 'Česká spořitelna' },
    ],
    links: [{ label: 'VÍCE ↗', href: `${IMG}/page-02.jpg` }],
    description:
      'Už přes pět let stojíme za sociálními sítěmi České spořitelny. Z kanálů velké banky jsme postupně vytvořili jeden z nejvýraznějších brandových profilů na českém trhu a sbíráme za profily ocenění.',
    description2:
      'Finanční témata jsme převedli do obsahu, který je srozumitelný, lidský a relevantní i pro mladší publikum.',
    layout: 'layout-cs',
    images: [
      { type: 'video', src: '/videos/cs-1.mp4', className: 'proof-img--hero' },
      { src: `${IMG}/page-02-img-1.jpeg`, className: 'proof-img--b' },
      { type: 'video', src: '/videos/cs-2.mp4', className: 'proof-img--c' },
    ],
  },
  {
    id: 'pilulka',
    lines: ['PŘES SOCIAL', 'RAZÍME', 'NOVÝ SMĚR'],
    lineXs: ['8vw', '4vw', '14vw'],
    logos: [{ src: `${LOGO}/pilulka.svg`, alt: 'Pilulka' }],
    links: [{ label: 'VÍCE ↗', href: `${IMG}/page-03.jpg` }],
    description:
      'Pilulka už není online lékárna. S novým majitelem je to platforma pro zdraví, prevenci a dlouhověkost.',
    description2:
      'Přes social jí pomáháme držet nový směr, otevírat hledaná témata a tvořit obsah, který sleduje komunita i opinion leadeři v segmentu.',
    layout: 'layout-pilulka',
    images: [
      { type: 'video', src: '/videos/pilulka-1.mp4', className: 'proof-img--a' },
      { src: `${IMG}/page-03-img-2.jpeg`, className: 'proof-img--b' },
      { type: 'video', src: '/videos/pilulka-2.mp4', className: 'proof-img--c' },
    ],
  },
  {
    id: 'sportisimo',
    lines: ['VRACÍME', 'KANÁLŮM', 'ENERGII'],
    lineXs: ['6vw', '16vw', '10vw'],
    logos: [{ src: `${LOGO}/sportisimo.svg`, alt: 'Sportisimo' }],
    links: [{ label: 'VÍCE ↗', href: `${IMG}/page-04.jpg` }],
    description:
      'Sportisimu jsme pomohli znovu nastavit energii a směr sociálních sítí.',
    description2:
      'Místo obsahu bez jasného tahu jsme do feedu vrátili sportovní emoci, komunitní inspiraci a důvody sledovat značku i mimo nákupní moment.',
    layout: 'layout-sportisimo',
    images: [
      { src: `${IMG}/page-04-img-0.jpeg`, className: 'proof-img--a' },
      { src: `${IMG}/page-04-img-3.jpeg`, className: 'proof-img--b' },
      { src: `${IMG}/page-04-img-4.jpeg`, className: 'proof-img--c' },
    ],
  },
  {
    id: 'kitkat',
    lines: ['NECHÁVÁME', 'ZNAČKY', 'SPOLU', 'MLUVIT'],
    lineXs: ['14vw', '24vw', '18vw', '32vw'],
    logos: [
      {
        src: `${LOGO}/kitkat-f1.svg`,
        alt: 'KitKat a Formula 1',
        className: 'proof-logo proof-logo--color',
      },
    ],
    links: [{ label: 'VÍCE ↗', href: `${IMG}/page-05.jpg` }],
    description:
      'Pro KitKat tvoříme českou adaptaci kampaně napojené na F1: lokální příběh, obsah i social výstupy pro české publikum.',
    description2:
      'Díky práci pro Českou spořitelnu, která se do partnerství zapojuje přes Visa, dokážeme oba klienty přirozeně propojit. Ne jako loga vedle sebe, ale jako profily, které spolu ve feedu interagují a vytváří lokální social moment.',
    layout: 'layout-kitkat',
    images: [
      { src: `${IMG}/page-05-img-0.jpeg`, className: 'proof-img--hero' },
      { src: `${IMG}/page-05-img-3.jpeg`, className: 'proof-img--b' },
      { src: `${IMG}/page-05-img-4.jpeg`, className: 'proof-img--c' },
    ],
  },
  {
    id: 'partnership',
    lines: ['Z PARTNERSTVÍ', 'DĚLÁME', 'DŮVOD', 'SLEDOVAT'],
    lineXs: ['10vw', '22vw', '14vw', '26vw'],
    logos: [
      { src: `${LOGO}/ceska-sporitelna.svg`, alt: 'Česká spořitelna' },
      { src: `${LOGO}/nova.jpg`, alt: 'TV Nova', className: 'proof-logo proof-logo--nova' },
    ],
    links: [{ label: 'VÍCE ↗', href: `${IMG}/page-06.jpg` }],
    description:
      'V kampani pro Českou spořitelnu navazujeme na partnerství s TV Nova a Jámou lvovou. Místo rozhovorů o soutěži jsme téma postavili na ambici Spořitelny dodávat lidem sebevědomí k podnikání.',
    description2:
      'Proto s podnikateli otevíráme chyby, slepé cesty a momenty, kdy se věci nepovedly. Ukazujeme, že podnikání nezačíná jistotou, ale odvahou začít.',
    layout: 'layout-partnership',
    images: [{ src: `${IMG}/page-06-img-0.jpeg`, className: 'proof-img--center' }],
  },
  {
    id: 'dofe',
    lines: ['UČÍME TÝMY', 'TVOŘIT OBSAH,', 'KTERÝ DRŽÍ SMĚR'],
    lineXs: ['8vw', '14vw', '6vw'],
    logos: [
      {
        src: `${LOGO}/dofe.jpg`,
        alt: "The Duke of Edinburgh's International Award",
        className: 'proof-logo proof-logo--dofe',
      },
    ],
    links: [{ label: 'VÍCE ↗', href: `${IMG}/page-07.jpg` }],
    description:
      'Pro The Duke of Edinburgh’s International Award školíme účastníky, aby dokázali sami tvořit obsah podle nastaveného rámce.',
    description2:
      'Aby strategie nezůstala jen u agentury, ale mohla žít i skrze lidi, kteří jsou programu nejblíž.',
    layout: 'layout-dofe',
    images: [
      { src: `${IMG}/page-07-img-0.jpeg`, className: 'proof-img--a' },
      { src: `${IMG}/page-07-img-3.jpeg`, className: 'proof-img--b' },
    ],
  },
];

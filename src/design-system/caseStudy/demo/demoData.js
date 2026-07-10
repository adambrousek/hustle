const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

const LOREM_SHORT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const VID = '/videos';
const PREVIEW = '/images/portfolio/pilulka-preview.png';

export const DEMO_THEME = {
  visualVariant: 'pilulka',
  logo: { src: '/logos/pilulka.svg', alt: 'Demo logo' },
  media: [
    { type: 'video', src: `${VID}/pilulka-portfolio-hover.mp4`, className: 'proof-img--intro-lead' },
    { type: 'video', src: `${VID}/pilulka-1.mp4`, className: 'proof-img--intro-accent' },
  ],
  mediaStack: [
    { type: 'video', src: `${VID}/pilulka-portfolio-hover.mp4` },
    { type: 'video', src: `${VID}/pilulka-2.mp4` },
    { src: PREVIEW },
  ],
};

export const DEMO_INTRO = {
  logo: DEMO_THEME.logo,
  headline: {
    lines: ['LOREM IPSUM', 'DOLOR SIT', 'AMET'],
    lineIndents: ['0', '8vw', '3vw'],
  },
  paragraphs: [LOREM, LOREM_SHORT, LOREM_SHORT],
  media: DEMO_THEME.media,
  visualVariant: DEMO_THEME.visualVariant,
};

export const DEMO_INTRO_ASIDE = {
  ...DEMO_INTRO,
  sceneProofs: [
    { lines: ['LOREM IPSUM', 'Dolor sit amet'] },
    { lines: ['CONSECTETUR', 'Adipiscing elit'] },
    { lines: ['SED DO', 'Eiusmod tempor'] },
  ],
  sceneProofsVariant: 'awards',
  sceneProofsPlacement: 'aside',
};

export const DEMO_INTRO_HERO_SPLIT = {
  layout: 'hero-split',
  headline: {
    lines: ['SOCIAL', 'MEDIA', 'AGENTURA'],
    lineIndents: ['0', '7vw', '2.5vw'],
  },
  subhead: {
    lines: ['PRO ZNAČKY,', 'KTERÉ NECHTĚJÍ', 'ZNÍT JAKO ZNAČKY.'],
    lineIndents: ['0', '0', '0'],
    uniform: true,
  },
  paragraphs: [
    'Každá značka má nápady, které chtějí na sítě. Ne všechny tam patří. Proto začínáme Content Blueprintem.',
    'Společně najdeme, co má značka říkat, co může pustit k vodě a proč ji má někdo chtít sledovat.',
  ],
  media: DEMO_THEME.media,
  cta: { label: 'ZAJÍMÁ MĚ CONTENT BLUEPRINT', href: '/kontakt' },
  visualVariant: 'red',
};

export const DEMO_ZIGZAG = {
  id: 'zigzag',
  headline: {
    lines: ['LOREM IPSUM', 'DOLOR SIT', 'AMET CONSECTETUR'],
    lineIndents: ['0', '6vw', '12vw'],
  },
  paragraphs: [LOREM, LOREM_SHORT],
  media: DEMO_THEME.mediaStack,
  flip: false,
  visualVariant: DEMO_THEME.visualVariant,
};

export const DEMO_ZIGZAG_SPLIT_PROSE = {
  layout: 'split-prose',
  id: 'split-prose',
  headline: {
    lines: ['DĚLÁME SOCIAL,', 'KTERÝ NENÍ', 'JEN DALŠÍ PLACEMENT', 'V KAMPANI.'],
    lineIndents: ['0', '6vw', '2vw', '12vw'],
  },
  paragraphs: [
    'Značka může mít strategii, positioning i kampaň.',
    'Ale na sítích se rozhoduje jinde.',
  ],
  points: [
    'V prvních třech vteřinách videa.',
    'V komentáři pod postem.',
    'V tom, jestli obsah působí jako značka, nebo jako něco, co lidi opravdu chtějí sledovat.',
  ],
  closing: [
    'Proto řešíme social jako celek.',
    'Od role značky přes obsah až po každodenní správu.',
  ],
};

export const DEMO_ZIGZAG_OVERLAY = {
  layout: 'overlay',
  id: 'overlay',
  headline: {
    lines: ['PRVNÍ AGENTURA', 'S VLASTNÍ', 'REALITY SHOW.'],
    lineIndents: ['0', '6vw', '2vw'],
  },
  paragraphs: [
    'Náš Instagram není výloha. Je to formát. Nápady. Meetingy. Natáčení. Chaos. Výstupy.',
    'To, co radíme značkám, testujeme na sobě.',
  ],
  media: [
    {
      type: 'video',
      src: '/videos/reality-show-trailer.mp4',
      className: 'proof-img--a',
    },
  ],
  logo: { src: '/logos/hustle.svg', alt: 'Always On' },
  cta: { label: 'SLEDOVAT NA INSTAGRAMU', href: 'https://www.instagram.com/hustle.cz/' },
  visualVariant: 'black',
};

export const DEMO_ZIGZAG_CASE_LINK = {
  layout: 'case-link',
  id: 'case-link',
  headline: {
    lines: ['Z PARTNERSTVÍ', 'DĚLÁME', 'DŮVOD', 'SLEDOVAT'],
    lineIndents: ['0', '4vw', '8vw', '2vw'],
  },
  paragraphs: [LOREM, LOREM_SHORT],
  cta: { label: 'VÍCE', href: '/case-study' },
  media: DEMO_THEME.mediaStack,
  visualVariant: 'cs',
};

export const DEMO_ZIGZAG_CASE_LINK_LOGO = {
  ...DEMO_ZIGZAG_CASE_LINK,
  layout: 'case-link-logo',
  id: 'case-link-logo',
  logo: { src: '/logos/ceska-sporitelna.svg', alt: 'Česká spořitelna' },
};

export const DEMO_ZIGZAG_FLIP = {
  ...DEMO_ZIGZAG,
  id: 'zigzag-flip',
  flip: true,
  headline: {
    lines: ['FLIP VARIANT', 'MEDIA VLEVO', 'TEXT VPRAVO'],
    lineIndents: ['0', '5vw', '10vw'],
  },
};

export const DEMO_ZIGZAG_SHIFT = {
  ...DEMO_ZIGZAG,
  id: 'zigzag-shift',
  flip: true,
  headline: {
    lines: ['SHIFT BLOCK', 'PŘED A PO', 'TRANSFORMACI'],
    lineIndents: ['0', '4vw', '9vw'],
  },
  shift: {
    before: 'LOREM → IPSUM → DOLOR → SIT',
    after: 'AMET → CONSECTETUR → ADIPISCING → ELIT',
  },
};

export const DEMO_ZIGZAG_BODY_PROOFS = {
  ...DEMO_ZIGZAG,
  id: 'zigzag-body-proofs',
  flip: true,
  headline: {
    uniform: true,
    lines: [
      'DŮKAZ, ŽE',
      'LOREM IPSUM',
      'DOLOR SIT',
      'AMET.',
    ],
    lineIndents: ['0', '0', '0', '0'],
  },
  paragraphs: [LOREM, LOREM_SHORT],
  sceneProofs: [
    { lines: ['351K+'] },
  ],
  sceneProofsVariant: 'stat',
  sceneProofsPlacement: 'body',
};

export const DEMO_ZIGZAG_BODY_AWARDS = {
  ...DEMO_ZIGZAG,
  id: 'zigzag-body-awards',
  flip: false,
  headline: {
    lines: ['LOREM IPSUM', 'DOLOR SIT', 'AMET'],
    lineIndents: ['0', '6vw', '12vw'],
  },
  paragraphs: [LOREM, LOREM_SHORT],
  sceneProofs: [
    { lines: ['LOREM IPSUM', 'Dolor sit amet'] },
    { lines: ['CONSECTETUR', 'Adipiscing elit'] },
  ],
  sceneProofsVariant: 'awards',
  sceneProofsPlacement: 'body',
};

export const DEMO_PROOF_CHAPTER = {
  ...DEMO_ZIGZAG,
  id: 'proof',
  variant: 'proof',
  flip: false,
  headline: {
    lines: ['PROOF CHAPTER', 'DŮKAZOVÁ', 'KAPITOLA'],
    lineIndents: ['0', '6vw', '14vw'],
  },
  paragraphs: [LOREM, LOREM_SHORT, LOREM_SHORT],
};

export const DEMO_KEY_LEARNINGS = {
  title: {
    lines: ['KEY LEARNINGS', 'ČTYŘI SLOUPCE'],
    lineIndents: ['0', '8vw'],
  },
  items: [
    { title: ['LOREM', 'IPSUM'], body: LOREM_SHORT },
    { title: ['DOLOR', 'SIT'], body: LOREM_SHORT },
    { title: ['AMET', 'ELIT'], body: LOREM_SHORT },
    { title: ['SED DO', 'EIUSMOD'], body: LOREM_SHORT },
  ],
};

export const DEMO_KEY_LEARNINGS_SIX = {
  title: {
    lines: ['KEY LEARNINGS', 'ŠEST SLOUPCŮ'],
    lineIndents: ['0', '8vw'],
  },
  grid: 6,
  items: [
    { title: ['LOREM', 'IPSUM'], body: LOREM_SHORT },
    { title: ['DOLOR', 'SIT'], body: LOREM_SHORT },
    { title: ['AMET', 'ELIT'], body: LOREM_SHORT },
    { title: ['SED DO', 'EIUSMOD'], body: LOREM_SHORT },
    { title: ['TEMPOR', 'INCIDIDUNT'], body: LOREM_SHORT },
    { title: ['UT LABORE', 'ET DOLORE'], body: LOREM_SHORT },
  ],
};

export const DEMO_CTA_CONTACT_PAGE = {
  layout: 'contact-page',
  headline: 'Ozvěte se nám',
  intro:
    'Staňte se naším dalším spokojeným klientem. Stačí se nám ozvat a společně probereme, jak vám nejefektivněji pomoci.',
  phone: '+420 703 666 550',
  phoneHref: 'tel:+420703666550',
  email: 'hello@hustle.cz',
  contactsTitle: ['KONTAKTY'],
  office: {
    title: ['KANCELÁŘ'],
    lines: ['Breitfeldova 704/9', 'Praha 8 – Karlín', '186 00'],
  },
  billing: {
    title: ['FAKTURAČNÍ', 'ÚDAJE'],
    company: 'Motion Company s.r.o.',
    lines: ['Mladoboleslavská 158', '190 17 - Praha 9'],
    ic: '06221041',
    dic: 'CZ06221041',
  },
  map: {
    embedUrl:
      'https://maps.google.com/maps?q=Breitfeldova+704%2F9,+186+00+Praha+8-Karl%C3%ADn&hl=cs&z=15&output=embed',
    linkUrl:
      'https://www.google.com/maps/search/?api=1&query=Breitfeldova+704%2F9,+186+00+Praha+8',
  },
};

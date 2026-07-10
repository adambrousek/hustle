import {
  BLACK_BG,
  BLACK_CHROME_BOTTOM,
  BLACK_THEME,
  HERO_BG,
  HERO_CHROME_BOTTOM,
  HERO_THEME,
} from './proofs';

export const INSTAGRAM_URL = 'https://www.instagram.com/hustle.cz/';

/** Scroll background per manifest section. */
export const MANIFEST_BG = [
  { bg: HERO_BG, color: HERO_THEME, chromeBottom: HERO_CHROME_BOTTOM },
  { bg: BLACK_BG, color: BLACK_THEME, chromeBottom: BLACK_CHROME_BOTTOM },
  { bg: HERO_BG, color: HERO_THEME, chromeBottom: HERO_CHROME_BOTTOM },
];

export const MANIFEST_SYSTEM = {
  headline: [
    { text: 'DĚLÁME SOCIAL,', indent: '0' },
    { text: 'KTERÝ NENÍ', indent: '6vw' },
    { text: 'JEN DALŠÍ PLACEMENT', indent: '2vw' },
    { text: 'V KAMPANI.', indent: '12vw' },
  ],
  intro: [
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
  cells: [
    {
      label: 'BRAND',
      detail: 'Jasný tón, role značky a rozpoznatelný způsob, jak mluví.',
    },
    {
      label: 'KAMPAŇ',
      detail: 'Social vrstva, která neskončí v media plánu, ale žije ve feedu.',
    },
    {
      label: 'CONTENT',
      detail: 'Témata, formáty a důvod, proč značku sledovat.',
    },
    {
      label: 'PRODUKCE',
      detail: 'Nápad, scénář, natáčení a výstup, který drží směr.',
    },
    {
      label: 'SPRÁVA',
      detail: 'Rytmus, reakce a každodenní přítomnost značky.',
    },
    {
      label: 'DATA',
      detail: 'Poznatky, které nekončí v reportu, ale vrací se zpátky do obsahu.',
    },
  ],
};

export const MANIFEST_ALWAYS_ON = {
  image: '/images/reality-show.png',
  video: '/videos/reality-show-trailer.mp4',
  logo: '/logos/always-on.png',
  headline: [
    { text: 'PRVNÍ AGENTURA', indent: '0' },
    { text: 'S VLASTNÍ', indent: '6vw' },
    { text: 'REALITY SHOW.', indent: '2vw' },
  ],
  copy:
    'Náš Instagram není výloha. Je to formát. Nápady. Meetingy. Natáčení. Chaos. Výstupy. To, co radíme značkám, testujeme na sobě.',
  cta: 'SLEDOVAT NA INSTAGRAMU',
};

export const MANIFEST_CONTACT = {
  image: '/images/milada-jezkova.png',
  headline: [
    { text: 'MÁ VAŠE ZNAČKA', indent: '0' },
    { text: 'SÍTĚ?', indent: '8vw' },
    { text: 'A MOHLI BYCHOM', indent: '4vw' },
    { text: 'JE VIDĚT?', indent: '16vw' },
  ],
  copy: ['Ukažte nám je.', 'Řekneme vám, co v nich vidíme.'],
  email: 'hello@hustle.cz',
};

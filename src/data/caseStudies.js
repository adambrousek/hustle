import { BG_SECTIONS, PROOFS } from './proofs';

const IMG = '/extracted';
const VID = '/videos';

function proofById(id) {
  return PROOFS.find((proof) => proof.id === id);
}

function proofBg(id) {
  return BG_SECTIONS.find((section) => section.id === id) ?? null;
}

function sectionColor(id) {
  return proofBg(id)?.color ?? '#ffffff';
}

/** @type {Record<string, object>} */
export const CASE_STUDIES = {
  cs: {
    slug: 'cs',
    brand: 'Česká spořitelna',
    workType: 'dlouhodobá správa profilů',
    lines: proofById('cs').lines,
    lineXs: proofById('cs').lineXs,
    logos: proofById('cs').logos,
    accent: sectionColor('cs'),
    bg: proofBg('cs')?.bg ?? '#1868F0',
    themeColor: proofBg('cs')?.color ?? '#1868F0',
    chromeBottom: proofBg('cs')?.chromeBottom ?? '#0E48B8',
    intro: [proofById('cs').description, proofById('cs').description2],
    sections: [
      {
        heading: 'CO ZNAČKA POTŘEBOVALA ZMĚNIT',
        body: [
          'Velká banka s vážným tónem a složitými produkty. Sociální sítě musely fungovat jako značka, ne jako další informační kanál.',
          'Potřebovali jsme profily, které udrží důvěru, ale zároveň osloví i mladší publikum — bez zjednodušování na kost a bez finančního patosu.',
        ],
      },
      {
        heading: 'JAK JSME NA TO ŠLI',
        body: [
          'Postavili jsme dlouhodobý rámec: jasný tón značky, role obsahu ve feedu a témata, která dávají smysl v každodenním scrollu.',
          'Finanční témata jsme překládali do lidského jazyka — skrze formáty, které nezní jako banka, ale pořád drží směr velké instituce.',
        ],
      },
      {
        heading: 'CO SE DOSTALO DO FEEDU',
        body: [
          'Reels, video série a obsah, který vysvětluje, inspiruje a reaguje na to, co lidi na sítích opravdu řeší.',
          'Profily jsme vedli jako jeden celek — strategie, produkce i každodenní přítomnost značky v komentářích a reakcích.',
        ],
      },
      {
        heading: 'CO TO PŘINESLO',
        body: [
          'Z kanálů velké banky se postupně stal jeden z nejvýraznějších brandových profilů na českém trhu.',
          'Za práci sbíráme ocenění — ale důležitější je, že obsah funguje jako značka i jako důvod profily sledovat.',
        ],
      },
    ],
    heroVideo: `${VID}/cs-1.mp4`,
    heroPoster: `${IMG}/page-02-img-1.jpeg`,
    gallery: [
      { type: 'video', src: `${VID}/cs-1.mp4`, alt: 'Česká spořitelna — video výstup' },
      { type: 'image', src: `${IMG}/page-02-img-1.jpeg`, alt: 'Česká spořitelna — obsah ve feedu' },
      { type: 'video', src: `${VID}/cs-2.mp4`, alt: 'Česká spořitelna — reels série' },
    ],
  },
};

export function getCaseStudyDetail(slug) {
  return CASE_STUDIES[slug] ?? null;
}

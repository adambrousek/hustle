const IMG = '/extracted';
const VID = '/videos';
const PREVIEW = '/images/portfolio/kitkat-preview.png';

export const KITKAT_CASE = {
  slug: 'kitkat',
  visualVariant: 'kitkat',
  bg: '#E81828',
  themeColor: '#E81828',
  chromeBottom: '#7A0008',
  logo: { src: '/logos/kitkat-f1.svg', alt: 'KitKat' },
  chapters: [
    {
      id: 'intro',
      headline: {
        uniform: true,
        lines: [
          'Z GLOBÁLNÍ',
          'PAUZY',
          'ČESKÝ',
          'SOCIAL',
          'S VLASTNÍM',
          'HLASEM',
        ],
        lineIndents: ['0', '0', '0', '0', '0', '0'],
      },
      paragraphs: [
        'KitKat je globální značka, kterou lidé znají dřív, než ji začnou sledovat. To je výhoda, ale zároveň past. Silný brand může na lokálním socialu snadno působit jako přeložený asset z globálu.',
        'Naším úkolem nebylo jen adaptovat hotové věci. Bylo potřeba dát KitKatu český rytmus, jazyk a důvod být v feedu relevantní i mimo produktový moment.',
        'Postavili jsme social strategii, která z globální platformy pauzy dělá lokální obsahový svět. Pauza není jen claim. Je to situace, humor, reakce, formát a důvod, proč se značka může přirozeně zapojit do každodenního života publika.',
      ],
      media: [
        { type: 'video', src: `${VID}/kitkat-portfolio-hover.mp4`, className: 'proof-img--intro-lead' },
        { src: `${IMG}/page-05-img-3.jpeg`, className: 'proof-img--intro-accent' },
      ],
    },
    {
      id: 'local',
      flip: true,
      headline: {
        uniform: true,
        lines: [
          'GLOBÁLNÍ',
          'ASSET',
          'NESTAČÍ.',
          'SOCIAL POTŘEBUJE',
          'LOKÁLNÍ DUŠI.',
        ],
        lineIndents: ['0', '0', '0', '0', '0'],
      },
      paragraphs: [
        'Globální komunikace dává značce konzistenci. Social ale funguje jinak. Lidé nereagují na to, že značka správně dodržela globální guideline. Reagují na moment, který poznají, jazyk, který jim sedí, a situaci, která má lokální význam.',
        'U KitKatu jsme proto neřešili jen překlad. Řešili jsme, jak se značka chová v českém feedu. Jak mluví o pauze, jak používá humor, jak reaguje na komunitu a jak zůstává jednoduchá, lehká a zapamatovatelná.',
        'Výsledek není česká verze globálního postu. Je to lokální social hlas, který pořád drží značku, ale nepůsobí jako import.',
      ],
      media: [
        { src: `${IMG}/page-05-img-1.png`, className: 'proof-img--a' },
        { src: `${IMG}/page-05-img-3.jpeg`, className: 'proof-img--c' },
      ],
    },
    {
      id: 'pause',
      flip: false,
      headline: {
        uniform: true,
        lines: [
          'PAUZA',
          'NENÍ CLAIM.',
          'JE TO',
          'OBSAHOVÝ',
          'SYSTÉM.',
        ],
        lineIndents: ['0', '0', '0', '0', '0'],
      },
      paragraphs: [
        '„Have a break“ je silná globální platforma. Na socialu ale musí být pauza konkrétní. Pauza mezi meetingy. Pauza od školy. Pauza od doomscrollingu. Pauza ve hře. Pauza v práci. Pauza, kterou člověk pozná během vteřiny.',
        'Proto jsme pro KitKat postavili obsahový systém, který z pauzy dělá formáty. Nadhled, wellbeing, digital break, quality break a situační humor se staly způsobem, jak značka vstupuje do feedu bez toho, aby musela pokaždé začínat produktem.',
        'KitKat tak nemluví jen o čokoládě. Mluví o chvílích, ve kterých čokoláda přirozeně patří.',
      ],
      media: [
        { src: `${IMG}/page-05-img-0.jpeg`, className: 'proof-img--a' },
        { src: `${IMG}/page-05-img-2.png`, className: 'proof-img--b' },
        { src: `${IMG}/page-05-img-4.jpeg`, className: 'proof-img--c' },
      ],
    },
    {
      id: 'f1',
      flip: true,
      headline: {
        uniform: true,
        lines: [
          'F1 NEJEN',
          'JAKO LOGO.',
          'ALE JAKO',
          'SOCIAL MOMENT.',
        ],
        lineIndents: ['0', '0', '0', '0'],
      },
      paragraphs: [
        'KitKat má globální propojení s F1. Samotná informace o partnerství ale na socialu nestačí. Aby téma fungovalo lokálně, musí dostat situaci, konflikt, lidi a jednoduchý důvod, proč ho sledovat.',
        'Díky tomu, že Hustle dlouhodobě pracuje i pro Českou spořitelnu, která je s F1 propojená přes Visa, dokážeme vytvořit unikátní interakci dvou značek na sítích. Influenceři Spořitelny závodí pro KitKat a globální partnerství se tím mění v lokální obsahový moment.',
        'To je přesně role socialu: ne jen oznámit, že značka něco sponzoruje, ale udělat z toho situaci, která žije v feedu.',
      ],
      media: [
        { src: `${IMG}/page-05-img-0.jpeg`, className: 'proof-img--a' },
        { src: `${IMG}/page-05-img-4.jpeg`, className: 'proof-img--b' },
        { src: `${IMG}/page-05-img-3.jpeg`, className: 'proof-img--c' },
      ],
    },
    {
      id: 'proof',
      flip: false,
      sceneProofsPlacement: 'body',
      sceneProofs: [
        { lines: ['LOKÁLNÍ SOCIAL STRATEGIE'] },
        { lines: ['SIGNATURE FORMÁTY'] },
        { lines: ['F1 BRAND INTERAKCE'] },
        { lines: ['TONE OF VOICE PRO ČESKÝ FEED'] },
      ],
      sceneProofsVariant: 'awards',
      headline: {
        uniform: true,
        lines: [
          'DŮKAZ, ŽE',
          'GLOBÁLNÍ ZNAČKA',
          'MŮŽE MLUVIT',
          'LOKÁLNĚ.',
        ],
        lineIndents: ['0', '0', '0', '0'],
      },
      paragraphs: [
        'Značka velikosti KitKatu nepotřebuje další náhodné posty. Potřebuje systém, který udrží globální charakter, ale dovolí lokální relevanci. Proto jsme postavili social strategii, tone of voice, obsahové pilíře, signature formáty a komunitní logiku, podle které může značka fungovat dlouhodobě.',
        'Výsledek je social, který nepůsobí jako překlad. Umí být lehký, aktuální, lidský a pořád jednoznačně KitKat. Pauza se v něm nechová jako slogan, ale jako opakovatelný způsob, jak značka vstupuje do života publika.',
        'KitKat tak získává víc než obsahový plán. Získává lokální social svět, ve kterém globální značka nepůsobí vzdáleně.',
      ],
      media: [
        { src: `${IMG}/page-05-img-2.png`, className: 'proof-img--a' },
        { src: `${IMG}/page-05-img-3.jpeg`, className: 'proof-img--b' },
        { src: PREVIEW, className: 'proof-img--c' },
      ],
    },
  ],
  keyLearnings: {
    title: {
      lines: ['PROČ TENHLE', 'SYSTÉM FUNGUJE'],
      lineIndents: ['0', '8vw'],
    },
    items: [
      {
        title: ['LOKÁLNÍ', 'PŘED PŘEKLADEM'],
        body:
          'Globální asset je začátek, ne hotový social. Aby značka fungovala v českém feedu, potřebuje jazyk, situace a humor, který publikum pozná.',
      },
      {
        title: ['SITUACE', 'PŘED PRODUKTEM'],
        body:
          'KitKat nemusí začínat čokoládou. Začíná pauzou: momentem, ve kterém má značka přirozené místo a produkt nemusí působit tlačeně.',
      },
      {
        title: ['FORMÁT', 'PŘED POSTEM'],
        body:
          'Jednotlivý post rychle zmizí. Opakovatelný formát buduje rozpoznatelnost. Proto jsme z pauzy udělali systém, který se dá dlouhodobě rozvíjet.',
      },
      {
        title: ['MOMENT', 'PŘED LOGEM'],
        body:
          'Partnerství samo o sobě social neutáhne. F1 funguje ve chvíli, kdy se změní v lokální situaci, challenge nebo interakci, kterou lidé chtějí sledovat.',
      },
    ],
  },
};

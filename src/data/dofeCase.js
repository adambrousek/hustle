const IMG = '/extracted';
const PREVIEW = `${IMG}/page-07-img-0.jpeg`;

export const DOFE_CASE = {
  slug: 'dofe',
  visualVariant: 'dofe',
  bg: '#9C2088',
  themeColor: '#9C2088',
  chromeBottom: '#5C1048',
  logo: { src: '/logos/dofe.svg', alt: "The Duke of Edinburgh's International Award" },
  chapters: [
    {
      id: 'intro',
      headline: {
        uniform: true,
        lines: [
          'KAMPAŇ,',
          'KTERÁ NEPŘIVEDLA',
          'JEN ÚČASTNÍKY.',
          'ALE I POTŘEBU',
          'NOVÝCH MENTORŮ.',
        ],
        lineIndents: ['0', '0', '0', '0', '0'],
      },
      paragraphs: [
        'DofE je mezinárodní program pro mladé, který rozvíjí dovednosti, pohyb, dobrovolnictví a odvahu vystoupit z komfortní zóny. Pro ty, kdo ho znají, má obrovskou hodnotu. Pro lidi mimo komunitu ale může být těžké rychle pochopit, co přesně přináší a proč se do něj zapojit.',
        'Naším úkolem bylo DofE přiblížit lidem, kteří o programu ještě nepřemýšleli. Ne vysvětlovat ho jako interní metodiku, ale jako výzvu, která dává mladým lidem směr, zážitky, dovednosti a mezinárodně uznávaný výstup.',
        'Postavili jsme první akviziční kampaň, nastavili vizuální styl social příspěvků a vytvořili komunikační linku, která program vysvětluje jednoduše lidem mimo komunitu.',
      ],
      media: [
        { src: `${IMG}/page-07-img-0.jpeg`, className: 'proof-img--intro-lead' },
        { src: `${IMG}/page-07-img-3.jpeg`, className: 'proof-img--intro-accent' },
      ],
    },
    {
      id: 'clarity',
      flip: true,
      headline: {
        uniform: true,
        lines: [
          'SILNÝ',
          'PROGRAM',
          'NESTAČÍ,',
          'KDYŽ HO LIDÉ',
          'NECHÁPOU.',
        ],
        lineIndents: ['0', '0', '0', '0', '0'],
      },
      paragraphs: [
        'DofE má velkou hodnotu, ale zároveň v sobě spojuje několik témat najednou. Dobrovolnictví, pohyb, dovednosti, expedice, mentoring, certifikát. Pro členy komunity je to jasné. Pro nového člověka je to hodně informací najednou.',
        'Proto jsme komunikaci zjednodušili. Nezačínali jsme strukturou programu, ale důvodem, proč se zapojit. Ukázali jsme DofE jako cestu, kde člověk překoná sám sebe, zažije něco nového a získá výstup, který má hodnotu i mimo školu.',
        'Výsledkem byla akviziční linka, která program nepřekládá do nudného vysvětlování. Dává mu jasný důvod a energii.',
      ],
      media: [
        { src: `${IMG}/page-07-img-1.png`, className: 'proof-img--a' },
        { src: `${IMG}/page-07-img-0.jpeg`, className: 'proof-img--c' },
      ],
    },
    {
      id: 'reason',
      flip: false,
      headline: {
        uniform: true,
        lines: [
          'OD POPISU',
          'PROGRAMU',
          'K DŮVODU',
          'ZAPOJIT SE.',
        ],
        lineIndents: ['0', '0', '0', '0'],
      },
      paragraphs: [
        'U akviziční komunikace nestačí popsat, co všechno program obsahuje. Lidé se nezapojují kvůli výčtu aktivit. Zapojují se, když pochopí, co jim program může změnit v životě.',
        'Proto jsme DofE postavili jako osobní výzvu. Ne jako další školní aktivitu, ale jako způsob, jak získat zkušenosti, samostatnost, zážitky a důkaz, že člověk dokáže dotáhnout něco dlouhodobého.',
        'Komunikační linka tak pomohla vysvětlit program pro nečleny bez toho, aby ztratil hloubku.',
      ],
      media: [
        { src: `${IMG}/page-07-img-0.jpeg`, className: 'proof-img--a' },
        { src: `${IMG}/page-07-img-1.png`, className: 'proof-img--b' },
        { src: `${IMG}/page-07-img-2.jpeg`, className: 'proof-img--c' },
      ],
    },
    {
      id: 'ambassadors',
      flip: true,
      headline: {
        uniform: true,
        lines: [
          'AMBASADOŘI',
          'NEJSOU JEN TVÁŘE.',
          'JSOU TVŮRCI',
          'PROGRAMU.',
        ],
        lineIndents: ['0', '0', '0', '0'],
      },
      paragraphs: [
        'DofE má silnou komunitu ambasadorů. Aby ale jejich obsah mohl fungovat dlouhodobě, nestačí jim jen říct, aby natáčeli. Potřebují pochopit, jak přemýšlet o nápadu, pointě, formátu a rytmu videa.',
        'Proto jsme společně s tiktokerkou Stasy Magic vedli několik workshopů pro tým DofE ambasadorů. Provedli jsme je ideací, tvorbou krátkého videoobsahu a způsobem, jak přenést vlastní zkušenost do formátu, který funguje na sítích.',
        'Díky tomu DofE nemusí stát jen na dodávaném agenturním obsahu. Kombinuje profesionálně řízenou komunikaci s autentickým obsahem lidí, kteří program skutečně žijí.',
      ],
      media: [
        { src: `${IMG}/page-07-img-2.jpeg`, className: 'proof-img--a' },
        { src: `${IMG}/page-07-img-3.jpeg`, className: 'proof-img--b' },
        { src: `${IMG}/page-07-img-0.jpeg`, className: 'proof-img--c' },
      ],
    },
    {
      id: 'proof',
      flip: false,
      sceneProofsPlacement: 'body',
      sceneProofs: [
        { lines: ['PRVNÍ AKVIZIČNÍ KAMPAŇ'] },
        { lines: ['NÁBOR NOVÝCH MENTORŮ VE VYBRANÝCH REGIONECH'] },
        { lines: ['WORKSHOPY S AMBASADORY'] },
        { lines: ['KOMBINACE AGENTURNÍHO A VLASTNÍHO OBSAHU'] },
      ],
      sceneProofsVariant: 'awards',
      headline: {
        uniform: true,
        lines: [
          'DŮKAZ, ŽE',
          'DOBRÁ AKVIZICE',
          'MŮŽE OTEVŘÍT',
          'DALŠÍ PROBLÉM.',
        ],
        lineIndents: ['0', '0', '0', '0'],
      },
      paragraphs: [
        'První akviziční kampaň pro DofE byla tak úspěšná, že ve vybraných regionech nestačilo řešit jen zájem mladých lidí. Začala vznikat potřeba nových mentorů, kteří by rostoucí zájem dokázali podržet.',
        'To je silný důkaz, že komunikace nefungovala jen jako hezký social. Dokázala přivést zájem do reálného systému programu. A tím ukázala i další růstovou výzvu značky.',
        'DofE díky tomu získalo jasnější akviziční linku, sjednocený vizuální styl pro social a ambasadory, kteří dokážou doplňovat agenturní obsah vlastní autentickou tvorbou.',
      ],
      media: [
        { src: `${IMG}/page-07-img-0.jpeg`, className: 'proof-img--a' },
        { src: `${IMG}/page-07-img-1.png`, className: 'proof-img--b' },
        { src: `${IMG}/page-07-img-3.jpeg`, className: 'proof-img--c' },
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
        title: ['DŮVOD', 'PŘED STRUKTUROU'],
        body:
          'Program může být komplexní, ale akvizice musí začít jednoduše. Ne výčtem aktivit, ale jasným důvodem, proč se zapojit.',
      },
      {
        title: ['VÝZVA', 'PŘED VYSVĚTLOVÁNÍM'],
        body:
          'DofE funguje, když nepůsobí jako metodika. Funguje jako osobní výzva, která mladým lidem dává směr, zkušenosti a důkaz, že něco dokážou dotáhnout.',
      },
      {
        title: ['TVŮRCI', 'PŘED TVÁŘEMI'],
        body:
          'Ambasadoři nejsou jen lidé na fotkách. Když dostanou systém pro nápady a video tvorbu, umí doplnit agenturní obsah autentickým hlasem komunity.',
      },
      {
        title: ['ZÁJEM', 'PŘED KAPACITOU'],
        body:
          'Dobrá akviziční kampaň neřeší jen dosah. Přivádí reálný zájem do systému. U DofE to ve vybraných regionech otevřelo i potřebu nových mentorů.',
      },
    ],
  },
};

const VID = '/videos';
const PREVIEW = '/images/portfolio/pilulka-preview.png';

export const PILULKA_CASE = {
  slug: 'pilulka',
  bg: '#006858',
  themeColor: '#006858',
  chromeBottom: '#003830',
  logo: { src: '/logos/pilulka.svg', alt: 'Pilulka' },
  chapters: [
    {
      id: 'intro',
      headline: {
        lines: ['Z ONLINE LÉKÁRNY', 'HEALTH & LONGEVITY', 'PLATFORMA'],
        lineIndents: ['0', '8vw', '3vw'],
      },
      paragraphs: [
        'Pilulka po rebrandingu změnila ambici. Už neměla být jen místem, kde si člověk koupí vitamíny, léky nebo doplňky. Značka se začala posouvat k roli high-tech zdravotní platformy, která lidem pomáhá lépe rozumět tělu, měření, suplementaci a dlouhodobému zdraví.',
        'Tomu musel odpovídat i social. Nestačilo převléct produktové posty do nového vizuálu. Bylo potřeba změnit jejich logiku.',
        'Z výkladní skříně e-shopu jsme začali stavět kanál, který funguje jako health & longevity coach. Vysvětluje, dává kontext a produkt zapojuje až ve chvíli, kdy má skutečný důvod být součástí odpovědi.',
      ],
      media: [
        { type: 'video', src: `${VID}/pilulka-portfolio-hover.mp4`, className: 'proof-img--intro-lead' },
        { type: 'video', src: `${VID}/pilulka-1.mp4`, className: 'proof-img--intro-accent' },
      ],
    },
    {
      id: 'shift',
      headline: {
        lines: [
          'E-COMMERCE SOCIAL',
          'VYPADÁ JAKO LETÁK.',
          'ZDRAVÍ ALE NEZAČÍNÁ',
          'PRODUKTEM.',
        ],
        lineIndents: ['0', '6vw', '2vw', '10vw'],
      },
      paragraphs: [
        'Většina produktového obsahu začíná tím, co značka potřebuje prodat. U Pilulky jsme to otočili. Nejdřív hledáme problém, který člověk reálně řeší. Potom přidáme jednoduché vysvětlení, data nebo studii. A až nakonec ukážeme produkt jako přirozené řešení.',
        'Produkt tak není začátek komunikace. Je důkaz, že značka rozumí problému, o kterém mluví. Pilulka díky tomu může prodávat, aniž by její social působil jako katalog.',
      ],
      shift: {
        before: 'PRODUKT → BENEFIT → SLEVA → CTA',
        after: 'PROBLÉM → VYSVĚTLENÍ → DATA → ŘEŠENÍ',
      },
      media: [{ type: 'video', src: `${VID}/pilulka-1.mp4` }],
    },
    {
      id: 'system',
      headline: {
        lines: ['ZDRAVÍ S PŘESNOSTÍ', 'NENÍ CLAIM.', 'JE TO PRAVIDLO', 'TVORBY.'],
        lineIndents: ['0', '7vw', '12vw', '4vw'],
      },
      paragraphs: [
        'Aby social držel novou ambici značky, postavili jsme obsahový systém založený na přesnosti. Zdravotní tvrzení musí mít oporu ve zdroji, studii nebo jasné datové logice. Každý post musí člověku něco jednoduše vysvětlit. Ideální reakce není jen like, ale moment „aha, už vím“.',
        'Produkt do obsahu vstupuje až ve chvíli, kdy opravdu řeší popsaný problém. Ne jako povinný odkaz na e-shop, ale jako přirozená součást odpovědi. Pilulka tak nemluví jako obchod, který tlačí katalog. Mluví jako značka, která lidem pomáhá dělat přesnější rozhodnutí o vlastním zdraví.',
      ],
      media: [
        { type: 'video', src: `${VID}/pilulka-portfolio-hover.mp4` },
        { type: 'video', src: `${VID}/pilulka-2.mp4` },
        { src: PREVIEW },
      ],
    },
    {
      id: 'proof',
      headline: {
        lines: ['DŮKAZ, ŽE PRODUKTOVÝ SOCIAL', 'NEMUSÍ VYPADAT', 'JAKO KATALOG.'],
        lineIndents: ['0', '6vw', '14vw'],
      },
      paragraphs: [
        'Změna se neodehrála jen v copy nebo grafice. Přepsali jsme způsob, jak se Pilulka na sítích rozhoduje, o čem mluvit. Obsah nevzniká od produktu, ale od problému, který lidé řeší: spánek, stres, regenerace, ženské zdraví nebo suplementace.',
        'Tyto signály se vrací z reportingu zpět do tvorby. Nesledujeme jen výkon příspěvků, ale i kvalitu pozornosti: jestli lidé reagují k tématu, ukládají si obsah nebo ho sdílí dál. Díky tomu Pilulka nepublikuje další zdravotní obsah naslepo. Staví systém, který ví, jaká témata jsou pro publikum relevantní.',
        'Výsledkem je social, který dokáže prodávat bez toho, aby vypadal jako katalog. Produkt není začátek sdělení. Je přirozená odpověď na problém, který značka nejdřív pomůže pochopit.',
      ],
      media: [
        { type: 'video', src: `${VID}/pilulka-portfolio-hover.mp4`, layout: 'lead' },
        { type: 'video', src: `${VID}/pilulka-1.mp4` },
        { src: PREVIEW },
        { type: 'video', src: `${VID}/pilulka-2.mp4` },
      ],
    },
  ],
  keyLearnings: {
    title: {
      lines: ['PROČ TENHLE', 'SYSTÉM PRODÁVÁ'],
      lineIndents: ['0', '8vw'],
    },
    items: [
      {
        title: ['PRODUKT', 'NENÍ START'],
        body:
          'Produktový post nezačíná produktem. Začíná problémem, který člověk řeší. Teprve když značka problém vysvětlí, má produkt v obsahu přirozené místo.',
      },
      {
        title: ['PŘESNOST', 'PRODÁVÁ'],
        body:
          'U zdravotní značky nestačí hezký claim. Každé tvrzení potřebuje oporu v datech, studii nebo jasné logice. Důvěra vzniká z přesnosti, ne z většího tlaku na prodej.',
      },
      {
        title: ['ENGAGEMENT', 'NENÍ VŠECHNO'],
        body:
          'Vedle výkonu sledujeme i kvalitu pozornosti. Důležitější než prázdný like je reakce k tématu, uložení, sdílení nebo signál, že obsah člověku opravdu pomohl něco pochopit.',
      },
      {
        title: ['SOCIAL', 'NENÍ KATALOG'],
        body:
          'Pilulka nepotřebovala další místo pro produktové dlaždice. Potřebovala obsahový systém, který propojí edukaci, data, zdravotní témata a produkt jako řešení.',
      },
    ],
  },
};

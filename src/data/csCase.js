const VID = '/videos';
const PREVIEW = '/images/portfolio/cs-preview.png';

export const CS_CASE = {
  slug: 'cs',
  visualVariant: 'cs',
  bg: '#1868F0',
  themeColor: '#1868F0',
  chromeBottom: '#0E48B8',
  logo: { src: '/logos/ceska-sporitelna.svg', alt: 'Česká spořitelna' },
  chapters: [
    {
      id: 'intro',
      headline: {
        lines: [
          'Z BANKY,',
          'KTEROU LIDÉ POUŽÍVAJÍ,',
          'NA ZNAČKU,',
          'KTEROU CHTĚJÍ',
          'SLEDOVAT',
        ],
        lineIndents: ['0', '5vw', '10vw', '3vw', '8vw'],
      },
      paragraphs: [
        'Bankovní služby jsou pro většinu lidí zaměnitelné. Účet, karta, hypotéka, aplikace. Rozdíl se často nedělá v produktu, ale ve vztahu ke značce. A právě na sociálních sítích je banka lidem nejblíž.',
        'Česká spořitelna to pochopila dřív než většina trhu. Společně jsme ze socialu neudělali další placement kampaní, ale jeden z hlavních komunikačních kanálů značky.',
        'Spravujeme hlavní kanály značky, tvoříme obsah, držíme strukturu feedu a propojujeme brandová, produktová i interní témata tak, aby banka působila relevantně, současně a pořád důvěryhodně.',
      ],
      media: [
        { type: 'video', src: `${VID}/cs-portfolio-hover.mp4`, className: 'proof-img--intro-lead' },
        { type: 'video', src: `${VID}/cs-1.mp4`, className: 'proof-img--intro-accent' },
      ],
      sceneProofs: [
        { lines: ['SOCIAL MEDIA PROFIL ROKU', 'Fénix Content Marketing'] },
        { lines: ['TOP 5 ZNAČKA NA SOCIALU', 'Czech Social Awards'] },
        { lines: ['TOP 20 LOVEBRAND GEN Z', 'Ipsos 2024'] },
      ],
      sceneProofsVariant: 'awards',
      sceneProofsPlacement: 'aside',
    },
    {
      id: 'corporat',
      flip: false,
      headline: {
        lines: ['KORPORÁT', 'NEMUSÍ ZNÍT', 'JAKO KORPORÁT.'],
        lineIndents: ['0', '6vw', '12vw'],
      },
      paragraphs: [
        'Velká značka má přirozeně hodně pravidel. Brandové mantinely, právní limity, interní témata, produktové priority, CSR, eventy, kampaně. Problém je, že na sítích z toho často vznikne obsah, který vypadá jako interní newsletter převedený do čtverce.',
        'U Spořitelny jsme tenhle model otočili. Neptáme se jen, co značka potřebuje říct. Ptáme se, jak to má na socialu žít. Produktové, brandové i interní sdělení převádíme do formátů, které respektují logiku kanálu a zároveň drží směr značky.',
        'Výsledek je komunikace, která nepůsobí jako povinná korporátní přítomnost. Působí jako značka, která rozumí svému publiku a umí s ním mluvit.',
      ],
      media: [
        { type: 'video', src: `${VID}/cs-1.mp4`, className: 'proof-img--a' },
        { type: 'video', src: `${VID}/cs-2.mp4`, className: 'proof-img--c' },
      ],
    },
    {
      id: 'channels',
      flip: true,
      headline: {
        lines: ['SOCIAL NENÍ', 'DALŠÍ PLACEMENT.', 'JE TO PRIMÁRNÍ', 'KANÁL ZNAČKY.'],
        lineIndents: ['0', '5vw', '9vw', '2vw'],
      },
      paragraphs: [
        'Dlouhodobě jsme pomohli otočit vnímání socialu uvnitř značky. Z místa, kam se překlápí hotové kampaně, se stal kanál, který má vlastní roli, plánování, strukturu a obsahovou odpovědnost.',
        'Sjednotili jsme komunikaci napříč hlavními profily a prodejními tématy. Instagram drží vizuální a brandovou linku, Facebook pomáhá vysvětlovat širší témata a TikTok otevírá značku mladšímu publiku. Každý kanál má jinou roli, ale dohromady tvoří jeden rozpoznatelný hlas.',
        'To je rozdíl mezi správou profilů a řízením social ekosystému.',
      ],
      media: [
        { type: 'video', src: `${VID}/cs-portfolio-hover.mp4`, className: 'proof-img--a' },
        { type: 'video', src: `${VID}/cs-1.mp4`, className: 'proof-img--b' },
        { type: 'video', src: `${VID}/cs-2.mp4`, className: 'proof-img--c' },
      ],
    },
    {
      id: 'tiktok',
      flip: false,
      headline: {
        uniform: true,
        lines: [
          'Z NULY NA 42K+',
          'SLEDUJÍCÍCH.',
          'TIKTOK JAKO',
          'PLNOHODNOTNÝ',
          'KANÁL ZNAČKY.',
        ],
        lineIndents: ['0', '0', '0', '0', '0'],
      },
      paragraphs: [
        'Pro Spořitelnu jsme TikTok postavili od nuly a dostali ho na více než 42 tisíc sledujících. Ne jako vedlejší experiment, ale jako kanál, který značce otevírá mladší publikum a dokáže reagovat na tempo platformy.',
        'Aby značka zvládla rychlost TikToku bez ztráty kontroly, vytvořili jsme Trend Factory: skupinu tvůrců, která generuje nápady, rychle stříhá trendová videa a dává social media týmu živý zásobník výstupů.',
      ],
      media: [
        { type: 'video', src: `${VID}/cs-2.mp4`, className: 'proof-img--a' },
        { type: 'video', src: `${VID}/cs-1.mp4`, className: 'proof-img--b' },
        { type: 'video', src: `${VID}/cs-portfolio-hover.mp4`, className: 'proof-img--c' },
      ],
    },
    {
      id: 'proof',
      flip: true,
      headline: {
        lines: ['DŮKAZ, ŽE VELKÁ BANKA', 'MŮŽE MÍT NA SÍTÍCH', 'DUŠI.'],
        lineIndents: ['0', '6vw', '14vw'],
      },
      paragraphs: [
        'Výsledek není jen v tom, že profily fungují. Výsledek je v tom, že takhle velký korporát dokáže na sítích působit lidsky, současně a konzistentně. Spořitelna se díky tomu dlouhodobě drží mezi značkami, které na socialu nevypadají jako povinnost, ale jako přirozená součást kultury.',
        'Kanály získávají ocenění, publikum je sleduje dobrovolně a značka dokáže do běžné komunikace zapojit i témata, která by jinde skončila jako nudný aftermovie nebo interní povinnost.',
        'Ze sociálních sítí České spořitelny jsme udělali jednotný komunikační kanál s vlastní duší. Ne soubor placementů. Ne vývěsku. Ne korporátní archiv. Kanál, který drží značku blízko lidem.',
      ],
      media: [
        { src: PREVIEW, className: 'proof-img--a' },
        { type: 'video', src: `${VID}/cs-1.mp4`, className: 'proof-img--b' },
        { type: 'video', src: `${VID}/cs-2.mp4`, className: 'proof-img--c' },
      ],
    },
  ],
  keyLearnings: {
    title: {
      lines: ['PROČ TENHLE', 'SYSTÉM VYHRÁVÁ'],
      lineIndents: ['0', '8vw'],
    },
    items: [
      {
        title: ['ZNAČKA', 'PŘED PRODUKTEM'],
        body:
          'V bankovnictví se produkty snadno zamění. Vztah ke značce ne. Proto social nestavíme jako katalog služeb, ale jako každodenní kontakt se značkou.',
      },
      {
        title: ['KANÁL', 'PŘED PLACEMENTEM'],
        body:
          'Social není místo, kam se jen překlápí kampaně. Má vlastní dramaturgii, tempo, community a odpovědnost za to, jak značka působí mezi lidmi.',
      },
      {
        title: ['RYCHLOST', 'BEZ CHAOSU'],
        body:
          'Trend Factory umožňuje reagovat na aktuální témata rychle, ale pořád v mantinelech značky. To je rozdíl mezi korporátním schvalováním a živým socialem.',
      },
      {
        title: ['DUŠE', 'V MANTINELECH'],
        body:
          'Velký korporát může komunikovat lidsky, pokud má jasný systém. Spořitelna díky tomu působí relevantně pro mladé publikum, aniž by ztratila důvěryhodnost.',
      },
    ],
  },
};

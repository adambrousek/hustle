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
    workType: 'Instagram · Facebook · TikTok',
    headlineLines: [
      { text: 'Z největší banky v zemi', indent: '0' },
      { text: 'social značka,', indent: '9vw' },
      { text: 'kterou lidi sledují dobrovolně', indent: '2.5vw' },
    ],
    perex:
      'Bankovní produkty jsou zaměnitelné. Rozdíl nevzniká v tabulce benefitů, ale v důvěře a zapamatovatelnosti. Social je tam, kde se značka stává blízkou.',
    proofBar: [
      { label: 'Profil roku', text: 'Social Media Profil roku' },
      { label: 'Top 5', text: 'Czech Social Awards' },
      { label: 'Top 20', text: 'Gen Z lovebrand · Ipsos 2024' },
      { label: '41k+', text: 'TikTok od nuly' },
    ],
    logos: proofById('cs').logos,
    accent: sectionColor('cs'),
    bg: proofBg('cs')?.bg ?? '#1868F0',
    themeColor: proofBg('cs')?.color ?? '#1868F0',
    chromeBottom: proofBg('cs')?.chromeBottom ?? '#0E48B8',
    heroVideo: `${VID}/cs-portfolio-hover.mp4`,
    heroPoster: '/images/portfolio/cs-preview.png',
    sections: [
      {
        type: 'statement',
        headingLines: [
          { text: 'Korporátní social je často', indent: '0' },
          { text: 'bezpečný až k neviditelnosti', indent: '7vw' },
        ],
        body: [
          'U velké banky do obsahu vstupuje brand, právo, reputace i schvalování. Všechno musí být správně — a social často končí jako další placement kampaně.',
          'Se Spořitelnou jsme neřešili víc příspěvků. Řešili jsme, jak posunout hranice toho, co si korporát na sítích může dovolit.',
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Ze socialu jako placementu', indent: '0' },
          { text: 'primární kanál značky', indent: '11vw' },
        ],
        body: [
          'Social přestal být koncová stanice kampaní. Stal se prostorem, podle kterého se začala přemýšlet komunikace napříč značkou.',
          'Instagram, Facebook a TikTok spravujeme jako jeden ekosystém — dramaturgie, produkce, copy i community.',
        ],
      },
      {
        type: 'framework',
        headingLines: [
          { text: 'Jeden ekosystém.', indent: '0' },
          { text: 'Tři role.', indent: '5vw' },
          { text: 'Jeden hlas.', indent: '14vw' },
        ],
        columns: [
          {
            title: 'Instagram',
            body: 'Hlavní výkladní skříň značky. Produkty, edukace, kultura, CSR i brand v jednom feedu bez roztříštěnosti.',
          },
          {
            title: 'Facebook',
            body: 'Kanál pro širší publikum a srozumitelné vysvětlování. Community odpovědi lidsky, ale důvěryhodně.',
          },
          {
            title: 'TikTok',
            body: 'Růstový kanál vybudovaný od nuly jako součást ekosystému. 41 000+ sledujících, 300+ videí.',
          },
        ],
      },
      {
        type: 'stack',
        headingLines: [
          { text: 'Systém, díky kterému', indent: '0' },
          { text: 'může být korporát rychlejší', indent: '6vw' },
        ],
        items: [
          {
            title: 'Jednotná dramaturgie',
            text: 'Produkty, edukaci, CSR i prodej převádíme do social-first formátů — ne jako povinné posty.',
          },
          {
            title: 'Trend Factory',
            text: 'Systém rychlé produkce. Tvůrci generují nápady a videa, ze kterých social tým rychle vybírá.',
          },
          {
            title: 'Bezpečný relatable obsah',
            text: 'Memes a trendová videa, která fungují ve feedu, ale neporušují práva ani brandové mantinely.',
          },
          {
            title: 'Community v tónu značky',
            text: 'Odpovědi nejsou podpora. Jsou každodenní hlas značky — lidsky a srozumitelně.',
          },
        ],
      },
      {
        type: 'proofGrid',
        headingLines: [
          { text: 'Důkaz, že i banka', indent: '0' },
          { text: 'může být social značka', indent: '8vw' },
        ],
        columns: 2,
        items: [
          { text: 'Social Media Profil roku · Fénix Content Marketing' },
          { text: 'Top 5 značka na sociálních sítích · Czech Social Awards' },
          { text: 'Top 20 lovebrand generace Z · Ipsos 2024' },
          { text: 'Dlouhodobá správa Instagramu, Facebooku a TikToku' },
          { text: 'Jednotná dramaturgie, tón a community napříč kanály' },
          { value: '41 000+', label: 'sledujících na TikToku od nuly' },
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Když produkty vypadají stejně,', indent: '0' },
          { text: 'rozhoduje vztah ke značce', indent: '10vw' },
        ],
        body: [
          'Spořitelna dnes na socialu nepůsobí jako korporát s publikačním plánem. Působí jako značka s duší, rytmem a jasným názorem.',
        ],
      },
    ],
    cta: {
      headingLines: [
        { text: 'Chcete zjistit,', indent: '0' },
        { text: 'co drží zpátky váš social?', indent: '4vw' },
      ],
      body: 'Začínáme Content Blueprintem. Podíváme se, jak vaše značka na sítích působí a jaký systém jí může pomoct růst.',
      label: 'PROBRAT CONTENT BLUEPRINT',
      href: '/kontakt',
    },
  },

  pilulka: {
    slug: 'pilulka',
    brand: 'Pilulka',
    workType: 'Social po rebrandingu · Health & longevity',
    headlineLines: [
      { text: 'Z online lékárny', indent: '0' },
      { text: 'health & longevity', indent: '8vw' },
      { text: 'platforma', indent: '3vw' },
    ],
    perex:
      'Pilulka po rebrandingu změnila ambici. Z e-commerce lékárny k high-tech zdravotní platformě. Naším úkolem bylo dostat tuhle změnu do socialu.',
    proofBar: [
      { label: 'Rebrand', text: 'Převzetí socialu po rebrandingu' },
      { label: 'Strategie', text: 'Zdraví s přesností' },
      { label: 'Data', text: 'Data-first obsahový systém' },
      { label: 'Product', text: 'Produkt jako řešení, ne leták' },
    ],
    logos: proofById('pilulka').logos,
    accent: sectionColor('pilulka'),
    bg: proofBg('pilulka')?.bg ?? '#006858',
    themeColor: proofBg('pilulka')?.color ?? '#006858',
    chromeBottom: proofBg('pilulka')?.chromeBottom ?? '#003830',
    heroVideo: `${VID}/pilulka-1.mp4`,
    heroPoster: `${IMG}/page-03-img-2.jpeg`,
    sections: [
      {
        type: 'statement',
        headingLines: [
          { text: 'E-commerce social vypadá', indent: '0' },
          { text: 'jako leták.', indent: '10vw' },
          { text: 'Zdraví ale nezačíná produktem.', indent: '2vw' },
        ],
        body: [
          'Většina značek v kategorii zdraví komunikuje stejně: produkt, benefit, sleva, CTA.',
          'Lidé nesledují značky proto, aby viděli další regál. Sledují je, když jim pomáhají pochopit problém, který právě řeší.',
        ],
      },
      {
        type: 'beforeAfter',
        headingLines: [
          { text: 'Produkt není obsah.', indent: '0' },
          { text: 'Produkt je důkaz řešení.', indent: '7vw' },
        ],
        before: {
          label: 'Běžný e-commerce post',
          items: ['Produkt', 'Benefit', 'Sleva', 'CTA'],
        },
        after: {
          label: 'Pilulka social',
          items: ['Problém', 'Vysvětlení', 'Data', 'Řešení'],
        },
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Health &', indent: '0' },
          { text: 'longevity coach', indent: '12vw' },
        ],
        body: ['Pilulka na socialu nevystupuje jako katalog doplňků. Vystupuje jako průvodce zdravím:'],
        bullets: [
          'co má smysl měřit',
          'jak číst signály vlastního těla',
          'jak individuálně suplementovat',
          'jak pracovat se spánkem, stresem a regenerací',
        ],
      },
      {
        type: 'framework',
        eyebrow: 'Metoda',
        headingLines: [
          { text: 'Zdraví s přesností', indent: '0' },
          { text: 'není claim.', indent: '6vw' },
          { text: 'Je to pravidlo tvorby.', indent: '12vw' },
        ],
        columns: [
          {
            title: 'Opora v datech',
            body: 'Zdravotní tvrzení zdrojujeme studiemi, veřejnými daty, daty z ekosystému Pilulky nebo poznatky od publika.',
          },
          {
            title: 'Aha moment',
            body: 'Každé copy musí dát jednoduchou odpověď. Ne jen inspiraci, ale moment: „aha, už vím".',
          },
          {
            title: 'Přirozené řešení',
            body: 'Kde to dává smysl, linkujeme produkt. Ne jako banner, ale jako logické pokračování tématu.',
          },
        ],
      },
      {
        type: 'stack',
        headingLines: [
          { text: 'Systém pro značku,', indent: '0' },
          { text: 'která nechce být jen e-shop', indent: '5vw' },
        ],
        items: [
          {
            title: 'Social strategie po rebrandingu',
            text: 'Převzetí sítí v momentě posunu z online lékárny do health & longevity prostoru.',
          },
          {
            title: 'Obsah pro niche audiences',
            text: 'Longevity komunita: měření, suplementace, prevence, výkon, energie.',
          },
          {
            title: 'Datově řízený product placement',
            text: 'Produkty až ve chvíli, kdy odpovídají na problém z dat, sezony nebo trendů.',
          },
          {
            title: 'Stories jako výzkum',
            text: 'Dotazníky ve Stories jako zdroj insightů — co lidé řeší a jaká témata mají vznikat.',
          },
        ],
      },
      {
        type: 'proofGrid',
        headingLines: [
          { text: 'Důkaz, že produktový social', indent: '0' },
          { text: 'nemusí vypadat jako katalog', indent: '6vw' },
        ],
        items: [
          { text: 'Převzetí socialu po rebrandingu' },
          { text: 'Strategie „zdraví s přesností"' },
          { text: 'Posun k roli health & longevity coach' },
          { text: 'Datově řízený product placement' },
          { text: 'Zdravotní tvrzení opřená o studie a data' },
          { text: 'Stories dotazníky jako zdroj insightů' },
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Když značka změní ambici,', indent: '0' },
          { text: 'social musí změnit roli.', indent: '8vw' },
        ],
        body: [
          'Pilulka nepotřebovala hezčí produktové posty. Potřebovala změnit důvod, proč ji lidé sledují.',
        ],
      },
    ],
    cta: {
      headingLines: [
        { text: 'Mění se vaše značka,', indent: '0' },
        { text: 'ale social pořád mluví postaru?', indent: '4vw' },
      ],
      body: 'Začínáme Content Blueprintem. Přeložíme positioning značky do obsahu, který lidé pochopí a tým dokáže používat.',
      label: 'PROBRAT CONTENT BLUEPRINT',
      href: '/kontakt',
    },
  },

  sportisimo: {
    slug: 'sportisimo',
    brand: 'Sportisimo',
    workType: 'Interim správa · CZ/SK · Social restart',
    headlineLines: [
      { text: 'Za 3 měsíce jsme probudili social,', indent: '0' },
      { text: 'který byl roky', indent: '6vw' },
      { text: 'na druhé koleji', indent: '14vw' },
    ],
    perex:
      'Velké publikum, ale profily žily ze slev a tvrdého prodeje. Dostali jsme úkol social restartovat: směr, měření a interim správa CZ/SK.',
    proofBar: [
      { label: '169', text: 'publikací za Q1 CZ/SK' },
      { label: '351 498', text: 'organických impresí v Česku' },
      { label: '12 237', text: 'engagementů v Česku' },
      { label: '+39 %', text: 'růst impresí v březnu' },
      { label: '10,45 %', text: 'Ad Recall Lift' },
    ],
    logos: proofById('sportisimo').logos,
    accent: sectionColor('sportisimo'),
    bg: proofBg('sportisimo')?.bg ?? '#0058B0',
    themeColor: proofBg('sportisimo')?.color ?? '#0058B0',
    chromeBottom: proofBg('sportisimo')?.chromeBottom ?? '#002858',
    heroPoster: `${IMG}/page-04-img-0.jpeg`,
    sections: [
      {
        type: 'statement',
        headingLines: [
          { text: 'Velké publikum.', indent: '0' },
          { text: 'Slabý vztah.', indent: '10vw' },
        ],
        body: [
          'Fanoušci, zásah i známost — ale social nebyl brandový kanál. Profily stály na slevách a soutěžích. Bez slevy značka ve feedu mizí.',
          'Úkol: změnit roli socialu z výprodejové nástěnky na kanál, který buduje zapamatovatelnost a vztah.',
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Od krabice na boty', indent: '0' },
          { text: 'k parťákovi pro pohyb', indent: '8vw' },
        ],
        body: [
          'Content Blueprint workshop. Výsledek: Pohyb? Sportisimo.',
          'Značka, která se objeví, když chceš začít, pokračovat nebo znovu najít radost z pohybu.',
        ],
      },
      {
        type: 'stack',
        headingLines: [
          { text: 'Interim agentura', indent: '0' },
          { text: 'pro restart socialu', indent: '9vw' },
        ],
        items: [
          { title: 'Směr', text: 'Pilíře: radost z pohybu, rodina, parťák na začátku, pomáháme vybrat.' },
          { title: 'Správa', text: 'Každodenní správa profilů CZ/SK: plánování, publikace, koordinace.' },
          { title: 'Měření', text: 'Ad Recall Lift, Cost per Recall, ThruPlays, Blended Engagement Rate.' },
          { title: 'Produkce', text: 'Workflow Sportisimo × Ateliér × Mark BBDO × Hustle.' },
        ],
      },
      {
        type: 'framework',
        eyebrow: 'KPI',
        headingLines: [
          { text: 'Mrtvé profily začaly', indent: '0' },
          { text: 'znovu dávat signály', indent: '7vw' },
        ],
        columns: [
          {
            title: 'Dosah',
            body: '351 498 organických impresí CZ. 104 052 SK bez paid. 169 publikací napříč CZ/SK. +39 % meziměsíční růst v březnu.',
          },
          {
            title: 'Ad Recall',
            body: 'Lift 6,16 % v únoru, 10,45 % v březnu. Cost per Recall 0,35–0,53 Kč. 1,36 mil. impresí z paid testů.',
          },
          {
            title: 'Engagement',
            body: '12 237 CZ, 4 011 SK. Engagement v březnu 2× vyšší než v únoru. 25 522 ThruPlays v březnovém video testu.',
          },
        ],
      },
      {
        type: 'proofGrid',
        headingLines: [
          { text: 'Výsledky', indent: '0' },
          { text: 'po 3 měsících', indent: '8vw' },
        ],
        columns: 3,
        items: [
          { value: '351 498', label: 'organických impresí CZ' },
          { value: '12 237', label: 'engagementů CZ' },
          { value: '+39 %', label: 'růst impresí v březnu' },
          { value: '104 052', label: 'organických impresí SK' },
          { value: '4 011', label: 'engagementů SK' },
          { value: '169', label: 'publikací CZ/SK' },
          { value: '10,45 %', label: 'Ad Recall Lift březen' },
          { value: '25 522', label: 'ThruPlays video test' },
          { value: '+1 907', label: 'nových followers CZ' },
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Výprodej vytváří reakci.', indent: '0' },
          { text: 'Značka vytváří paměť.', indent: '8vw' },
        ],
        body: [
          'Oddělili jsme soutěžní engagement od skutečného kreativního výkonu. Brandový social začíná tam, kde si lidé na značku vzpomenou dřív, než hledají slevu.',
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Sportisimo nepotřebovalo víc postů.', indent: '0' },
          { text: 'Potřebovalo znovu nastartovat roli socialu.', indent: '3vw' },
        ],
        body: [
          'Za 3 měsíce z profilů na druhé koleji kanály s jasným směrem, měřením a výkonem.',
        ],
      },
    ],
    cta: {
      headingLines: [
        { text: 'Máte profily,', indent: '0' },
        { text: 'které jen přežívají?', indent: '5vw' },
      ],
      body: 'Začínáme Content Blueprintem. Najdeme roli vašeho socialu a ukážeme, co má smysl měřit.',
      label: 'PROBRAT CONTENT BLUEPRINT',
      href: '/kontakt',
    },
  },

  kitkat: {
    slug: 'kitkat',
    brand: 'KitKat',
    workType: 'Lokální adaptace · F1 crossover · Global campaign',
    headlineLines: [
      { text: 'Z globálního claimu', indent: '0' },
      { text: 'český social', indent: '8vw' },
      { text: 's vlastní duší', indent: '3vw' },
    ],
    perex:
      'KitKat má globální strategii a ikonický claim. Na českém socialu ale potřebuje vlastní jazyk, rytmus a komunitu — ne překlad z centrály.',
    proofBar: [
      { label: 'Blueprint', text: 'Lokální adaptace globální strategie' },
      { label: 'Community', text: 'Manuál pro dlouhodobý social' },
      { label: 'Formáty', text: 'Signature výstupy ve feedu' },
      { label: 'F1', text: 'Crossover s Českou spořitelnou' },
    ],
    logos: proofById('kitkat').logos,
    accent: sectionColor('kitkat'),
    bg: proofBg('kitkat')?.bg ?? '#E81828',
    themeColor: proofBg('kitkat')?.color ?? '#E81828',
    chromeBottom: proofBg('kitkat')?.chromeBottom ?? '#A00010',
    heroVideo: `${VID}/kitkat-portfolio-hover.mp4`,
    heroPoster: '/images/portfolio/kitkat-preview.png',
    sections: [
      {
        type: 'statement',
        headingLines: [
          { text: 'Globální značka může být ikonická.', indent: '0' },
          { text: 'A stejně působit vzdáleně.', indent: '6vw' },
        ],
        body: [
          'Globální kampaň funguje v centrále. Na českém socialu ale potřebuje lokální příběh, vlastní rytmus a komunitní kontext.',
          'Úkol: přizpůsobit globální směr českému publiku — bez ztráty identity značky.',
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Lokální blueprint', indent: '0' },
          { text: 'místo překladu kampaně', indent: '8vw' },
        ],
        body: [
          'Vytvořili jsme českou adaptaci: lokální příběh, obsahové pilíře, community manuál a signature formáty pro dlouhodobý feed.',
        ],
      },
      {
        type: 'statement',
        impact: true,
        headingLines: [
          { text: 'F1 crossover:', indent: '0' },
          { text: 'značky, které spolu mluví', indent: '5vw' },
        ],
        body: [
          'Díky práci pro Českou spořitelnu dokážeme KitKat a CS propojit ve feedu. Ne loga vedle sebe — profily, které interagují a vytváří lokální social moment.',
        ],
      },
      {
        type: 'framework',
        eyebrow: 'Měření',
        headingLines: [
          { text: 'Tři vrstvy', indent: '0' },
          { text: 'výkonu značky', indent: '10vw' },
        ],
        columns: [
          {
            title: 'Pulse',
            body: 'Zdraví značky v čase. Jak české publikum vnímá KitKat — relevance, zapamatovatelnost, emoční blízkost.',
          },
          {
            title: 'Battle',
            body: 'Výkon obsahu proti kategorii. Co funguje v českém kontextu, co ne — a proč.',
          },
          {
            title: 'Streets',
            body: 'Komunitní signály. Komentáře, sdílení, UGC a momenty, kdy se značka stává součástí kultury.',
          },
        ],
      },
      {
        type: 'proofGrid',
        headingLines: [
          { text: 'Co jsme postavili', indent: '0' },
        ],
        columns: 2,
        items: [
          { text: 'Lokální blueprint pro český social' },
          { text: 'Adaptace globální strategie bez ztráty identity' },
          { text: 'Community manuál pro dlouhodobý feed' },
          { text: 'Signature formáty opakovatelné ve výstupech' },
          { text: 'F1 crossover s Českou spořitelnou ve feedu' },
          { text: 'Lokální social moment místo log vedle sebe' },
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Globální claim.', indent: '0' },
          { text: 'Lokální duše.', indent: '12vw' },
        ],
        body: [
          'KitKat na českém socialu nepůsobí jako přeložená kampaň. Působí jako značka, která rozumí českému publiku a umí s ním mluvit.',
        ],
      },
    ],
    cta: {
      headingLines: [
        { text: 'Máte globální strategii,', indent: '0' },
        { text: 'ale lokální social nefunguje?', indent: '4vw' },
      ],
      body: 'Začínáme Content Blueprintem. Přizpůsobíme globální směr lokálnímu publiku bez ztráty identity značky.',
      label: 'PROBRAT CONTENT BLUEPRINT',
      href: '/kontakt',
    },
  },

  dofe: {
    slug: 'dofe',
    brand: 'DofE',
    workType: 'Akviziční kampaň · Social · Ambasadoři',
    headlineLines: [
      { text: 'Kampaň, která nepřivedla', indent: '0' },
      { text: 'jen účastníky.', indent: '8vw' },
      { text: 'Přinesla potřebu nových mentorů.', indent: '2vw' },
    ],
    perex:
      'Silný program pro mladé lidi. Ale pro člověka zvenku se hodnota musí rychle vysvětlit. Z komplexního programu jsme udělali akviziční komunikaci s reálnou poptávkou.',
    proofBar: [
      { label: 'Kampaň', text: 'První akviziční kampaň DofE' },
      { label: 'Mentoři', text: 'Noví mentoři v regionech' },
      { label: 'Styl', text: 'Grafický styl social příspěvků' },
      { label: 'Ambasadoři', text: 'Workshopy se Stasy Magic' },
    ],
    logos: proofById('dofe').logos,
    accent: sectionColor('dofe'),
    bg: proofBg('dofe')?.bg ?? '#9C2088',
    themeColor: proofBg('dofe')?.color ?? '#9C2088',
    chromeBottom: proofBg('dofe')?.chromeBottom ?? '#5C1048',
    heroPoster: `${IMG}/page-07-img-0.jpeg`,
    sections: [
      {
        type: 'statement',
        headingLines: [
          { text: 'Silný program,', indent: '0' },
          { text: 'který se musel přestat', indent: '6vw' },
          { text: 'vysvětlovat složitě', indent: '12vw' },
        ],
        body: [
          'DofE je dlouhodobá výzva — rozvoj, komunita, certifikát. Silné, ale na socialu snadno zdlouhavé.',
          'Úkol: linka, díky které program pochopí i člověk, který o něm slyší poprvé.',
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'Od popisu programu', indent: '0' },
          { text: 'k důvodu zapojit se', indent: '9vw' },
        ],
        body: [
          'DofE není další školní aktivita. Je to výzva, ve které si mladý člověk dokáže, co v něm je.',
          'Místo „takhle program funguje" → „tady můžeš začít něco, co tě posune".',
        ],
      },
      {
        type: 'stack',
        headingLines: [
          { text: 'Akviziční social', indent: '0' },
          { text: 'pro program zvenku', indent: '9vw' },
        ],
        items: [
          {
            title: 'První akviziční kampaň',
            text: 'Získávání nových účastníků mimo existující komunitu.',
          },
          {
            title: 'Komunikační linka pro nečleny',
            text: 'Osobní výzva místo systému pravidel.',
          },
          {
            title: 'Grafický styl social příspěvků',
            text: 'Konzistentní vizuál napříč tématy.',
          },
          {
            title: 'Ambasadoři jako tvůrci',
            text: 'Workshopy se Stasy Magic: ideace, video, vlastní zkušenost na sítích.',
          },
        ],
      },
      {
        type: 'framework',
        headingLines: [
          { text: 'Agenturní směr.', indent: '0' },
          { text: 'Ambasadorská autenticita.', indent: '10vw' },
        ],
        columns: [
          {
            title: 'Akvizice',
            body: 'Profesionálně vedená komunikace s jasnou linkou pro nečleny. Vysvětlí hodnotu a přivede k dalšímu kroku.',
          },
          {
            title: 'Ambasadoři',
            body: 'Autentický obsah od lidí, kteří program zažili. Jazyk cílové skupiny a důvěryhodnost, kterou značka sama nenahradí.',
          },
          {
            title: 'Mentoři',
            body: 'Když akvizice funguje, nestačí nabírat účastníky. Ve vybraných regionech DofE muselo začít řešit nábor nových mentorů.',
          },
        ],
      },
      {
        type: 'proofGrid',
        headingLines: [
          { text: 'Když akvizice začne fungovat,', indent: '0' },
          { text: 'nestačí nabírat jen účastníky', indent: '3vw' },
        ],
        columns: 2,
        items: [
          {
            value: 'Mentoři',
            label: 'Ve vybraných regionech potřeba řešit nábor nových mentorů',
            highlight: true,
          },
          { value: 'Účastníci', label: 'Nárůst zájmu o zapojení do programu' },
          { text: 'První akviziční kampaň DofE' },
          { text: 'Nový grafický styl social příspěvků' },
          { text: 'Komunikační linka pro nečleny' },
          { text: 'Workshopy pro ambasadory se Stasy Magic' },
          { text: 'Propojení agenturního a ambasadorského obsahu' },
        ],
      },
      {
        type: 'statement',
        headingLines: [
          { text: 'DofE nepotřebovalo jen vysvětlit program.', indent: '0' },
          { text: 'Potřebovalo ukázat, proč začít.', indent: '5vw' },
        ],
        body: [
          'Ze složitého programu jednoduchá výzva: začni, posuň se, dokaž si, co v tobě je.',
          'Když social začne skutečně nabírat, neřešíte jen kampaň. Řešíte, kdo všechny nové zájemce povede.',
        ],
      },
    ],
    cta: {
      headingLines: [
        { text: 'Máte silný program,', indent: '0' },
        { text: 'ale lidé ho nechápou dost rychle?', indent: '4vw' },
      ],
      body: 'Začínáme Content Blueprintem. Najdeme komunikační linku, která promění social v akviziční kanál.',
      label: 'PROBRAT CONTENT BLUEPRINT',
      href: '/kontakt',
    },
  },
};

export function getCaseStudyDetail(slug) {
  return CASE_STUDIES[slug] ?? null;
}

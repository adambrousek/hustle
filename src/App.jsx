import { useRef } from 'react';
import { PROOFS } from './data/proofs';
import { useScrollEffects } from './hooks/useScrollEffects';

function Header() {
  return (
    <header className="header">
      <a href="#" className="header-logo">
        <img
          src="/logos/hustle.svg"
          alt="Hustle"
          className="header-logo-img"
          width={156}
          height={56}
        />
      </a>
      <nav className="header-nav">
        <a href="#dukazy">DŮKAZY</a>
        <a href="#system">SYSTÉM</a>
        <a href="#kontakt">KONTAKT</a>
      </nav>
    </header>
  );
}

function Hero({ sectionRef, claimRef, supportRef }) {
  const lines = [
    { text: 'SOCIAL MEDIA' },
    { text: 'AGENTURA' },
    { text: 'PRO ZNAČKY,' },
    { text: 'KTERÉ NECHTĚJÍ' },
    { text: 'ZNÍT JAKO' },
    { text: 'ZNAČKY.' },
  ];

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-inner">
        <h1 className="hero-headline" ref={claimRef}>
          {lines.map((line) => (
            <span key={line.text} className="hero-line">
              {line.text}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

function ProofVisual({ proof }) {
  if (!proof.images?.length) return null;

  return (
    <div className={`proof-visual proof-visual--${proof.id}`} aria-hidden="true">
      {(proof.images || []).map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt=""
          className={`proof-img ${img.className}`}
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}

function ProofSection({ proof, sectionRef, isFirst }) {
  return (
    <section
      className={`proof-section ${proof.layout}`}
      ref={sectionRef}
      data-proof={proof.id}
      id={isFirst ? 'dukazy' : undefined}
    >
      <div className="sticky-stage">
        <ProofVisual proof={proof} />

        <div className="proof-content">
          <h2 className="claim">
            {proof.lines.map((line, i) => (
              <span
                key={line}
                className="claim-line"
                style={{ marginLeft: proof.lineXs[i] }}
              >
                {line}
              </span>
            ))}
          </h2>

          <div className="proof-signature">
            {proof.logos?.length > 0 && (
              <div className="proof-logos">
                {proof.logos.map((logo) => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    className={logo.className || 'proof-logo'}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            )}
            <p className="proof-description text-body">{proof.description}</p>
            {proof.description2 && (
              <p className="proof-description proof-description--second text-body">
                {proof.description2}
              </p>
            )}
            {proof.links?.length > 0 && (
              <div className="proof-links">
                {proof.links.map((l) => (
                  <a
                    key={l.href}
                    className="proof-link"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Positioning({ sectionRef }) {
  const lines = [
    { text: 'PRACUJEME', x: '10vw' },
    { text: 'SE ZNAČKAMI,', x: '6vw' },
    { text: 'KTERÉ POTŘEBUJÍ', x: '22vw' },
    { text: 'BÝT DŮVĚRYHODNÉ,', x: '14vw' },
    { text: 'VÝRAZNÉ', x: '38vw' },
    { text: 'A SOUČASNÉ', x: '18vw' },
    { text: 'ZÁROVEŇ.', x: '28vw' },
  ];

  return (
    <section className="positioning" ref={sectionRef}>
      <div className="positioning-inner">
        <h2 className="positioning-headline">
          {lines.map((line) => (
            <span
              key={line.text}
              className="positioning-line"
              style={{ marginLeft: line.x }}
            >
              {line.text}
            </span>
          ))}
        </h2>
        <h3 className="positioning-subhead">
          <span style={{ marginLeft: '8vw' }}>JSME TADY</span>
          <span style={{ marginLeft: '20vw' }}>PRO ZNAČKY,</span>
          <span style={{ marginLeft: '12vw' }}>KTERÉ UŽ MAJÍ</span>
          <span style={{ marginLeft: '28vw' }}>CO ŘÍCT</span>
        </h3>
        <p className="positioning-copy text-body">
          Ale na sítích to zatím není dost cítit. Pomáháme jim měnit vnímání,
          oslovovat nové cílovky a působit současněji. Neplníme jen content
          plán, stavíme komunikaci, která má značce něco přinést.
        </p>
      </div>
    </section>
  );
}

function Placement({ sectionRef }) {
  return (
    <section className="placement" ref={sectionRef}>
      <div className="placement-inner">
        <h2 className="placement-headline">
          <span style={{ marginLeft: '10vw' }}>SOCIÁLNÍ SÍTĚ</span>
          <span style={{ marginLeft: '24vw' }}>NEJSOU DALŠÍ</span>
          <span style={{ marginLeft: '16vw' }}>PLACEMENT</span>
        </h2>
        <p className="placement-copy text-body">
          Jsou přímé napojení značky na zákazníka. Proto nestačí jen dodat obsah
          do kalendáře. Nejdřív potřebujeme sladit očekávání interního týmu,
          pochopit, jak má značka působit, a až potom řešit, co bude ve feedu.
        </p>
      </div>
    </section>
  );
}

function Problem({ sectionRef }) {
  const questions = [
    'Co mají sítě dělat?',
    'Jak má značka znít?',
    'Jak odvážná může být?',
    'Která témata jí patří?',
    'Podle čeho se pozná, že obsah funguje?',
  ];

  return (
    <section className="problem" ref={sectionRef}>
      <div className="problem-inner">
        <h2 className="problem-headline problem-headline--top">
          <span style={{ marginLeft: '8vw' }}>VĚTŠINA</span>
          <span style={{ marginLeft: '18vw' }}>ZNAČEK</span>
          <span style={{ marginLeft: '12vw' }}>NEMÁ PROBLÉM</span>
          <span style={{ marginLeft: '26vw' }}>S POSTOVÁNÍM</span>
        </h2>
        <h2 className="problem-headline problem-headline--bottom">
          <span style={{ marginLeft: '32vw' }}>MÁ PROBLÉM</span>
          <span style={{ marginLeft: '20vw' }}>SE SHODOU</span>
        </h2>
        <ul className="problem-list">
          {questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const SYSTEM_ITEMS = [
  {
    label: 'STRATEGIE',
    detail:
      'Praktický rámec pro to, jak má značka na sítích mluvit a která témata si může přivlastnit.',
  },
  {
    label: 'CONTENT BLUEPRINT',
    detail:
      'Kombinací workshopu a živé strategie vytváříme blueprint pro každodenní obsah.',
  },
  {
    label: 'PRODUKCE',
    detail:
      'Dostaneme myšlenku ze strategického rámce až do videa, scénáře, natáčení a střihu.',
  },
  {
    label: 'SPRÁVA',
    detail: 'Copy, publikace a každodenní správa profilů v jednom provázaném týmu.',
  },
  {
    label: 'PROMOVÁNÍ',
    detail: 'Rozšiřujeme dosah tam, kde to dává smysl pro cíl značky.',
  },
  {
    label: 'REPORTING',
    detail:
      'Poznatky z reportu se vrací zpátky do strategie — ne čísla pro čísla.',
  },
];

function System({ sectionRef }) {
  return (
    <section className="system" ref={sectionRef} id="system">
      <div className="system-inner">
        <h2 className="system-title">
          <span style={{ marginLeft: '12vw' }}>Z BRIEFU</span>
          <span style={{ marginLeft: '28vw' }}>DĚLÁME</span>
          <span style={{ marginLeft: '18vw' }}>SYSTÉM</span>
        </h2>
        <p className="system-intro text-body">
          Neodcházíme jen s nápady na posty. Odcházíme s rámcem, podle kterého se
          dá obsah dlouhodobě tvořit, řídit a vyhodnocovat. Aby každý věděl, co
          značka říká, proč to říká a jak se to má propsat do každodenní exekuce.
        </p>
        <ul className="system-list">
          {SYSTEM_ITEMS.map((item) => (
            <li key={item.label} className="system-item">
              <span className="system-item-label">{item.label}</span>
              <span className="system-item-detail text-body">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BuildStamp() {
  const buildTime =
    typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : 'dev';
  const commitHash =
    typeof __BUILD_COMMIT_HASH__ !== 'undefined' ? __BUILD_COMMIT_HASH__ : '';

  return (
    <div className="build-stamp" aria-hidden="true">
      build {buildTime}
      {commitHash ? ` · ${commitHash}` : ''}
    </div>
  );
}

function FinalCta({ sectionRef }) {
  return (
    <section className="final-cta" ref={sectionRef} id="kontakt">
      <div className="final-cta-inner">
        <h2 className="final-cta-headline">
          <span style={{ marginLeft: '10vw' }}>POJĎME ZJISTIT,</span>
          <span style={{ marginLeft: '22vw' }}>JAK TO MÁ VYPADAT</span>
          <span style={{ marginLeft: '14vw' }}>NA SÍTÍCH.</span>
        </h2>
        <p className="final-cta-sub text-body">Máte, co říct.</p>
        <a className="final-cta-email" href="mailto:hello@hustle.cz">
          hello@hustle.cz
        </a>
      </div>
    </section>
  );
}

export default function App() {
  const bgARef = useRef(null);
  const bgBRef = useRef(null);
  const heroRef = useRef(null);
  const heroClaimRef = useRef(null);
  const heroSupportRef = useRef(null);
  const positioningRef = useRef(null);
  const placementRef = useRef(null);
  const problemRef = useRef(null);
  const systemRef = useRef(null);
  const ctaRef = useRef(null);
  const proofSectionRefs = PROOFS.map(() => useRef(null));

  useScrollEffects({
    bgARef,
    bgBRef,
    heroRef,
    heroClaimRef,
    heroSupportRef,
    proofSectionRefs,
    positioningRef,
    placementRef,
    problemRef,
    systemRef,
    ctaRef,
  });

  return (
    <div className="app-shell">
      <div className="background-stage-wrap" aria-hidden="true">
        <div className="background-stage" ref={bgARef} />
        <div className="background-stage" ref={bgBRef} />
      </div>
      <div className="background-highlight" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <BuildStamp />

      <Header />

      <main className="main">
        <Hero
          sectionRef={heroRef}
          claimRef={heroClaimRef}
          supportRef={heroSupportRef}
        />
        {PROOFS.map((proof, i) => (
          <ProofSection
            key={proof.id}
            proof={proof}
            sectionRef={proofSectionRefs[i]}
            isFirst={i === 0}
          />
        ))}
        <Positioning sectionRef={positioningRef} />
        <Placement sectionRef={placementRef} />
        <Problem sectionRef={problemRef} />
        <System sectionRef={systemRef} />
        <FinalCta sectionRef={ctaRef} />
      </main>
    </div>
  );
}

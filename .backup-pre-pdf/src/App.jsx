import { useRef } from 'react';
import { PROOFS } from './data/proofs';
import { useScrollEffects } from './hooks/useScrollEffects';

function Header() {
  return (
    <header className="header">
      <a href="#" className="header-logo">
        HUSTLE
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
    { text: 'SOCIAL MEDIA', x: '18vw' },
    { text: 'AGENTURA', x: '8vw' },
    { text: 'PRO ZNAČKY,', x: '30vw' },
    { text: 'KTERÉ NECHTĚJÍ', x: '14vw' },
    { text: 'ZNÍT JAKO', x: '47vw' },
    { text: 'ZNAČKY.', x: '24vw' },
  ];

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-inner">
        <h1 className="hero-headline" ref={claimRef}>
          {lines.map((line) => (
            <span
              key={line.text}
              className="hero-line"
              style={{ left: line.x }}
            >
              {line.text}
            </span>
          ))}
        </h1>
        <p className="hero-support" ref={supportRef}>
          Pomáháme značkám najít roli na sociálních sítích.
          <br />
          A převést ji do obsahu, který lidé opravdu vidí ve feedu.
        </p>
        <a href="#kontakt" className="hero-cta" aria-label="Kontakt">
          <span />
        </a>
      </div>
    </section>
  );
}

function ProofIntro({ sectionRef }) {
  return (
    <section className="proof-intro" ref={sectionRef} id="dukazy">
      <div className="sticky-stage proof-intro-stage">
        <h2 className="proof-intro-title">
          <span>DŮKAZY,</span>
          <span>NE SLIBY.</span>
        </h2>
        <p className="proof-intro-aside">
          Nezačínáme tím, co nabízíme.
          <br />
          Začínáme tím, co naše práce umí.
        </p>
      </div>
    </section>
  );
}

function VisualPlaceholder({ type, tint }) {
  if (!type) return null;

  if (type === 'social') {
    return (
      <div className={`visual-placeholder visual-social ${tint}`}>
        <div className="post-frame post-frame--a" />
        <div className="post-frame post-frame--b" />
      </div>
    );
  }

  return (
    <div
      className={`visual-placeholder visual-${type} ${tint}`}
      aria-hidden="true"
    />
  );
}

function SocialBubbles() {
  return (
    <div className="social-bubbles" aria-hidden="true">
      <div className="bubble bubble--1">Skvělá spolupráce</div>
      <div className="bubble bubble--2">Tohle chceme vidět víc</div>
      <div className="bubble bubble--3">@značka odpovídá</div>
    </div>
  );
}

function ProofSection({ proof, sectionRef }) {
  return (
    <section
      className={`proof-section ${proof.layout}`}
      ref={sectionRef}
      data-proof={proof.id}
    >
      <div className="sticky-stage">
        <h2 className="claim">
          {proof.lines.map((line, i) => (
            <span
              key={line}
              style={{ marginLeft: proof.lineXs[i] }}
            >
              {line}
            </span>
          ))}
        </h2>

        <div className="proof-signature">
          <p className="proof-client">{proof.client}</p>
          <p className="proof-description">{proof.description}</p>
        </div>

        {proof.bubbles && <SocialBubbles />}
        {proof.visual === 'wide' ? (
          <div className="visual-wrap visual-wrap--wide">
            <VisualPlaceholder type={proof.visual} tint={proof.tint} />
          </div>
        ) : (
          <VisualPlaceholder type={proof.visual} tint={proof.tint} />
        )}
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
        <p className="positioning-copy">
          Neplníme jen content plán.
          <br />
          Pomáháme značce sladit, co mají sítě dělat, jak má znít, která témata
          jí patří a podle čeho pozná, že obsah funguje.
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
          <span style={{ marginLeft: '26vw' }}>S POSTOVÁNÍM.</span>
        </h2>
        <h2 className="problem-headline problem-headline--bottom">
          <span style={{ marginLeft: '32vw' }}>MÁ PROBLÉM</span>
          <span style={{ marginLeft: '20vw' }}>SE SHODOU.</span>
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
    detail: 'Definujeme roli značky na sítích a témata, která jí patří.',
  },
  {
    label: 'CONTENT BLUEPRINT',
    detail: 'Převádíme strategii do jasného obsahového rámce pro feed.',
  },
  {
    label: 'PRODUKCE',
    detail: 'Tvoříme obsah, který drží tón značky a formát kanálu.',
  },
  {
    label: 'SPRÁVA',
    detail: 'Staráme se o publikaci, komunitu a konzistenci profilu.',
  },
  {
    label: 'PROMOVÁNÍ',
    detail: 'Rozšiřujeme dosah tam, kde to dává smysl pro cíl značky.',
  },
  {
    label: 'REPORTING',
    detail: 'Měříme, co funguje — ne jen co se publikovalo.',
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
        <ul className="system-list">
          {SYSTEM_ITEMS.map((item) => (
            <li key={item.label} className="system-item">
              <span className="system-item-label">{item.label}</span>
              <span className="system-item-detail">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinalCta({ sectionRef }) {
  return (
    <section className="final-cta" ref={sectionRef} id="kontakt">
      <div className="final-cta-inner">
        <h2 className="final-cta-headline">
          <span style={{ marginLeft: '10vw' }}>POJĎME ZJISTIT,</span>
          <span style={{ marginLeft: '22vw' }}>JAK TO MÁ ZNÍT</span>
          <span style={{ marginLeft: '14vw' }}>NA SÍTÍCH.</span>
        </h2>
        <p className="final-cta-sub">Máte, co říct.</p>
        <a className="final-cta-email" href="mailto:hello@hustle.cz">
          hello@hustle.cz
        </a>
      </div>
    </section>
  );
}

export default function App() {
  const bgRef = useRef(null);
  const heroRef = useRef(null);
  const heroClaimRef = useRef(null);
  const heroSupportRef = useRef(null);
  const proofIntroRef = useRef(null);
  const positioningRef = useRef(null);
  const problemRef = useRef(null);
  const systemRef = useRef(null);
  const ctaRef = useRef(null);
  const proofSectionRefs = PROOFS.map(() => useRef(null));

  useScrollEffects({
    bgRef,
    heroRef,
    heroClaimRef,
    heroSupportRef,
    proofIntroRef,
    proofSectionRefs,
    positioningRef,
    problemRef,
    systemRef,
    ctaRef,
  });

  return (
    <>
      <div className="background-stage" ref={bgRef} aria-hidden="true" />
      <div className="background-highlight" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <Header />

      <main className="main">
        <Hero
          sectionRef={heroRef}
          claimRef={heroClaimRef}
          supportRef={heroSupportRef}
        />
        <ProofIntro sectionRef={proofIntroRef} />
        {PROOFS.map((proof, i) => (
          <ProofSection
            key={proof.id}
            proof={proof}
            sectionRef={proofSectionRefs[i]}
          />
        ))}
        <Positioning sectionRef={positioningRef} />
        <Problem sectionRef={problemRef} />
        <System sectionRef={systemRef} />
        <FinalCta sectionRef={ctaRef} />
      </main>
    </>
  );
}

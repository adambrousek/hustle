import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ManifestSections from '../components/manifest/ManifestSections';
import { PROOFS } from '../data/proofs';
import { useScrollEffects } from '../hooks/useScrollEffects';
import '../styles/manifest.css';

const HERO = {
  title: [
    { text: 'SOCIAL', indent: '0' },
    { text: 'MEDIA', indent: '7vw' },
    { text: 'AGENTURA', indent: '2.5vw' },
  ],
  subhead: ['PRO ZNAČKY,', 'KTERÉ NECHTĚJÍ', 'ZNÍT JAKO ZNAČKY.'],
  body:
    'Každá značka má nápady, které chtějí na sítě. Ne všechny tam patří. Proto začínáme Content Blueprintem. Společně najdeme, co má značka říkat, co může pustit k vodě a proč ji má někdo chtít sledovat.',
  cta: { label: 'ZAJÍMÁ MĚ CONTENT BLUEPRINT', href: '/kontakt' },
};

function Hero({ sectionRef, claimRef, supportRef }) {
  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-top">
            <h1 className="hero-title" ref={claimRef}>
              {HERO.title.map((line) => (
                <span
                  key={line.text}
                  className="hero-line"
                  style={{ '--hero-indent': line.indent }}
                >
                  {line.text}
                </span>
              ))}
            </h1>

            <div className="hero-aside">
              <h2 className="hero-subhead">
                {HERO.subhead.map((line) => (
                  <span key={line} className="hero-subhead-line">
                    {line}
                  </span>
                ))}
              </h2>

              <div className="hero-support" ref={supportRef}>
                <p className="hero-body text-body">{HERO.body}</p>
                <Link to={HERO.cta.href} className="hustle-link hero-cta">
                  {HERO.cta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofVisual({ proof }) {
  if (!proof.images?.length) return null;

  return (
    <div className={`proof-visual proof-visual--${proof.id}`} aria-hidden="true">
      {(proof.images || []).map((media) =>
        media.type === 'video' ? (
          <video
            key={media.src}
            className={`proof-img ${media.className}`}
            src={media.src}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
          />
        ) : (
          <img
            key={media.src}
            src={media.src}
            alt=""
            className={`proof-img ${media.className}`}
            loading="lazy"
            decoding="async"
          />
        ),
      )}
    </div>
  );
}

function ProofSection({ proof, sectionRef, isFirst }) {
  return (
    <section
      className={`proof-section ${proof.layout}`}
      ref={sectionRef}
      data-proof={proof.id}
      data-lines={proof.lines.length}
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
                style={{ '--claim-indent': proof.lineXs[i] }}
              >
                {line}
              </span>
            ))}
          </h2>

          <div className="proof-signature">
            <div className="proof-signature-col">
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
              <div className="proof-signature-body">
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
        </div>
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

export default function HomePage() {
  const bgARef = useRef(null);
  const bgBRef = useRef(null);
  const heroRef = useRef(null);
  const heroClaimRef = useRef(null);
  const heroSupportRef = useRef(null);
  const manifestSystemRef = useRef(null);
  const manifestAlwaysOnRef = useRef(null);
  const manifestContactRef = useRef(null);
  const proofSectionRefs = PROOFS.map(() => useRef(null));

  useScrollEffects({
    bgARef,
    bgBRef,
    heroRef,
    heroClaimRef,
    heroSupportRef,
    proofSectionRefs,
    manifestSectionRefs: [
      manifestSystemRef,
      manifestAlwaysOnRef,
      manifestContactRef,
    ],
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
        <ManifestSections
          systemRef={manifestSystemRef}
          alwaysOnRef={manifestAlwaysOnRef}
          contactRef={manifestContactRef}
        />
      </main>
    </div>
  );
}

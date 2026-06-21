import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getCaseStudyDetail } from '../data/caseStudies';
import { getCaseStudyBySlug } from '../data/portfolioData';
import { getProofBg } from '../data/proofs';
import { syncPageBackground } from '../utils/browserChrome';
import '../styles/portfolio.css';
import '../styles/caseStudy.css';

function CaseStudyHero({ study }) {
  return (
    <section className="case-detail__hero">
      {study.logos?.length > 0 && (
        <div className="case-detail__logos">
          {study.logos.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className={`case-detail__logo${logo.className ? ` ${logo.className}` : ''}`}
              loading="eager"
              decoding="async"
            />
          ))}
        </div>
      )}

      <h1 className="case-detail__headline">
        {study.lines.map((line, index) => (
          <span
            key={line}
            className="case-detail__headline-line"
            style={{ '--case-indent': study.lineXs?.[index] ?? '0' }}
          >
            {line}
          </span>
        ))}
      </h1>

      <p className="case-detail__type">{study.workType}</p>

      {(study.heroVideo || study.heroPoster) && (
        <div className="case-detail__hero-media">
          {study.heroVideo ? (
            <video
              className="case-detail__hero-video"
              src={study.heroVideo}
              poster={study.heroPoster}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
            />
          ) : (
            <img
              className="case-detail__hero-video"
              src={study.heroPoster}
              alt=""
              loading="eager"
              decoding="async"
            />
          )}
        </div>
      )}
    </section>
  );
}

function CaseStudySections({ intro, sections }) {
  return (
    <>
      {intro?.length > 0 && (
        <section className="case-detail__intro">
          {intro.map((paragraph) => (
            <p key={paragraph} className="case-detail__text text-body">
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {sections.map((section) => (
        <section key={section.heading} className="case-detail__block">
          <h2 className="case-detail__heading">{section.heading}</h2>
          {(Array.isArray(section.body) ? section.body : [section.body]).map((paragraph) => (
            <p key={paragraph} className="case-detail__text text-body">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </>
  );
}

function CaseStudyGallery({ items }) {
  if (!items?.length) return null;

  return (
    <section className="case-detail__gallery">
      <h2 className="case-detail__heading">GALERIE VÝSTUPŮ</h2>
      <div className="case-detail__gallery-grid">
        {items.map((item) => (
          <figure key={item.src} className="case-detail__gallery-item">
            {item.type === 'video' ? (
              <video
                src={item.src}
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
              />
            ) : (
              <img src={item.src} alt={item.alt ?? ''} loading="lazy" decoding="async" />
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudyDetail(slug);
  const preview = getCaseStudyBySlug(slug);
  const proofBg = getProofBg(slug);
  const pageBg = study?.bg ?? proofBg?.bg ?? '#1868F0';
  const pageTheme = study?.themeColor ?? proofBg?.color ?? pageBg;
  const pageChromeBottom = study?.chromeBottom ?? proofBg?.chromeBottom ?? pageTheme;

  useEffect(() => {
    document.documentElement.classList.add('case-study-mode');
    document.documentElement.style.setProperty('--case-bg', pageBg);
    syncPageBackground(pageBg, pageTheme, pageChromeBottom);

    return () => {
      document.documentElement.classList.remove('case-study-mode');
      document.documentElement.style.removeProperty('--case-bg');
    };
  }, [pageBg, pageTheme, pageChromeBottom]);

  const shellStyle = {
    '--case-accent': study?.accent ?? preview?.accent ?? pageTheme,
    '--case-bg': pageBg,
  };

  if (!study) {
    return (
      <div
        className="app-shell case-detail-page portfolio-page portfolio-page--netflix"
        style={shellStyle}
      >
        <div className="case-detail-page__bg" aria-hidden="true" />
        <Header />
        <main className="portfolio-main case-detail">
          <p className="case-detail__text text-body">
            {preview
              ? `Case study ${preview.brand} právě doplňujeme.`
              : 'Case study nenalezena.'}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div
      className="app-shell case-detail-page portfolio-page portfolio-page--netflix"
      style={shellStyle}
    >
      <div className="case-detail-page__bg" aria-hidden="true" />
      <Header />

      <main className="portfolio-main case-detail">
        <CaseStudyHero study={study} />
        <CaseStudySections intro={study.intro} sections={study.sections} />
        <CaseStudyGallery items={study.gallery} />
      </main>
    </div>
  );
}

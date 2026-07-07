import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PilulkaCaseStudy from '../components/caseStudy/pilulka/PilulkaCaseStudy';
import CaseStudyFilm from '../components/caseStudy/CaseStudyFilm';
import { getCaseStudyDetail } from '../data/caseStudies';
import { PILULKA_CASE } from '../data/pilulkaCase';
import { getCaseStudyBySlug } from '../data/portfolioData';
import { getProofBg } from '../data/proofs';
import { syncPageBackground } from '../utils/browserChrome';
import '../styles.css';
import '../styles/portfolio.css';
import '../styles/caseStudy.css';
import '../styles/pilulkaCase.css';
import '../styles/manifest.css';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const isPilulka = slug === 'pilulka';
  const study = getCaseStudyDetail(slug);
  const preview = getCaseStudyBySlug(slug);
  const proofBg = getProofBg(slug);
  const pageBg = isPilulka ? PILULKA_CASE.bg : (study?.bg ?? proofBg?.bg ?? '#1868F0');
  const pageTheme = isPilulka
    ? PILULKA_CASE.themeColor
    : (study?.themeColor ?? proofBg?.color ?? pageBg);
  const pageChromeBottom = isPilulka
    ? PILULKA_CASE.chromeBottom
    : (study?.chromeBottom ?? proofBg?.chromeBottom ?? pageTheme);

  useEffect(() => {
    document.documentElement.classList.add('case-study-mode');
    if (isPilulka) {
      document.documentElement.classList.add('pilulka-case-mode');
    }
    document.documentElement.style.setProperty('--case-bg', pageBg);
    syncPageBackground(pageBg, pageTheme, pageChromeBottom);

    return () => {
      document.documentElement.classList.remove('case-study-mode');
      document.documentElement.classList.remove('pilulka-case-mode');
      document.documentElement.style.removeProperty('--case-bg');
    };
  }, [pageBg, pageTheme, pageChromeBottom, isPilulka]);

  const shellStyle = isPilulka
    ? { '--case-accent': preview?.accent ?? pageTheme }
    : {
        '--case-accent': study?.accent ?? preview?.accent ?? pageTheme,
        '--case-bg': pageBg,
      };

  if (!study && !isPilulka) {
    return (
      <div
        className="app-shell case-detail-page portfolio-page portfolio-page--netflix"
        style={shellStyle}
      >
        <div className="case-detail-page__bg" aria-hidden="true" />
        <Header />
        <main className="portfolio-main case-detail">
          <p className="case-film-body">
            {preview
              ? `Case study ${preview.brand} právě doplňujeme.`
              : 'Case study nenalezena.'}
          </p>
        </main>
      </div>
    );
  }

  if (isPilulka) {
    return (
      <div className="app-shell pilulka-case-page" style={shellStyle}>
        <div className="case-detail-page__bg" aria-hidden="true" />
        <Header />
        <main className="main pilulka-case-main">
          <PilulkaCaseStudy />
        </main>
      </div>
    );
  }

  return (
    <div
      className="app-shell case-detail-page portfolio-page portfolio-page--netflix case-film-page"
      style={shellStyle}
    >
      <div className="case-detail-page__bg" aria-hidden="true" />
      <Header />

      <main className="portfolio-main case-detail case-film-main">
        <CaseStudyFilm study={study} />
      </main>
    </div>
  );
}

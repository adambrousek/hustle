import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PilulkaCaseStudy from '../components/caseStudy/pilulka/PilulkaCaseStudy';
import CaseStudyFilm from '../components/caseStudy/CaseStudyFilm';
import { getCaseStudyDetail } from '../data/caseStudies';
import { getEditorialCase } from '../data/editorialCases';
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
  const editorialCase = getEditorialCase(slug);
  const isEditorial = Boolean(editorialCase);
  const study = getCaseStudyDetail(slug);
  const preview = getCaseStudyBySlug(slug);
  const proofBg = getProofBg(slug);
  const pageBg = isEditorial
    ? editorialCase.bg
    : (study?.bg ?? proofBg?.bg ?? '#1868F0');
  const pageTheme = isEditorial
    ? editorialCase.themeColor
    : (study?.themeColor ?? proofBg?.color ?? pageBg);
  const pageChromeBottom = isEditorial
    ? editorialCase.chromeBottom
    : (study?.chromeBottom ?? proofBg?.chromeBottom ?? pageTheme);

  useEffect(() => {
    document.documentElement.classList.add('case-study-mode');
    if (isEditorial) {
      document.documentElement.classList.add('pilulka-case-mode');
    }
    document.documentElement.style.setProperty('--case-bg', pageBg);
    syncPageBackground(pageBg, pageTheme, pageChromeBottom);

    return () => {
      document.documentElement.classList.remove('case-study-mode');
      document.documentElement.classList.remove('pilulka-case-mode');
      document.documentElement.style.removeProperty('--case-bg');
    };
  }, [pageBg, pageTheme, pageChromeBottom, isEditorial]);

  const shellStyle = isEditorial
    ? { '--case-accent': preview?.accent ?? pageTheme }
    : {
        '--case-accent': study?.accent ?? preview?.accent ?? pageTheme,
        '--case-bg': pageBg,
      };

  if (!study && !isEditorial) {
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

  if (isEditorial) {
    return (
      <div className="app-shell pilulka-case-page" style={shellStyle}>
        <div className="case-detail-page__bg" aria-hidden="true" />
        <Header />
        <main className="main pilulka-case-main">
          <PilulkaCaseStudy caseData={editorialCase} />
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

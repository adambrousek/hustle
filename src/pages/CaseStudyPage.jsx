import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getCaseStudyBySlug } from '../data/portfolioData';
import '../styles/portfolio.css';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  useEffect(() => {
    document.documentElement.classList.add('portfolio-mode');
    return () => document.documentElement.classList.remove('portfolio-mode');
  }, []);

  if (!study) {
    return (
      <div className="app-shell portfolio-page portfolio-page--netflix">
        <div className="portfolio-page__bg" aria-hidden="true" />
        <Header />
        <main className="portfolio-main case-detail">
          <p className="text-body">Case study nenalezena.</p>
          <Link to="/portfolio" className="hustle-link">
            ZPĚT NA PORTFOLIO
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div
      className="app-shell portfolio-page portfolio-page--netflix case-detail"
      style={{ '--case-accent': study.accent }}
    >
      <div className="portfolio-page__bg" aria-hidden="true" />
      <Header />

      <main className="portfolio-main case-detail">
        <Link to="/portfolio" className="case-detail__back">
          ← PORTFOLIO
        </Link>

        <section className="case-detail__hero">
          <p className="case-detail__brand">{study.brand}</p>
          <h1 className="case-detail__claim">{study.claim}</h1>
          <p className="case-detail__type">{study.workType}</p>
        </section>

        <section className="case-detail__block">
          <h2 className="case-detail__heading">CO ZNAČKA POTŘEBOVALA ZMĚNIT</h2>
          <p className="text-body case-detail__text">
            Placeholder. Doplníme strategický kontext a výchozí situaci značky.
          </p>
        </section>

        <section className="case-detail__block">
          <h2 className="case-detail__heading">JAK JSME NA TO ŠLI</h2>
          <p className="text-body case-detail__text">
            Placeholder. Rámec, témata a směr obsahu pro feed.
          </p>
        </section>

        <section className="case-detail__block">
          <h2 className="case-detail__heading">CO SE DOSTALO DO FEEDU</h2>
          <p className="text-body case-detail__text">
            Placeholder. Formáty, kampaně a výstupy, které žily na sítích.
          </p>
        </section>

        <section className="case-detail__block">
          <h2 className="case-detail__heading">CO TO PŘINESLO</h2>
          <p className="text-body case-detail__text">
            Placeholder. Výsledky a dopad pro značku.
          </p>
        </section>

        <section className="case-detail__gallery">
          <h2 className="case-detail__heading">GALERIE VÝSTUPŮ</h2>
          <div className="case-detail__gallery-grid">
            <img src={study.thumbnailUrl} alt="" loading="lazy" />
          </div>
        </section>

        <Link to="/portfolio" className="hustle-link case-detail__cta">
          ZPĚT NA PORTFOLIO
        </Link>
      </main>
    </div>
  );
}

import { Link } from 'react-router-dom';
import MediaHoverPreview from '../MediaHoverPreview';

export default function PortfolioBillboard({ study }) {
  if (!study) return null;

  return (
    <section className="portfolio-billboard" aria-label="Hlavní case study">
      <div
        className="portfolio-billboard__stage"
        style={{ '--billboard-accent': study.accent }}
      >
        <MediaHoverPreview
          previewSrc={study.previewSrc}
          vimeoId={study.vimeoId}
          thumbnailUrl={study.thumbnailUrl}
          alt={study.brand}
          className="portfolio-billboard__media"
          brand={study.brand}
          title={study.claim}
          subtitle={study.workType}
        />
        <div className="portfolio-billboard__shade" aria-hidden="true" />

        <div className="portfolio-billboard__content">
          <p className="portfolio-billboard__eyebrow">HLAVNÍ CASE STUDY</p>
          <h1 className="portfolio-billboard__claim">{study.claim}</h1>
          <p className="portfolio-billboard__meta text-body">
            {study.brand} · {study.workType}
          </p>
          <div className="portfolio-billboard__actions">
            <Link
              to={`/portfolio/case/${study.slug}`}
              className="hustle-link"
            >
              OTEVŘÍT
            </Link>
            <a href="#portfolio-library" className="hustle-link">
              VÍCE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

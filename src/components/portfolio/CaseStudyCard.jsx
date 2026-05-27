import { Link } from 'react-router-dom';
import VimeoHoverPreview from '../VimeoHoverPreview';

export default function CaseStudyCard({ study, vimeoId = '' }) {
  return (
    <article
      className="case-study-card"
      style={{ '--case-accent': study.accent }}
    >
      <Link
        to={`/portfolio/case/${study.slug}`}
        className="case-study-card__link"
      >
        <div className="case-study-card__media">
          <VimeoHoverPreview
            vimeoId={vimeoId}
            thumbnailUrl={study.thumbnailUrl}
            alt={study.brand}
            className="case-study-card__preview"
          />
          <span className="case-study-card__overlay">
            <span className="case-study-card__cta">OTEVŘÍT CASE STUDY</span>
          </span>
        </div>
        <div className="case-study-card__body">
          <p className="case-study-card__brand">{study.brand}</p>
          <p className="case-study-card__claim">{study.claim}</p>
          <p className="case-study-card__type">{study.workType}</p>
        </div>
      </Link>
    </article>
  );
}

import { Link } from 'react-router-dom';
import MediaHoverPreview from '../MediaHoverPreview';

export default function CaseStudyCard({ study, size = 'row' }) {
  return (
    <div className={`case-study-card-slot case-study-card-slot--${size}`}>
      <article
        className={`case-study-card case-study-card--${size}`}
        style={{ '--case-accent': study.accent }}
      >
        <Link
          to={`/portfolio/case/${study.slug}`}
          className="case-study-card__link"
        >
          <div className="case-study-card__frame">
            <div className="case-study-card__media">
              <MediaHoverPreview
                previewSrc={study.previewSrc}
                vimeoId={study.vimeoId}
                thumbnailUrl={study.thumbnailUrl}
                alt={study.brand}
                className="case-study-card__preview"
                brand={study.brand}
                title={study.claim}
                subtitle={study.workType}
              />
              <span className="case-study-card__play" aria-hidden="true">
                ▶
              </span>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}

import { Link } from 'react-router-dom';
import MediaHoverPreview from '../MediaHoverPreview';

function logoClassName(logo) {
  const classes = ['case-study-card__logo'];
  const raw = logo.className ?? '';

  if (raw.includes('proof-logo--color')) classes.push('case-study-card__logo--color');
  if (raw.includes('proof-logo--nova')) classes.push('case-study-card__logo--nova');
  if (raw.includes('proof-logo--dofe')) classes.push('case-study-card__logo--dofe');
  if (raw.includes('proof-logo--mono')) classes.push('case-study-card__logo--mono');

  return classes.join(' ');
}

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
              />

              {study.logos?.length > 0 && (
                <div className="case-study-card__logos">
                  {study.logos.map((logo) => (
                    <img
                      key={logo.src}
                      src={logo.src}
                      alt={logo.alt}
                      className={logoClassName(logo)}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              )}

              {study.lines?.length > 0 && (
                <div className="case-study-card__caption">
                  {study.lines.map((line) => (
                    <span key={line} className="case-study-card__line">
                      {line}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}

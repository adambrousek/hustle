import { Link } from 'react-router-dom';

export function normalizeHeadlineLines(lines) {
  if (!lines?.length) return [];
  return lines.map((line) =>
    typeof line === 'string' ? { text: line, indent: '0' } : line,
  );
}

export function normalizeProofItems(items = []) {
  return items.map((item) =>
    typeof item === 'string' ? { label: item, text: '' } : item,
  );
}

export function CaseStudyHeading({
  lines,
  heading,
  Tag = 'h2',
  className = 'case-detail__heading',
}) {
  const resolved = lines?.length
    ? normalizeHeadlineLines(lines)
    : heading
      ? [{ text: heading, indent: '0' }]
      : [];

  if (resolved.length === 0) return null;

  return (
    <Tag className={className}>
      {resolved.map((line) => (
        <span
          key={line.text}
          className="case-detail__heading-line"
          style={{ '--case-indent': line.indent ?? '0' }}
        >
          {line.text}
        </span>
      ))}
    </Tag>
  );
}

export function ProofBar({ items }) {
  const tiles = normalizeProofItems(items);
  if (!tiles.length) return null;

  return (
    <ul
      className={`case-proof-bar${tiles.length > 4 ? ' case-proof-bar--wide' : ''}`}
    >
      {tiles.map((item) => (
        <li key={`${item.label}-${item.text}`} className="case-proof-bar__tile">
          <span className="case-proof-bar__label">{item.label}</span>
          {item.text && <span className="case-proof-bar__text">{item.text}</span>}
        </li>
      ))}
    </ul>
  );
}

export function CaseStudyHero({ study }) {
  const headlineLines = normalizeHeadlineLines(
    study.headlineLines ?? study.lines?.map((text) => ({ text, indent: '0' })),
  );

  return (
    <section className="case-detail__hero case-slide case-slide--hero">
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

      {study.workType && <p className="case-detail__type">{study.workType}</p>}

      <h1 className="case-detail__headline">
        {headlineLines.map((line) => (
          <span
            key={line.text}
            className="case-detail__headline-line"
            style={{ '--case-indent': line.indent ?? '0' }}
          >
            {line.text}
          </span>
        ))}
      </h1>

      {study.perex && <p className="case-detail__perex">{study.perex}</p>}

      <ProofBar items={study.proofBar} />

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

export function StatementSection({
  heading,
  headingLines,
  body,
  bullets,
  impact,
}) {
  const lines = Array.isArray(body) ? body : body ? [body] : [];

  return (
    <section
      className={`case-slide case-slide--statement${impact ? ' case-slide--impact' : ''}`}
    >
      <CaseStudyHeading heading={heading} lines={headingLines} />
      <div className="case-statement__body">
        {lines.map((paragraph) => (
          <p key={paragraph} className="case-statement__text">
            {paragraph}
          </p>
        ))}
        {bullets?.length > 0 && (
          <ul className="case-statement__list">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function ThreeColumnFramework({
  eyebrow,
  heading,
  headingLines,
  description,
  columns,
}) {
  return (
    <section className="case-slide case-slide--framework">
      {eyebrow && <p className="case-framework__eyebrow">{eyebrow}</p>}
      <CaseStudyHeading heading={heading} lines={headingLines} />
      {description && <p className="case-framework__desc">{description}</p>}
      <div className="case-framework__columns">
        {columns.map((column) => (
          <article key={column.title} className="case-framework__column">
            <h3 className="case-framework__column-title">{column.title}</h3>
            <p className="case-framework__column-body">{column.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BeforeAfterSection({ heading, headingLines, before, after }) {
  return (
    <section className="case-slide case-slide--before-after">
      <CaseStudyHeading heading={heading} lines={headingLines} />
      <div className="case-before-after">
        <div className="case-before-after__side case-before-after__side--before">
          <span className="case-before-after__tag">Before</span>
          <ul className="case-before-after__chain">
            {(before.items ?? before).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {before.label && (
            <p className="case-before-after__caption">{before.label}</p>
          )}
        </div>
        <div className="case-before-after__side case-before-after__side--after">
          <span className="case-before-after__tag">After</span>
          <ul className="case-before-after__chain">
            {(after.items ?? after).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {after.label && (
            <p className="case-before-after__caption">{after.label}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export function ProofGrid({ heading, headingLines, items, columns = 3 }) {
  return (
    <section
      className="case-slide case-slide--proof"
      style={{ '--proof-cols': columns }}
    >
      <CaseStudyHeading heading={heading} lines={headingLines} />
      <ul className="case-proof-grid">
        {items.map((item) => (
          <li
            key={item.value ? `${item.value}-${item.label}` : item.text}
            className={`case-proof-grid__item${item.value ? ' case-proof-grid__item--numeric' : ''}${item.highlight ? ' case-proof-grid__item--highlight' : ''}${item.placeholder ? ' case-proof-grid__item--placeholder' : ''}`}
          >
            {item.value ? (
              <>
                <span className="case-proof-grid__value">{item.value}</span>
                <span className="case-proof-grid__label">{item.label}</span>
              </>
            ) : (
              <span className="case-proof-grid__text">{item.text}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DeckStack({ heading, headingLines, items }) {
  return (
    <section className="case-slide case-slide--stack">
      <CaseStudyHeading heading={heading} lines={headingLines} />
      <div className="case-deck-stack">
        {items.map((item, index) => (
          <article key={item.title} className="case-deck-stack__item">
            <span className="case-deck-stack__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="case-deck-stack__body">
              <h3 className="case-deck-stack__title">{item.title}</h3>
              <p className="case-deck-stack__text">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CaseStudyCta({ cta }) {
  if (!cta) return null;

  return (
    <section className="case-slide case-slide--cta">
      <CaseStudyHeading lines={cta.headingLines} heading={cta.heading} />
      <p className="case-cta__text">{cta.body}</p>
      <Link to={cta.href} className="hustle-link case-cta__button">
        {cta.label}
      </Link>
    </section>
  );
}

export function CaseStudyGallery({ items }) {
  if (!items?.length) return null;

  return (
    <section className="case-slide case-slide--gallery">
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

export function CaseStudySection({ section }) {
  const headingProps = {
    heading: section.heading,
    headingLines: section.headingLines,
  };

  switch (section.type) {
    case 'statement':
      return (
        <StatementSection
          {...headingProps}
          body={section.body}
          bullets={section.bullets}
          impact={section.impact}
        />
      );
    case 'framework':
      return (
        <ThreeColumnFramework
          eyebrow={section.eyebrow}
          {...headingProps}
          description={section.description}
          columns={section.columns ?? section.items}
        />
      );
    case 'beforeAfter':
      return (
        <BeforeAfterSection
          {...headingProps}
          before={section.before}
          after={section.after}
        />
      );
    case 'proofGrid':
      return (
        <ProofGrid
          {...headingProps}
          items={section.items}
          columns={section.columns}
        />
      );
    case 'stack':
      return <DeckStack {...headingProps} items={section.items} />;
    case 'cards':
      return (
        <ThreeColumnFramework
          {...headingProps}
          description={section.description}
          columns={(section.items ?? []).map((item) => ({
            title: item.title,
            body: item.text,
          }))}
        />
      );
    case 'prose':
      return (
        <StatementSection
          {...headingProps}
          body={section.body}
          bullets={section.bullets}
        />
      );
    case 'metrics':
    case 'proof':
      return <ProofGrid {...headingProps} items={section.items} />;
    case 'metricGroups': {
      const flat = (section.groups ?? []).flatMap((group) =>
        group.items.map((item) => ({ ...item, label: item.label })),
      );
      return (
        <ProofGrid
          {...headingProps}
          items={flat}
          columns={3}
        />
      );
    }
    default:
      return null;
  }
}

export function CaseStudyContent({ sections }) {
  return (
    <div className="case-detail__content">
      {sections.map((section, index) => (
        <CaseStudySection
          key={section.headingLines?.[0]?.text ?? section.heading ?? index}
          section={section}
        />
      ))}
    </div>
  );
}

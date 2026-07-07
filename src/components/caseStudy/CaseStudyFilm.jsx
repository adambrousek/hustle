import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { buildCaseFilm } from '../../data/buildCaseFilm';
import { useCaseScrollEffects } from '../../hooks/useCaseScrollEffects';
import {
  CaseStudyHeading,
  normalizeHeadlineLines,
  normalizeProofItems,
} from './CaseStudyBlocks';

function CaseFilmVisual({ slug, images, className = '' }) {
  if (!images?.length) return null;

  return (
    <div
      className={`proof-visual proof-visual--${slug} case-film-visual ${className}`.trim()}
      aria-hidden="true"
    >
      {images.map((media) =>
        media.type === 'video' ? (
          <video
            key={media.src}
            className={`proof-img ${media.className ?? ''}`}
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
            className={`proof-img ${media.className ?? ''}`}
            src={media.src}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ),
      )}
    </div>
  );
}

function CaseFilmHero({ study, heroRef, contentRef, visualRef }) {
  const headlineLines = normalizeHeadlineLines(study.headlineLines);
  const heroImages = [
    study.heroVideo
      ? { type: 'video', src: study.heroVideo, className: 'proof-img--hero' }
      : null,
    study.heroPoster ? { src: study.heroPoster, className: 'proof-img--b' } : null,
  ].filter(Boolean);

  return (
    <section className="case-film-hero" ref={heroRef}>
      <div className="case-film-hero__stage">
        <div ref={visualRef}>
          <CaseFilmVisual slug={study.slug} images={heroImages} />
        </div>
        <div className="case-film-content case-film-hero__content" ref={contentRef}>
          {study.logos?.length > 0 && (
            <div className="case-film-hero__logos">
              {study.logos.map((logo) => (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className={`case-film-hero__logo${logo.className ? ` ${logo.className}` : ''}`}
                  loading="eager"
                  decoding="async"
                />
              ))}
            </div>
          )}
          <p className="case-film-hero__label">{study.label ?? 'CASE STUDY'}</p>
          {study.workType && <p className="case-film-hero__type">{study.workType}</p>}
          <h1 className="case-film-hero__headline">
            {headlineLines.map((line) => (
              <span
                key={line.text}
                className="case-film-hero__headline-line"
                style={{ '--case-indent': line.indent ?? '0' }}
              >
                {line.text}
              </span>
            ))}
          </h1>
          {study.perex && <p className="case-film-hero__perex">{study.perex}</p>}
        </div>
      </div>
    </section>
  );
}

function CaseFilmProof({ items }) {
  const tiles = normalizeProofItems(items);
  if (!tiles.length) return null;

  return (
    <section className="case-film-proof" aria-label="Důkazy">
      <ul className="case-film-proof__grid">
        {tiles.map((item) => (
          <li key={`${item.label}-${item.text}`} className="case-film-proof__item">
            <span className="case-film-proof__value">{item.label}</span>
            {item.text && <span className="case-film-proof__label">{item.text}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CaseFilmBeat({ beatRef, slug, children, visual, tall = true, className = '' }) {
  return (
    <section
      ref={beatRef}
      className={`case-film-beat ${tall ? 'case-film-beat--tall' : ''} ${className}`.trim()}
    >
      <div className="case-film-beat__stage sticky-stage">
        {visual}
        <div className="case-film-content case-film-beat__content">{children}</div>
      </div>
    </section>
  );
}

function CaseFilmProblemShift({ film, slug, beatRefs, startIndex }) {
  const { problem, shift } = film;
  let idx = startIndex;

  return (
    <>
      <CaseFilmBeat
        beatRef={(el) => {
          beatRefs.current[idx] = {
            section: el,
            content: el?.querySelector('.case-film-beat__content'),
            visual: el?.querySelector('.case-film-visual'),
          };
        }}
        slug={slug}
        className="case-film-beat--problem"
        visual={<CaseFilmVisual slug={slug} images={[]} className="case-film-visual--ghost" />}
      >
        <p className="case-film-kicker">Problém</p>
        <CaseStudyHeading lines={problem.headlineLines} />
        <p className="case-film-lead">{problem.body}</p>
        {problem.support && <p className="case-film-body">{problem.support}</p>}
      </CaseFilmBeat>

      <CaseFilmBeat
        beatRef={(el) => {
          beatRefs.current[idx + 1] = {
            section: el,
            content: el?.querySelector('.case-film-beat__content'),
            visual: el?.querySelector('.case-film-visual'),
          };
        }}
        slug={slug}
        className="case-film-beat--shift"
      >
        <p className="case-film-kicker">Posun</p>
        {shift.type === 'beforeAfter' ? (
          <>
            <CaseStudyHeading lines={shift.headlineLines} />
            <div className="case-film-shift">
              <div className="case-film-shift__col">
                <span className="case-film-shift__tag">Before</span>
                <div className="case-film-shift__chain">
                  {(shift.before.items ?? shift.before).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="case-film-shift__col case-film-shift__col--after">
                <span className="case-film-shift__tag">After</span>
                <div className="case-film-shift__chain">
                  {(shift.after.items ?? shift.after).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <CaseStudyHeading lines={shift.headlineLines} />
            <p className="case-film-lead">{shift.body}</p>
            {shift.support && <p className="case-film-body">{shift.support}</p>}
          </>
        )}
      </CaseFilmBeat>
    </>
  );
}

function CaseFilmStory({ beats, slug, beatRefs, startIndex }) {
  return beats.map((beat, i) => {
    const refIndex = startIndex + i;
    const images = beat.images?.length ? beat.images : undefined;

    return (
      <CaseFilmBeat
        key={beat.id ?? i}
        beatRef={(el) => {
          beatRefs.current[refIndex] = {
            section: el,
            content: el?.querySelector('.case-film-beat__content'),
            visual: el?.querySelector('.case-film-visual'),
          };
        }}
        slug={slug}
        className="case-film-beat--story"
        visual={<CaseFilmVisual slug={slug} images={images} />}
      >
        {beat.stat && (
          <span className="case-film-stat proof-img" aria-hidden="true">
            {beat.stat}
          </span>
        )}
        <CaseStudyHeading lines={beat.headlineLines} />
        <p className="case-film-lead">{beat.body}</p>
        {beat.bullets?.length > 0 && (
          <ul className="case-film-list">
            {beat.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </CaseFilmBeat>
    );
  });
}

function CaseFilmSystem({ system, slug, beatRef }) {
  if (!system.items?.length) return null;

  return (
    <CaseFilmBeat
      beatRef={beatRef}
      slug={slug}
      className="case-film-beat--system"
      tall={false}
    >
      <p className="case-film-kicker">Systém</p>
      <CaseStudyHeading lines={system.headlineLines} />
      <ul className="case-film-system">
        {system.items.map((item) => (
          <li key={item.title} className="case-film-system__item">
            <span className="case-film-system__title">{item.title}</span>
            <span className="case-film-system__text">{item.text}</span>
          </li>
        ))}
      </ul>
    </CaseFilmBeat>
  );
}

function CaseFilmWork({ work, slug, beatRef }) {
  const items = [
    ...(work.images ?? []).map((img) => ({ ...img, layout: 'float' })),
    ...(work.gallery ?? []).map((img) => ({ ...img, layout: img.layout ?? 'tile' })),
  ];

  if (!items.length) return null;

  return (
    <section ref={beatRef} className="case-film-work">
      <p className="case-film-kicker">Výstupy</p>
      <h2 className="case-film-work__title">THE WORK</h2>
      <div className="case-film-work__grid">
        {items.map((item, i) => (
          <figure
            key={`${item.src}-${i}`}
            className={`case-film-work__item${item.layout === 'wide' ? ' case-film-work__item--wide' : ''}${i === 0 ? ' case-film-work__item--lead' : ''}`}
          >
            {item.type === 'video' ? (
              <video src={item.src} muted playsInline loop autoPlay preload="metadata" />
            ) : (
              <img src={item.src} alt={item.alt ?? ''} loading="lazy" decoding="async" />
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

function CaseFilmImpact({ impact, beatRef }) {
  if (!impact.items?.length) return null;

  return (
    <section ref={beatRef} className="case-film-impact">
      <CaseStudyHeading lines={impact.headlineLines} />
      <ul className="case-film-impact__grid">
        {impact.items.map((item) => (
          <li
            key={item.value ? `${item.value}-${item.label}` : item.text}
            className={`case-film-impact__item${item.value ? ' case-film-impact__item--num' : ''}${item.highlight ? ' case-film-impact__item--hero' : ''}`}
          >
            {item.value ? (
              <>
                <span className="case-film-impact__value">{item.value}</span>
                <span className="case-film-impact__label">{item.label}</span>
              </>
            ) : (
              <span className="case-film-impact__text">{item.text}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CaseFilmRole({ roles }) {
  if (!roles?.length) return null;

  return (
    <section className="case-film-role">
      <p className="case-film-kicker">Naše role</p>
      <h2 className="case-film-role__title">OUR ROLE</h2>
      <ul className="case-film-role__list">
        {roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </section>
  );
}

function CaseFilmCta({ cta }) {
  if (!cta) return null;

  return (
    <section className="case-film-cta">
      <CaseStudyHeading lines={cta.headingLines} heading={cta.heading} />
      <p className="case-film-cta__text">{cta.body}</p>
      <Link to={cta.href} className="hustle-link case-film-cta__btn">
        {cta.label}
      </Link>
    </section>
  );
}

export default function CaseStudyFilm({ study }) {
  const filmStudy = useMemo(() => buildCaseFilm(study), [study]);
  const { film } = filmStudy;

  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroVisualRef = useRef(null);
  const beatRefs = useRef([]);

  const storyStart = 2;
  const systemIndex = storyStart + film.story.length;
  const workRef = useRef(null);
  const impactRef = useRef(null);

  useCaseScrollEffects({
    heroRef,
    heroContentRef,
    heroVisualRef,
    beatRefs,
  });

  return (
    <div className="case-film">
      <CaseFilmHero
        study={filmStudy}
        heroRef={heroRef}
        contentRef={heroContentRef}
        visualRef={heroVisualRef}
      />
      <CaseFilmProof items={filmStudy.proofBar} />

      <CaseFilmProblemShift
        film={film}
        slug={filmStudy.slug}
        beatRefs={beatRefs}
        startIndex={0}
      />

      <CaseFilmStory
        beats={film.story}
        slug={filmStudy.slug}
        beatRefs={beatRefs}
        startIndex={storyStart}
      />

      <CaseFilmSystem
        system={film.system}
        slug={filmStudy.slug}
        beatRef={(el) => {
          beatRefs.current[systemIndex] = {
            section: el,
            content: el?.querySelector('.case-film-beat__content'),
            visual: null,
          };
        }}
      />

      <CaseFilmWork work={film.work} slug={filmStudy.slug} beatRef={workRef} />

      <CaseFilmImpact impact={film.impact} beatRef={impactRef} />

      <CaseFilmRole roles={film.role} />

      <CaseFilmCta cta={filmStudy.cta} />
    </div>
  );
}

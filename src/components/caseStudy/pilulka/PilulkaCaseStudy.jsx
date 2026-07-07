import { useRef } from 'react';
import { PILULKA_CASE } from '../../../data/pilulkaCase';
import { useCaseScrollEffects } from '../../../hooks/useCaseScrollEffects';
import { usePilulkaCtaBackground } from '../../../hooks/usePilulkaCtaBackground';
import PilulkaCaseCta from './PilulkaCaseCta';

const STACK_CLASSES = ['proof-img--a', 'proof-img--b', 'proof-img--c'];

function MediaAsset({ item, className = '' }) {
  if (!item) return null;

  if (item.type === 'video') {
    return (
      <video
        className={className}
        src={item.src}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
      />
    );
  }

  return (
    <img
      className={className}
      src={item.src}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}

function ChapterHeadline({ lines, lineIndents, as: Tag = 'h2' }) {
  return (
    <Tag className="claim pilulka-chapter__headline" data-lines={lines.length}>
      {lines.map((line, i) => (
        <span
          key={line}
          className="claim-line"
          style={{ '--claim-indent': lineIndents?.[i] ?? '0' }}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
}

function ChapterProse({ paragraphs }) {
  return (
    <div className="pilulka-chapter__prose">
      {paragraphs.map((text) => (
        <p key={text.slice(0, 48)} className="text-body">
          {text}
        </p>
      ))}
    </div>
  );
}

function ShiftLines({ before, after }) {
  return (
    <div className="pilulka-chapter__shift">
      <p className="pilulka-chapter__shift-line">{before}</p>
      <p className="pilulka-chapter__shift-line pilulka-chapter__shift-line--after">{after}</p>
    </div>
  );
}

function KeyLearnings({ data }) {
  if (!data?.items?.length) return null;

  return (
    <section className="pilulka-key-learnings" aria-labelledby="pilulka-key-learnings-title">
      <div className="pilulka-key-learnings__inner">
        <h2 id="pilulka-key-learnings-title" className="pilulka-key-learnings__title claim">
          {data.title.lines.map((line, i) => (
            <span
              key={line}
              className="claim-line"
              style={{ '--claim-indent': data.title.lineIndents?.[i] ?? '0' }}
            >
              {line}
            </span>
          ))}
        </h2>
        <div className="pilulka-key-learnings__grid">
          {data.items.map((item) => (
            <article key={item.title.join('-')} className="pilulka-key-learnings__col">
              <h3 className="pilulka-key-learnings__col-title">
                {item.title.map((line) => (
                  <span key={line} className="pilulka-key-learnings__col-title-line">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="pilulka-key-learnings__col-body text-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterMedia({ items }) {
  if (!items?.length) return null;

  return (
    <div className="pilulka-chapter__media-wrap">
      <div className="proof-visual proof-visual--pilulka pilulka-chapter__stack" aria-hidden="true">
        {items.map((item, index) => (
          <MediaAsset
            key={item.src}
            item={item}
            className={`proof-img ${item.className ?? STACK_CLASSES[index % STACK_CLASSES.length]}`}
          />
        ))}
      </div>
    </div>
  );
}

function ChapterText({ chapter, index, logo }) {
  return (
    <div className="pilulka-chapter__text">
      {index === 0 && logo && (
        <img
          src={logo.src}
          alt={logo.alt}
          className="pilulka-case-logo"
          loading="eager"
          decoding="async"
        />
      )}
      <ChapterHeadline
        as={index === 0 ? 'h1' : 'h2'}
        lines={chapter.headline.lines}
        lineIndents={chapter.headline.lineIndents}
      />
      <ChapterProse paragraphs={chapter.paragraphs} />
      {chapter.shift && (
        <ShiftLines before={chapter.shift.before} after={chapter.shift.after} />
      )}
    </div>
  );
}

export default function PilulkaCaseStudy() {
  const { logo, chapters, keyLearnings } = PILULKA_CASE;
  const beatRefs = useRef([]);
  const beatIndexRef = useRef(0);
  const ctaRef = useRef(null);

  beatIndexRef.current = 0;

  useCaseScrollEffects({ beatRefs });
  usePilulkaCtaBackground(ctaRef);

  const bindChapter = (el) => {
    if (!el) return;
    const idx = beatIndexRef.current;
    beatIndexRef.current += 1;
    beatRefs.current[idx] = {
      section: el,
      content:
        el.querySelector('.pilulka-chapter__text') ||
        el.querySelector('.pilulka-chapter__intro-body'),
      visual: el.querySelector('.proof-visual'),
    };
  };

  const intro = chapters[0];
  const restChapters = chapters.slice(1);

  return (
    <article className="pilulka-case pilulka-case--zigzag">
      <section
        key={intro.id}
        ref={bindChapter}
        className="pilulka-chapter pilulka-chapter--intro"
        data-chapter={intro.id}
      >
        <img
          src={logo.src}
          alt={logo.alt}
          className="pilulka-case-logo"
          loading="eager"
          decoding="async"
        />
        <div className="pilulka-chapter__intro-hero">
          <ChapterMedia items={intro.media} />
          <ChapterHeadline
            as="h1"
            lines={intro.headline.lines}
            lineIndents={intro.headline.lineIndents}
          />
        </div>
        <div className="pilulka-chapter__intro-body">
          <ChapterProse paragraphs={intro.paragraphs} />
        </div>
      </section>

      {restChapters.map((chapter, index) => (
        <section
          key={chapter.id}
          ref={bindChapter}
          className={`pilulka-chapter${chapter.id === 'proof' ? ' pilulka-chapter--proof' : ''}${(index + 1) % 2 === 1 ? ' pilulka-chapter--flip' : ''}`}
          data-chapter={chapter.id}
        >
          <div className="pilulka-chapter__row">
            <ChapterText chapter={chapter} index={index + 1} logo={logo} />
            <ChapterMedia items={chapter.media} />
          </div>
        </section>
      ))}
      <KeyLearnings data={keyLearnings} />
      <PilulkaCaseCta ref={ctaRef} />
    </article>
  );
}

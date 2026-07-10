import CaseHeadline from '../primitives/CaseHeadline';
import CaseProse from '../primitives/CaseProse';
import CaseMediaStack from '../primitives/CaseMediaStack';
import CaseSceneProofs from '../primitives/CaseSceneProofs';
import CaseShift from '../primitives/CaseShift';

function ChapterCta({ cta }) {
  if (!cta?.label) return null;

  return (
    <a className="hustle-link pilulka-chapter__cta" href={cta.href ?? '#'}>
      {cta.label}
    </a>
  );
}

function ClientLogo({ logo }) {
  if (!logo?.src) return null;

  return (
    <img
      src={logo.src}
      alt={logo.alt}
      className="pilulka-chapter__client-logo"
      loading="lazy"
      decoding="async"
    />
  );
}

function ChapterText({
  chapter,
  index,
  logo,
  showCta = false,
  logoAboveProse = false,
  bodyFlow = false,
}) {
  const body = (
    <>
      {logoAboveProse && <ClientLogo logo={logo} />}
      <CaseProse paragraphs={chapter.paragraphs} />
      {chapter.shift && (
        <CaseShift before={chapter.shift.before} after={chapter.shift.after} />
      )}
      {chapter.sceneProofs && (
        <CaseSceneProofs
          proofs={chapter.sceneProofs}
          variant={chapter.sceneProofsVariant}
          placement="body"
        />
      )}
      {showCta && <ChapterCta cta={chapter.cta} />}
    </>
  );

  return (
    <div className="pilulka-chapter__text">
      {index === 0 && logo && !logoAboveProse && (
        <img
          src={logo.src}
          alt={logo.alt}
          className="pilulka-case-logo"
          loading="eager"
          decoding="async"
        />
      )}
      <CaseHeadline
        as={index === 0 ? 'h1' : 'h2'}
        lines={chapter.headline.lines}
        lineIndents={chapter.headline.lineIndents}
        uniform={chapter.headline.uniform}
      />
      {bodyFlow ? <div className="pilulka-chapter__body-flow">{body}</div> : body}
    </div>
  );
}

/**
 * ZigzagChapter — obsahová kapitola s textem a médiem.
 * Nadpis je vždy jeden blok (.claim). Proof bloky jen pod textem.
 */
export default function CaseZigzagChapterSection({
  id = 'chapter',
  headline,
  paragraphs,
  points,
  closing,
  media,
  flip = false,
  shift,
  sceneProofs,
  sceneProofsVariant,
  sceneProofsPlacement = 'body',
  variant,
  layout = 'default',
  logo,
  cta,
  visualVariant = 'pilulka',
  stackLayout = 'stagger',
  bindRef,
}) {
  const chapter = {
    headline,
    paragraphs,
    points,
    closing,
    shift,
    sceneProofs,
    sceneProofsVariant,
    sceneProofsPlacement,
    cta,
  };

  if (layout === 'split-prose') {
    return (
      <section
        ref={bindRef}
        className={`pilulka-chapter pilulka-chapter--split-prose${flip ? ' pilulka-chapter--flip' : ''}`}
        data-section={id}
      >
        <div className="pilulka-chapter__split-row">
          <div className="pilulka-chapter__split-head">
            <CaseHeadline
              as="h2"
              lines={headline.lines}
              lineIndents={headline.lineIndents}
              uniform={headline.uniform}
            />
          </div>
          <div className="pilulka-chapter__split-body">
            <CaseProse paragraphs={paragraphs} />
            {points?.length > 0 && (
              <ul className="pilulka-chapter__points">
                {points.map((line) => (
                  <li key={line} className="text-body">
                    {line}
                  </li>
                ))}
              </ul>
            )}
            <CaseProse paragraphs={closing} />
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'overlay') {
    return (
      <section
        ref={bindRef}
        className={`pilulka-chapter pilulka-chapter--overlay${flip ? ' pilulka-chapter--flip' : ''}`}
        data-section={id}
      >
        <div className="pilulka-chapter__overlay-stage">
          <CaseMediaStack
            items={media}
            visualVariant={visualVariant}
            stackLayout={stackLayout}
            stackType="zigzag"
          />
          <div className="pilulka-chapter__overlay-layout">
            <CaseHeadline
              as="h2"
              lines={headline.lines}
              lineIndents={headline.lineIndents}
              uniform={headline.uniform}
            />
            <div className="pilulka-chapter__overlay-side">
              {logo && (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="pilulka-chapter__overlay-logo"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <CaseProse paragraphs={paragraphs} />
              <ChapterCta cta={cta} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isCaseLink = layout === 'case-link' || layout === 'case-link-logo';

  return (
    <section
      ref={bindRef}
      className={`pilulka-chapter${variant === 'proof' ? ' pilulka-chapter--proof' : ''}${flip ? ' pilulka-chapter--flip' : ''}${isCaseLink ? ' pilulka-chapter--case-link' : ''}`}
      data-section={id}
    >
      <div className="pilulka-chapter__row">
        <ChapterText
          chapter={chapter}
          index={1}
          logo={logo}
          logoAboveProse={layout === 'case-link-logo'}
          showCta={isCaseLink || Boolean(cta)}
          bodyFlow={isCaseLink}
        />
        <CaseMediaStack
          items={media}
          visualVariant={visualVariant}
          stackLayout={stackLayout}
          stackType="zigzag"
        />
      </div>
    </section>
  );
}

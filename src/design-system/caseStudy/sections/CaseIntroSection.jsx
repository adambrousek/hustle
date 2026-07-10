import CaseHeadline from '../primitives/CaseHeadline';
import CaseProse from '../primitives/CaseProse';
import CaseMediaStack from '../primitives/CaseMediaStack';
import CaseSceneProofs from '../primitives/CaseSceneProofs';

/**
 * Intro — hero kapitola case study.
 * Logo, stacked media v hero pod headline, prose + volitelné aside proofs.
 */
function ChapterCta({ cta }) {
  if (!cta?.label) return null;

  return (
    <a className="hustle-link pilulka-chapter__cta" href={cta.href ?? '#'}>
      {cta.label}
    </a>
  );
}

export default function CaseIntroSection({
  logo,
  headline,
  subhead,
  paragraphs,
  media,
  sceneProofs,
  sceneProofsVariant,
  sceneProofsPlacement = 'aside',
  visualVariant = 'pilulka',
  stackLayout = 'offset',
  layout = 'default',
  cta,
  bindRef,
}) {
  const hasAsideProofs =
    sceneProofs?.length > 0 && sceneProofsPlacement === 'aside';

  if (layout === 'hero-split') {
    return (
      <section
        ref={bindRef}
        className="pilulka-chapter pilulka-chapter--intro pilulka-chapter--hero-split"
        data-section="intro"
      >
        <div className="pilulka-chapter__intro-shell">
          <div className="pilulka-chapter__hero-split">
            <div className="pilulka-chapter__intro-hero">
              {media?.length > 0 && (
                <CaseMediaStack
                  items={media}
                  visualVariant={visualVariant}
                  stackLayout={stackLayout}
                  stackType="intro"
                />
              )}
              <CaseHeadline
                as="h1"
                lines={headline.lines}
                lineIndents={headline.lineIndents}
                uniform={headline.uniform}
              />
            </div>
            <div className="pilulka-chapter__hero-aside">
              {subhead?.lines?.length > 0 && (
                <CaseHeadline
                  as="h2"
                  className="pilulka-chapter__subhead"
                  lines={subhead.lines}
                  lineIndents={subhead.lineIndents}
                  uniform={subhead.uniform ?? true}
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

  return (
    <section
      ref={bindRef}
      className={`pilulka-chapter pilulka-chapter--intro${
        hasAsideProofs ? ' pilulka-chapter--intro-aside' : ''
      }`}
      data-section="intro"
    >
      <div className="pilulka-chapter__intro-shell">
        {logo && (
          <img
            src={logo.src}
            alt={logo.alt}
            className="pilulka-case-logo"
            loading="eager"
            decoding="async"
          />
        )}

        <div className="pilulka-chapter__intro-hero">
          <CaseMediaStack
            items={media}
            visualVariant={visualVariant}
            stackLayout={stackLayout}
            stackType="intro"
          />
          <CaseHeadline
            as="h1"
            lines={headline.lines}
            lineIndents={headline.lineIndents}
            uniform={headline.uniform}
          />
        </div>

        <div className="pilulka-chapter__intro-body">
          <div
            className={`pilulka-chapter__intro-row${
              hasAsideProofs ? ' pilulka-chapter__intro-row--with-proofs' : ''
            }`}
          >
            <CaseProse paragraphs={paragraphs} />
            {hasAsideProofs && (
              <CaseSceneProofs
                proofs={sceneProofs}
                variant={sceneProofsVariant}
                placement="aside"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

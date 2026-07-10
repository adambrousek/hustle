import { useRef } from 'react';
import { PILULKA_CASE } from '../../data/pilulkaCase';
import { useCaseScrollEffects } from '../../hooks/useCaseScrollEffects';
import { getParallaxBeat, mergeSectionRefs } from '../../utils/parallaxTargets';
import CaseIntroSection from './sections/CaseIntroSection';
import CaseZigzagChapterSection from './sections/CaseZigzagChapterSection';
import CaseKeyLearningsSection from './sections/CaseKeyLearningsSection';
import CaseCtaSection from './sections/CaseCtaSection';

/**
 * EditorialCaseStudy — složená stránka z kapitol.
 * Používá se na /portfolio/case/:slug.
 */
export default function EditorialCaseStudy({ caseData = PILULKA_CASE }) {
  const { logo, chapters, keyLearnings, visualVariant = 'pilulka' } = caseData;
  const beatRefs = useRef([]);
  const beatIndexRef = useRef(0);
  const ctaRef = useRef(null);

  beatIndexRef.current = 0;

  useCaseScrollEffects({ beatRefs });
  usePilulkaCtaBackground(ctaRef, caseData);

  const bindChapter = (el) => {
    if (!el) return;
    const idx = beatIndexRef.current;
    beatIndexRef.current += 1;
    beatRefs.current[idx] = getParallaxBeat(el);
  };

  const intro = chapters[0];
  const restChapters = chapters.slice(1);

  return (
    <article className="pilulka-case pilulka-case--zigzag">
      <CaseIntroSection
        bindRef={bindChapter}
        logo={logo}
        headline={intro.headline}
        paragraphs={intro.paragraphs}
        media={intro.media}
        sceneProofs={intro.sceneProofs}
        sceneProofsVariant={intro.sceneProofsVariant}
        sceneProofsPlacement={intro.sceneProofsPlacement}
        visualVariant={visualVariant}
        stackLayout={intro.stackLayout}
      />

      {restChapters.map((chapter, index) => {
        const isFlipped = chapter.flip ?? (index + 1) % 2 === 1;

        return (
          <CaseZigzagChapterSection
            key={chapter.id}
            bindRef={bindChapter}
            id={chapter.id}
            headline={chapter.headline}
            paragraphs={chapter.paragraphs}
            media={chapter.media}
            flip={isFlipped}
            shift={chapter.shift}
            sceneProofs={chapter.sceneProofs}
            sceneProofsVariant={chapter.sceneProofsVariant}
            sceneProofsPlacement={chapter.sceneProofsPlacement}
            variant={chapter.id === 'proof' ? 'proof' : undefined}
            visualVariant={visualVariant}
            stackLayout={chapter.stackLayout}
          />
        );
      })}

      <CaseKeyLearningsSection title={keyLearnings.title} items={keyLearnings.items} />
      <CaseCtaSection ref={mergeSectionRefs(ctaRef, bindChapter)} />
    </article>
  );
}

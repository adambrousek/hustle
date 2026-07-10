import { useEffect, useMemo, useRef } from 'react';
import BackgroundCrossfade from '../components/BackgroundCrossfade';
import { useCaseScrollEffects } from '../hooks/useCaseScrollEffects';
import { useSectionBgCrossfade } from '../hooks/useSectionBgCrossfade';
import { syncPageBackground } from '../utils/browserChrome';
import { bgColorsEqual } from '../utils/bgCrossfade';
import { getParallaxBeat } from '../utils/parallaxTargets';
import {
  blockHasParallax,
  blockToProps,
  getBlockBg,
  getSectionType,
} from './sectionTypes';

export default function ComposedPage({ page }) {
  const bgARef = useRef(null);
  const bgBRef = useRef(null);
  const beatRefs = useRef([]);
  const scrollTargets = useRef([]);
  const beatIndexRef = useRef(0);
  const targetIndexRef = useRef(0);

  beatIndexRef.current = 0;
  targetIndexRef.current = 0;

  const bgSections = useMemo(() => page.blocks.map(getBlockBg), [page.blocks]);

  useEffect(() => {
    beatRefs.current = [];
    scrollTargets.current = [];
    beatIndexRef.current = 0;
    targetIndexRef.current = 0;
  }, [page.id]);

  useCaseScrollEffects({ beatRefs });
  useSectionBgCrossfade({ bgARef, bgBRef, scrollTargets });

  useEffect(() => {
    const first = bgSections[0];
    if (first) {
      document.documentElement.classList.add('pilulka-case-mode');
      document.documentElement.style.setProperty('--case-bg', first.bg);
      syncPageBackground(first.bg, first.themeColor, first.chromeBottom);
    }

    return () => {
      document.documentElement.classList.remove('pilulka-case-mode');
      document.documentElement.style.removeProperty('--case-bg');
    };
  }, [page.id, bgSections]);

  const bindBeat = (el) => {
    if (!el) return;
    const idx = beatIndexRef.current;
    beatIndexRef.current += 1;
    beatRefs.current[idx] = getParallaxBeat(el);
  };

  const bindScrollTarget = (el, bg) => {
    if (!el) return;
    const idx = targetIndexRef.current;
    targetIndexRef.current += 1;
    scrollTargets.current[idx] = { el, bg };
  };

  return (
    <>
      <BackgroundCrossfade bgARef={bgARef} bgBRef={bgBRef} />
      <article className="pilulka-case pilulka-case--zigzag cms-composed-page">
        {page.blocks.map((block, index) => {
          const typeDef = getSectionType(block.type);
          if (!typeDef) return null;

          const Component = typeDef.component;
          const props = blockToProps(block);
          const bg = bgSections[index];
          const prevBg = index > 0 ? bgSections[index - 1] : null;
          const hasColorChange = prevBg && !bgColorsEqual(prevBg, bg);
          const hasParallax = blockHasParallax(block);

          return (
            <div key={block.id} className="cms-composed-page__segment">
              {hasColorChange && (
                <div
                  className="cms-composed-page__bg-transition"
                  aria-hidden="true"
                  ref={(el) => bindScrollTarget(el, bg)}
                />
              )}
              <div
                ref={(el) => bindScrollTarget(el, bg)}
                className="cms-composed-page__block"
                data-block-id={block.id}
                data-bg={bg.bg}
              >
                <Component {...props} bindRef={hasParallax ? bindBeat : undefined} />
              </div>
            </div>
          );
        })}
      </article>
    </>
  );
}

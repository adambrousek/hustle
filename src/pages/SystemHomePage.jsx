import { useEffect, useRef } from 'react';
import Header from '../components/Header';
import { CASE_STUDY_SECTIONS } from '../design-system/caseStudy';
import ShowcaseSectionBlock from '../design-system/caseStudy/demo/ShowcaseSectionBlock';
import { useCaseScrollEffects } from '../hooks/useCaseScrollEffects';
import { syncPageBackground } from '../utils/browserChrome';
import { getParallaxBeat } from '../utils/parallaxTargets';
import '../styles.css';
import '../styles/pilulkaCase.css';
import '../styles/manifest.css';
import '../styles/designSystemShowcase.css';

const SHOWCASE_BG = '#006858';
const SHOWCASE_THEME = '#006858';
const SHOWCASE_CHROME = '#003830';

export default function SystemHomePage() {
  const beatRefs = useRef([]);
  const beatIndexRef = useRef(0);

  beatIndexRef.current = 0;

  useCaseScrollEffects({ beatRefs });

  const bindSection = (el) => {
    if (!el) return;
    const idx = beatIndexRef.current;
    beatIndexRef.current += 1;
    beatRefs.current[idx] = getParallaxBeat(el);
  };

  useEffect(() => {
    document.documentElement.classList.add('pilulka-case-mode', 'ds-showcase-mode');
    document.documentElement.style.setProperty('--case-bg', SHOWCASE_BG);
    syncPageBackground(SHOWCASE_BG, SHOWCASE_THEME, SHOWCASE_CHROME);

    return () => {
      document.documentElement.classList.remove('pilulka-case-mode', 'ds-showcase-mode');
      document.documentElement.style.removeProperty('--case-bg');
    };
  }, []);

  return (
    <div className="app-shell pilulka-case-page ds-showcase-page">
      <div className="case-detail-page__bg" aria-hidden="true" />
      <Header />
      <main className="main pilulka-case-main ds-showcase-main">
        <header className="ds-showcase-header">
          <h1 className="ds-showcase-header__title">Case Study Sekce</h1>
          <p className="ds-showcase-header__desc text-body">
            Katalog všech sekcí pro skládání stránek. Každá sekce obsahuje lorem ipsum
            a je pojmenovaná podle své role v layoutu.
          </p>
        </header>

        <article className="pilulka-case pilulka-case--zigzag ds-showcase-list">
          {CASE_STUDY_SECTIONS.map((section) => (
            <ShowcaseSectionBlock
              key={section.id}
              section={section}
              bindSection={bindSection}
            />
          ))}
        </article>
      </main>
    </div>
  );
}

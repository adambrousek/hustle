import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_BG, HERO_CHROME_BOTTOM, HERO_THEME } from '../data/proofs';
import { commitChrome } from '../utils/browserChrome';
import { setupParallax } from '../utils/scrollParallax';
import { PILULKA_CASE } from '../data/pilulkaCase';

gsap.registerPlugin(ScrollTrigger);

export function usePilulkaCtaBackground(ctaRef) {
  useLayoutEffect(() => {
    const section = ctaRef?.current;
    if (!section) return;

    const fromBg = PILULKA_CASE.bg;
    const fromChrome = PILULKA_CASE.chromeBottom;

    const applyBg = (progress) => {
      const t = Math.max(0, Math.min(1, progress));
      const bg = gsap.utils.interpolate(fromBg, HERO_BG, t);
      const chromeBottom = gsap.utils.interpolate(fromChrome, HERO_CHROME_BOTTOM, t);
      const theme = gsap.utils.interpolate(fromBg, HERO_THEME, t);

      document.documentElement.style.setProperty('--case-bg', bg);
      document.documentElement.classList.toggle('pilulka-cta-active', t > 0.92);
      commitChrome(theme, chromeBottom);
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top 38%',
        scrub: 0.5,
        onUpdate: (self) => applyBg(self.progress),
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 38%',
        end: 'bottom bottom',
        onEnter: () => applyBg(1),
        onEnterBack: () => applyBg(1),
        onLeaveBack: () => applyBg(0),
      });

      const visual = section.querySelector('.manifest-contact-visual');
      if (visual) {
        setupParallax(section, null, visual);
      }
    });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      ctx.revert();
      document.documentElement.classList.remove('pilulka-cta-active');
      document.documentElement.style.setProperty('--case-bg', fromBg);
      commitChrome(PILULKA_CASE.themeColor, fromChrome);
    };
  }, [ctaRef]);
}

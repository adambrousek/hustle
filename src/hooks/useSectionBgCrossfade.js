import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createBgCrossfadeController } from '../utils/bgCrossfade';

gsap.registerPlugin(ScrollTrigger);

/**
 * Crossfade pozadí podle scroll pozice sekcí — univerzální pro CMS i jiné stránky.
 * scrollTargets: [{ el, bg: { bg, themeColor, chromeBottom } }]
 */
export function useSectionBgCrossfade({ bgARef, bgBRef, scrollTargets }) {
  useLayoutEffect(() => {
    const bgA = bgARef.current;
    const bgB = bgBRef.current;
    const targets = scrollTargets.current?.filter((t) => t?.el) ?? [];
    if (!bgA || !bgB || !targets.length) return undefined;

    const controller = createBgCrossfadeController(bgA, bgB);
    const first = targets[0]?.bg;
    if (first) {
      controller.init(first.bg, first.themeColor, first.chromeBottom);
      document.documentElement.style.setProperty('--case-bg', first.bg);
    }

    const ctx = gsap.context(() => {
      targets.forEach(({ el, bg }) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (!self.isActive) return;
            controller.crossfadeBg(bg.bg, bg.themeColor, bg.chromeBottom);
            document.documentElement.style.setProperty('--case-bg', bg.bg);
          },
        });
      });
    });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      controller.kill();
      ctx.revert();
    };
  }, [bgARef, bgBRef, scrollTargets]);
}

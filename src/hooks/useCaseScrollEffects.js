import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setupParallax } from '../utils/scrollParallax';

gsap.registerPlugin(ScrollTrigger);

export function useCaseScrollEffects({ heroRef, heroContentRef, heroVisualRef, beatRefs } = {}) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef?.current) {
        setupParallax(heroRef.current, heroContentRef?.current, heroVisualRef?.current);
      }

      beatRefs?.current?.forEach((beat) => {
        if (beat?.section) {
          setupParallax(beat.section, beat.content, beat.visual);
        }
      });
    });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      ctx.revert();
    };
  }, [heroRef, heroContentRef, heroVisualRef, beatRefs]);
}

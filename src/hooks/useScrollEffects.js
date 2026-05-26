import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BG_SECTIONS,
  DARK_CTA_BG,
  DARK_CTA_CHROME_BOTTOM,
  DARK_CTA_THEME,
  DEFAULT_RED_BG,
  DEFAULT_RED_CHROME_BOTTOM,
  DEFAULT_RED_THEME,
  DEEP_RED_BG,
  DEEP_RED_CHROME_BOTTOM,
  DEEP_RED_THEME,
  HERO_BG,
  HERO_CHROME_BOTTOM,
  HERO_THEME,
} from '../data/proofs';
import {
  applyChromeBlend,
  commitChrome,
  startChromeBlend,
  syncPageBackground,
} from '../utils/browserChrome';

gsap.registerPlugin(ScrollTrigger);

function setupParallax(section, claim, signature, visual) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8,
    },
  });

  tl.fromTo(
    claim,
    { y: '20vh', opacity: 0 },
    { y: '0vh', opacity: 1, duration: 0.35, ease: 'none' },
    0,
  ).to(claim, { y: '-14vh', opacity: 0, duration: 0.35, ease: 'none' }, 0.65);

  if (signature) {
    const sigTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.85,
      },
    });

    sigTl
      .fromTo(
        signature,
        { y: '26vh', opacity: 0 },
        { y: '2vh', opacity: 1, duration: 0.38, ease: 'none' },
        0,
      )
      .to(signature, { y: '-4vh', opacity: 0, duration: 0.32, ease: 'none' }, 0.62);
  }

  if (visual) {
    const imgs = visual.querySelectorAll('.proof-img');
    imgs.forEach((img, i) => {
      const startY = 58 + i * 10;
      const endY = -62 - i * 6;
      const centered = img.classList.contains('proof-img--center');

      gsap.fromTo(
        img,
        {
          y: `${startY}vh`,
          xPercent: centered ? -50 : 0,
          yPercent: -50,
          force3D: true,
        },
        {
          y: `${endY}vh`,
          xPercent: centered ? -50 : 0,
          yPercent: -50,
          force3D: true,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        },
      );
    });

    // Readability: in-focus (middle) -> fade visuals a bit,
    // edges (start/end) -> allow stronger overlap.
    gsap.fromTo(
      visual,
      { opacity: 1 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
          onUpdate: (self) => {
            // 0..1
            const p = self.progress;
            // peak fade in middle
            const mid = 1 - Math.min(1, Math.abs(p - 0.5) / 0.22);
            const target = 1 - mid * 0.75; // ~0.25 in focus
            gsap.to(visual, { opacity: target, duration: 0.08, overwrite: true });
          },
        },
      },
    );
  }
}

export function useScrollEffects(refs) {
  const {
    bgARef,
    bgBRef,
    heroRef,
    proofSectionRefs,
    positioningRef,
    placementRef,
    problemRef,
    systemRef,
    ctaRef,
    heroClaimRef,
    heroSupportRef,
  } = refs;

  const activeIsA = useRef(true);
  const currentBg = useRef(null);
  const scrollSample = useRef({ y: 0, t: performance.now() });

  const getCrossfadeDuration = () => {
    const now = performance.now();
    const y = window.scrollY;
    const dy = Math.abs(y - scrollSample.current.y);
    const dt = Math.max(now - scrollSample.current.t, 16);
    scrollSample.current.y = y;
    scrollSample.current.t = now;
    const velocity = dy / dt;
    if (velocity > 2.5) return 0.38;
    if (velocity > 1.1) return 0.58;
    return 0.92;
  };

  useEffect(() => {
    const bgA = bgARef.current;
    const bgB = bgBRef.current;
    if (!bgA || !bgB) return undefined;

    gsap.set(bgA, { background: HERO_BG, opacity: 1 });
    gsap.set(bgB, { background: HERO_BG, opacity: 0 });
    syncPageBackground(HERO_BG, HERO_THEME, HERO_CHROME_BOTTOM);

    const setBgInstant = (newBg, chromeTop, chromeBottom = chromeTop) => {
      currentBg.current = newBg;
      syncPageBackground(newBg, chromeTop, chromeBottom);
      gsap.killTweensOf([bgA, bgB]);
      activeIsA.current = true;
      gsap.set(bgA, { background: newBg, opacity: 1 });
      gsap.set(bgB, { opacity: 0 });
    };

    const crossfadeBg = (newBg, chromeTop, chromeBottom = chromeTop, duration = getCrossfadeDuration()) => {
      const bgChanged = currentBg.current !== newBg;
      currentBg.current = newBg;

      if (!bgChanged) {
        syncPageBackground(newBg, chromeTop, chromeBottom);
        return;
      }

      const next = activeIsA.current ? bgB : bgA;
      const curr = activeIsA.current ? bgA : bgB;

      startChromeBlend(chromeTop, chromeBottom);

      gsap.killTweensOf([bgA, bgB]);
      gsap.set(next, { background: newBg, opacity: 0 });
      gsap.set(curr, { opacity: Number(gsap.getProperty(curr, 'opacity')) || 1 });

      const syncChromeToBg = () => {
        applyChromeBlend(Number(gsap.getProperty(next, 'opacity')) || 0);
      };

      gsap.to(curr, {
        opacity: 0,
        duration,
        ease: 'power2.inOut',
        overwrite: true,
        onUpdate: syncChromeToBg,
      });
      gsap.to(next, {
        opacity: 1,
        duration,
        ease: 'power2.inOut',
        overwrite: true,
        onUpdate: syncChromeToBg,
        onComplete: () => commitChrome(chromeTop, chromeBottom),
      });
      activeIsA.current = !activeIsA.current;
    };

    const ctx = gsap.context(() => {
      const bgTriggers = [];

      if (heroRef?.current) {
        const t = ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          onToggle: (self) => {
            if (self.isActive) crossfadeBg(HERO_BG, HERO_THEME, HERO_CHROME_BOTTOM);
          },
        });
        t.vars.__bg = HERO_BG;
        t.vars.__themeColor = HERO_THEME;
        t.vars.__chromeBottom = HERO_CHROME_BOTTOM;
        bgTriggers.push(t);
      }

      if (heroClaimRef?.current && heroRef?.current) {
        gsap.fromTo(
          heroClaimRef.current,
          { y: '0vh' },
          {
            y: '-3vh',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        );
      }

      if (heroSupportRef?.current && heroRef?.current) {
        gsap.fromTo(
          heroSupportRef.current,
          { y: '0vh' },
          {
            y: '-5vh',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        );
      }

      proofSectionRefs.forEach((sectionRef, index) => {
        const section = sectionRef.current;
        if (!section) return;

        const bgConfig = BG_SECTIONS[index];
        if (!bgConfig) return;

        const t = ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) {
              crossfadeBg(bgConfig.bg, bgConfig.color, bgConfig.chromeBottom ?? bgConfig.color);
            }
          },
        });
        t.vars.__bg = bgConfig.bg;
        t.vars.__themeColor = bgConfig.color;
        t.vars.__chromeBottom = bgConfig.chromeBottom ?? bgConfig.color;
        bgTriggers.push(t);

        const claim = section.querySelector('.claim');
        const signature = section.querySelector('.proof-signature');
        const visual = section.querySelector('.proof-visual');

        if (claim) setupParallax(section, claim, signature, visual);
      });

      if (positioningRef?.current) {
        const t = ScrollTrigger.create({
          trigger: positioningRef.current,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) crossfadeBg(DEEP_RED_BG, DEEP_RED_THEME, DEEP_RED_CHROME_BOTTOM);
          },
        });
        t.vars.__bg = DEEP_RED_BG;
        t.vars.__themeColor = DEEP_RED_THEME;
        t.vars.__chromeBottom = DEEP_RED_CHROME_BOTTOM;
        bgTriggers.push(t);
      }

      if (placementRef?.current) {
        const t = ScrollTrigger.create({
          trigger: placementRef.current,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) {
              crossfadeBg(DEFAULT_RED_BG, DEFAULT_RED_THEME, DEFAULT_RED_CHROME_BOTTOM);
            }
          },
        });
        t.vars.__bg = DEFAULT_RED_BG;
        t.vars.__themeColor = DEFAULT_RED_THEME;
        t.vars.__chromeBottom = DEFAULT_RED_CHROME_BOTTOM;
        bgTriggers.push(t);
      }

      if (problemRef?.current) {
        const t = ScrollTrigger.create({
          trigger: problemRef.current,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) crossfadeBg(DEEP_RED_BG, DEEP_RED_THEME, DEEP_RED_CHROME_BOTTOM);
          },
        });
        t.vars.__bg = DEEP_RED_BG;
        t.vars.__themeColor = DEEP_RED_THEME;
        t.vars.__chromeBottom = DEEP_RED_CHROME_BOTTOM;
        bgTriggers.push(t);
      }

      if (systemRef?.current) {
        const t = ScrollTrigger.create({
          trigger: systemRef.current,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) {
              crossfadeBg(DEFAULT_RED_BG, DEFAULT_RED_THEME, DEFAULT_RED_CHROME_BOTTOM);
            }
          },
        });
        t.vars.__bg = DEFAULT_RED_BG;
        t.vars.__themeColor = DEFAULT_RED_THEME;
        t.vars.__chromeBottom = DEFAULT_RED_CHROME_BOTTOM;
        bgTriggers.push(t);
      }

      if (ctaRef?.current) {
        const t = ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top 55%',
          end: 'bottom bottom',
          onToggle: (self) => {
            if (self.isActive) crossfadeBg(DARK_CTA_BG, DARK_CTA_THEME, DARK_CTA_CHROME_BOTTOM);
          },
        });
        t.vars.__bg = DARK_CTA_BG;
        t.vars.__themeColor = DARK_CTA_THEME;
        t.vars.__chromeBottom = DARK_CTA_CHROME_BOTTOM;
        bgTriggers.push(t);
      }

      // Ensure correct bg after refresh / fast scroll / direct jumps.
      ScrollTrigger.addEventListener('refresh', () => {
        const active = bgTriggers.find((t) => t && t.isActive);
        if (active?.vars?.__bg) {
          setBgInstant(
            active.vars.__bg,
            active.vars.__themeColor || HERO_THEME,
            active.vars.__chromeBottom || HERO_CHROME_BOTTOM,
          );
        }
      });

      // One-time: after initial layout + triggers, snap to currently active section.
      requestAnimationFrame(() => {
        const active = bgTriggers.find((t) => t && t.isActive);
        if (active?.vars?.__bg) {
          setBgInstant(
            active.vars.__bg,
            active.vars.__themeColor || HERO_THEME,
            active.vars.__chromeBottom || HERO_CHROME_BOTTOM,
          );
        }
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MANIFEST_BG } from '../data/manifest';
import {
  BG_SECTIONS,
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
import { isIosAppShell } from '../utils/iosAppShell';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_MQ = '(max-width: 900px)';

/**
 * startY/endY (vh) + scrub — pod textem; scroll končí když slide sedí nahoře (top top).
 */
const MOBILE_IMG_MOTION = [
  { startY: 86, endY: -74, scrub: 0.24 },
  { startY: 80, endY: -62, scrub: 0.4 },
  { startY: 74, endY: -50, scrub: 0.56 },
];

const DESKTOP_IMG_MOTION = [
  { startY: 38, endY: -34, scrub: 0.28 },
  { startY: 42, endY: -26, scrub: 0.44 },
  { startY: 46, endY: -18, scrub: 0.58 },
];

function isMobileLayout() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches;
}

function getParallaxYPercent(el) {
  if (el.classList.contains('manifest-always-on-visual__img')) return 0;
  return -50;
}

function getParallaxXPercent(el) {
  if (el.classList.contains('manifest-contact-visual__img')) return -50;
  if (el.classList.contains('proof-img--center')) return -50;
  if (el.classList.contains('proof-img--hero')) return -50;
  if (el.classList.contains('proof-img--c') && el.closest('.proof-visual--cs')) return -12;
  return 0;
}

function getImgMotion(el, i, mobile) {
  if (el.classList.contains('manifest-contact-visual__img')) {
    return mobile
      ? { startY: 12, endY: -44, scrub: 0.32 }
      : { startY: 4, endY: -38, scrub: 0.28 };
  }

  if (el.classList.contains('manifest-always-on-visual__img')) {
    return mobile
      ? { startY: 14, endY: -22, scrub: 0.34 }
      : { startY: 8, endY: -16, scrub: 0.3 };
  }

  const lanes = mobile ? MOBILE_IMG_MOTION : DESKTOP_IMG_MOTION;
  const lane = lanes[i % lanes.length];
  return {
    startY: lane.startY + i * (mobile ? 3 : 3),
    endY: lane.endY - i * (mobile ? 4 : 3),
    scrub: lane.scrub,
  };
}

function setupParallax(section, contentRoot, visual) {
  const mobile = isMobileLayout();

  if (contentRoot) {
    if (mobile) {
      gsap.fromTo(
        contentRoot,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.6,
          },
        },
      );
    } else {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      tl.fromTo(
        contentRoot,
        { y: '12vh', opacity: 0 },
        { y: '0vh', opacity: 1, duration: 0.35, ease: 'none' },
        0,
      ).to(contentRoot, { y: '-10vh', opacity: 0, duration: 0.35, ease: 'none' }, 0.65);
    }
  }

  if (visual) {
    const mediaEls = visual.querySelectorAll('.proof-img');
    mediaEls.forEach((el, i) => {
      const { startY, endY, scrub } = getImgMotion(el, i, mobile);
      const xPercent = getParallaxXPercent(el);
      const yPercent = getParallaxYPercent(el);

      gsap.fromTo(
        el,
        {
          y: `${startY}vh`,
          xPercent,
          yPercent,
          force3D: true,
        },
        {
          y: `${endY}vh`,
          xPercent,
          yPercent,
          force3D: true,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: mobile ? 'top top' : 'bottom top',
            scrub,
          },
        },
      );
    });

    const isManifestFloatVisual =
      visual.classList.contains('manifest-contact-visual') ||
      visual.classList.contains('manifest-always-on-visual');

    // Readability: in-focus (middle) -> fade visuals a bit,
    // edges (start/end) -> allow stronger overlap.
    if (!isManifestFloatVisual) {
      gsap.fromTo(
        visual,
        { opacity: 1 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: isMobileLayout() ? 'top top' : 'bottom top',
            scrub: 0.6,
            onUpdate: (self) => {
              // 0..1
              const p = self.progress;
              // peak fade in middle
              const mid = 1 - Math.min(1, Math.abs(p - 0.5) / 0.22);
              const fade = isMobileLayout() ? 0.35 : 0.55;
              const target = 1 - mid * fade;
              gsap.to(visual, { opacity: target, duration: 0.08, overwrite: true });
            },
          },
        },
      );
    }
  }
}

export function useScrollEffects(refs) {
  const {
    bgARef,
    bgBRef,
    heroRef,
    proofSectionRefs,
    manifestSectionRefs,
    heroClaimRef,
    heroSupportRef,
  } = refs;

  const activeIsA = useRef(true);
  const currentBg = useRef(null);
  const scrollSample = useRef({ y: 0, t: performance.now() });

  const getScrollVelocity = () => {
    const now = performance.now();
    const y = window.scrollY;
    const dy = Math.abs(y - scrollSample.current.y);
    const dt = Math.max(now - scrollSample.current.t, 16);
    scrollSample.current.y = y;
    scrollSample.current.t = now;
    return dy / dt;
  };

  /** iOS keeps short/instant crossfades; desktop uses slower color transitions. */
  const getCrossfadePlan = (velocity) => {
    if (isIosAppShell()) {
      if (velocity > 0.55) return { instant: true, duration: 0 };
      return { instant: false, duration: velocity > 0.95 ? 0.42 : 0.62 };
    }
    if (velocity > 3) return { instant: true, duration: 0 };
    if (velocity > 1.6) return { instant: false, duration: 1.05 };
    return { instant: false, duration: 1.45 };
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
      commitChrome(chromeTop, chromeBottom);
      gsap.killTweensOf([bgA, bgB]);
      activeIsA.current = true;
      gsap.set(bgA, { background: newBg, opacity: 1 });
      gsap.set(bgB, { opacity: 0 });
    };

    const crossfadeBg = (newBg, chromeTop, chromeBottom = chromeTop) => {
      const velocity = getScrollVelocity();
      const { instant, duration } = getCrossfadePlan(velocity);
      const bgChanged = currentBg.current !== newBg;
      const ios = isIosAppShell();
      currentBg.current = newBg;

      // Chrome always updates on section enter (Safari theme-color + header strip).
      if (!ios) {
        commitChrome(chromeTop, chromeBottom);
      }

      if (!bgChanged) {
        if (ios) commitChrome(chromeTop, chromeBottom);
        return;
      }

      if (instant) {
        setBgInstant(newBg, chromeTop, chromeBottom);
        return;
      }

      const next = activeIsA.current ? bgB : bgA;
      const curr = activeIsA.current ? bgA : bgB;

      gsap.killTweensOf([bgA, bgB]);
      gsap.set(next, { background: newBg, opacity: 0 });
      gsap.set(curr, { opacity: Number(gsap.getProperty(curr, 'opacity')) || 1 });

      if (ios) {
        startChromeBlend(chromeTop, chromeBottom);
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
      } else {
        gsap.to(curr, {
          opacity: 0,
          duration,
          ease: 'power2.inOut',
          overwrite: true,
        });
        gsap.to(next, {
          opacity: 1,
          duration,
          ease: 'power2.inOut',
          overwrite: true,
        });
      }

      activeIsA.current = !activeIsA.current;
    };

    const pickBgTrigger = (triggers) => {
      const actives = triggers.filter((t) => t?.isActive);
      if (actives.length === 0) return null;
      if (actives.length === 1) return actives[0];

      const mid = window.innerHeight * 0.5;
      let best = actives[0];
      let bestDist = Infinity;
      actives.forEach((t) => {
        const el = t.trigger;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = t;
        }
      });
      return best;
    };

    const snapActiveBg = (triggers) => {
      const active = pickBgTrigger(triggers);
      if (!active?.vars?.__bg) return;
      setBgInstant(
        active.vars.__bg,
        active.vars.__themeColor || HERO_THEME,
        active.vars.__chromeBottom || HERO_CHROME_BOTTOM,
      );
    };

    let onBgSnap = null;

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

        const contentRoot = section.querySelector('.proof-content');
        const visual = section.querySelector('.proof-visual');

        if (contentRoot) setupParallax(section, contentRoot, visual);
      });

      (manifestSectionRefs || []).forEach((sectionRef, index) => {
        const section = sectionRef?.current;
        const bgConfig = MANIFEST_BG[index];
        if (!section || !bgConfig) return;

        const isLast = index === MANIFEST_BG.length - 1;

        const t = ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: isLast ? 'bottom bottom' : 'bottom 45%',
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

        if (index === 1) {
          const visual = section.querySelector('.manifest-always-on-visual');
          if (visual) setupParallax(section, null, visual);
        }

        if (isLast) {
          const visual = section.querySelector('.manifest-contact-visual');
          if (visual) setupParallax(section, null, visual);
        }
      });

      onBgSnap = () => snapActiveBg(bgTriggers);
      ScrollTrigger.addEventListener('refresh', onBgSnap);
      ScrollTrigger.addEventListener('scrollEnd', onBgSnap);

      requestAnimationFrame(onBgSnap);
    });

    return () => {
      if (onBgSnap) {
        ScrollTrigger.removeEventListener('refresh', onBgSnap);
        ScrollTrigger.removeEventListener('scrollEnd', onBgSnap);
      }
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

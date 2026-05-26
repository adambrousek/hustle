import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BG_SECTIONS,
  DARK_CTA_BG,
  DEFAULT_RED_BG,
  DEEP_RED_BG,
  HERO_BG,
} from '../data/proofs';

gsap.registerPlugin(ScrollTrigger);

function animateBg(el, bg, duration = 0.9) {
  gsap.to(el, {
    background: bg,
    duration,
    ease: 'power2.out',
    overwrite: 'auto',
  });
}

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
    const visTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.65,
      },
    });

    visTl
      .fromTo(
        visual,
        { y: '40vh', opacity: 0, scale: 0.96 },
        { y: '-8vh', opacity: 0.5, scale: 1.02, duration: 0.4, ease: 'none' },
        0,
      )
      .to(visual, { y: '-30vh', opacity: 0.2, scale: 1.04, duration: 0.35, ease: 'none' }, 0.6);
  }
}

export function useScrollEffects(refs) {
  const {
    bgRef,
    heroRef,
    proofIntroRef,
    proofSectionRefs,
    positioningRef,
    problemRef,
    systemRef,
    ctaRef,
    heroClaimRef,
    heroSupportRef,
  } = refs;

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return undefined;

    gsap.set(bg, { background: HERO_BG });

    const ctx = gsap.context(() => {
      if (heroRef?.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          onLeave: () => animateBg(bg, DEFAULT_RED_BG),
          onEnterBack: () => animateBg(bg, HERO_BG),
        });
      }

      if (heroClaimRef?.current && heroRef?.current) {
        gsap.fromTo(
          heroClaimRef.current,
          { y: '8vh', opacity: 0 },
          {
            y: '-4vh',
            opacity: 1,
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

      if (heroSupportRef?.current && heroRef?.current) {
        gsap.fromTo(
          heroSupportRef.current,
          { y: '12vh', opacity: 0 },
          {
            y: '-6vh',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.4,
            },
          },
        );
      }

      if (proofIntroRef?.current) {
        ScrollTrigger.create({
          trigger: proofIntroRef.current,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => animateBg(bg, DEFAULT_RED_BG),
          onEnterBack: () => animateBg(bg, DEFAULT_RED_BG),
        });
      }

      proofSectionRefs.forEach((sectionRef, index) => {
        const section = sectionRef.current;
        if (!section) return;

        const bgConfig = BG_SECTIONS[index];
        if (!bgConfig) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => animateBg(bg, bgConfig.bg),
          onEnterBack: () => animateBg(bg, bgConfig.bg),
        });

        const claim = section.querySelector('.claim');
        const signature = section.querySelector('.proof-signature');
        const visual = section.querySelector('.visual-placeholder');

        if (claim) setupParallax(section, claim, signature, visual);
      });

      if (positioningRef?.current) {
        ScrollTrigger.create({
          trigger: positioningRef.current,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => animateBg(bg, DEEP_RED_BG),
          onEnterBack: () => animateBg(bg, DEEP_RED_BG),
        });
      }

      if (problemRef?.current) {
        ScrollTrigger.create({
          trigger: problemRef.current,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => animateBg(bg, DEEP_RED_BG),
          onEnterBack: () => animateBg(bg, DEEP_RED_BG),
        });
      }

      if (systemRef?.current) {
        ScrollTrigger.create({
          trigger: systemRef.current,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => animateBg(bg, DEFAULT_RED_BG),
          onEnterBack: () => animateBg(bg, DEFAULT_RED_BG),
        });
      }

      if (ctaRef?.current) {
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top center',
          end: 'bottom bottom',
          onEnter: () => animateBg(bg, DARK_CTA_BG),
          onEnterBack: () => animateBg(bg, DARK_CTA_BG),
        });
      }
    });

    return () => ctx.revert();
    // refs are stable useRef objects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

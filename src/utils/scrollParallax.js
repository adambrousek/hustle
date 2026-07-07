import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_MQ = '(max-width: 900px)';

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
  if (el.classList.contains('case-film-stat')) return 0;
  return -50;
}

function getParallaxXPercent(el) {
  if (el.classList.contains('proof-img--center')) return -50;
  if (el.classList.contains('proof-img--hero')) return -50;
  if (el.classList.contains('proof-img--c') && el.closest('.proof-visual--cs')) return -12;
  return 0;
}

function getImgMotion(el, i, mobile) {
  const lanes = mobile ? MOBILE_IMG_MOTION : DESKTOP_IMG_MOTION;
  const lane = lanes[i % lanes.length];
  return {
    startY: lane.startY + i * 3,
    endY: lane.endY - i * (mobile ? 4 : 3),
    scrub: lane.scrub,
  };
}

/** Homepage-style parallax for a scroll runway section. */
export function setupParallax(section, contentRoot, visual) {
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

  if (!visual) return;

  const mediaEls = visual.querySelectorAll('.proof-img, .case-film-stat');

  if (mobile && section.closest('.pilulka-case')) {
    gsap.set(visual, { opacity: 1 });
    mediaEls.forEach((el) => {
      gsap.set(el, { xPercent: 0, yPercent: 0, y: 0, opacity: 1 });
    });
    return;
  }

  mediaEls.forEach((el, i) => {
    const { startY, endY, scrub } = getImgMotion(el, i, mobile);
    const xPercent = getParallaxXPercent(el);
    const yPercent = getParallaxYPercent(el);

    gsap.fromTo(
      el,
      { y: `${startY}vh`, xPercent, yPercent, force3D: true },
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

  if (!visual.classList.contains('pilulka-chapter__stack')) {
    if (!visual.classList.contains('manifest-contact-visual')) {
      gsap.fromTo(
        visual,
        { opacity: 1 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: mobile ? 'top top' : 'bottom top',
            scrub: 0.6,
            onUpdate: (self) => {
              const p = self.progress;
              const mid = 1 - Math.min(1, Math.abs(p - 0.5) / 0.22);
              const fade = mobile ? 0.35 : 0.55;
              const target = 1 - mid * fade;
              gsap.to(visual, { opacity: target, duration: 0.08, overwrite: true });
            },
          },
        },
      );
    } else {
      gsap.set(visual, { opacity: 1 });
      visual.querySelectorAll('.proof-img').forEach((el) => {
        gsap.set(el, { opacity: 1 });
      });
    }
  } else {
    gsap.set(visual, { opacity: 1 });
    visual.querySelectorAll('.proof-img').forEach((el) => {
      gsap.set(el, { opacity: 1 });
    });
  }
}

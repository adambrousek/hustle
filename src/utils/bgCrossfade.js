import gsap from 'gsap';
import { applyChromeBlend, commitChrome, startChromeBlend } from './browserChrome';
import { isIosAppShell } from './iosAppShell';

function getScrollVelocity(scrollSample) {
  const now = performance.now();
  const y = window.scrollY;
  const dy = Math.abs(y - scrollSample.y);
  const dt = Math.max(now - scrollSample.t, 16);
  scrollSample.y = y;
  scrollSample.t = now;
  return dy / dt;
}

function getCrossfadePlan(velocity) {
  if (isIosAppShell()) {
    if (velocity > 0.55) return { instant: true, duration: 0 };
    return { instant: false, duration: velocity > 0.95 ? 0.42 : 0.62 };
  }
  if (velocity > 3) return { instant: true, duration: 0 };
  if (velocity > 1.6) return { instant: false, duration: 1.05 };
  return { instant: false, duration: 1.45 };
}

/**
 * Dvě fixed vrstvy + crossfade — stejný princip jako homepage proofs.
 */
export function createBgCrossfadeController(bgA, bgB) {
  const activeIsA = { current: true };
  const currentBg = { current: null };
  const scrollSample = { y: 0, t: performance.now() };

  const setBgInstant = (newBg, chromeTop, chromeBottom = chromeTop) => {
    currentBg.current = newBg;
    commitChrome(chromeTop, chromeBottom);
    gsap.killTweensOf([bgA, bgB]);
    activeIsA.current = true;
    gsap.set(bgA, { background: newBg, opacity: 1 });
    gsap.set(bgB, { opacity: 0 });
  };

  const crossfadeBg = (newBg, chromeTop, chromeBottom = chromeTop) => {
    if (!bgA || !bgB) return;

    const velocity = getScrollVelocity(scrollSample);
    const { instant, duration } = getCrossfadePlan(velocity);
    const bgChanged = currentBg.current !== newBg;
    const ios = isIosAppShell();
    currentBg.current = newBg;

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

  const init = (initialBg, chromeTop, chromeBottom = chromeTop) => {
    if (!bgA || !bgB) return;
    currentBg.current = initialBg;
    gsap.set(bgA, { background: initialBg, opacity: 1 });
    gsap.set(bgB, { background: initialBg, opacity: 0 });
    commitChrome(chromeTop, chromeBottom);
  };

  const kill = () => {
    gsap.killTweensOf([bgA, bgB]);
  };

  return { crossfadeBg, setBgInstant, init, kill, currentBg };
}

export function bgColorsEqual(a, b) {
  return a?.bg === b?.bg;
}

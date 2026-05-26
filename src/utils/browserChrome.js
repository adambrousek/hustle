import gsap from 'gsap';
import { isIosAppShell } from './iosAppShell';

let currentChromeTop = '#F01818';
let currentChromeBottom = '#CD0010';
let colorTween = null;

function applyChromeColors(chromeTop, chromeBottom) {
  document.documentElement.style.setProperty('--chrome-edge-top', chromeTop);

  if (isIosAppShell()) {
    document.documentElement.style.setProperty('--shell-chrome-color', chromeTop);
    document.documentElement.style.setProperty('--chrome-edge-bottom', chromeTop);
  } else {
    document.documentElement.style.setProperty('--chrome-edge-bottom', chromeBottom);
  }

  document.documentElement.style.backgroundColor = chromeTop;
  document.body.style.backgroundColor = chromeTop;

  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = chromeTop;
  currentChromeTop = chromeTop;
  currentChromeBottom = isIosAppShell() ? chromeTop : chromeBottom;
}

/** Instant sync (refresh / snap). */
export function syncPageBackground(_gradientBg, chromeTop, chromeBottom = chromeTop) {
  if (colorTween) {
    colorTween.kill();
    colorTween = null;
  }
  if (chromeTop === currentChromeTop && chromeBottom === currentChromeBottom) return;
  applyChromeColors(chromeTop, chromeBottom);
}

/** Tween chrome with bg crossfade so the bottom band does not snap ahead of the gradient. */
export function transitionPageBackground(_gradientBg, chromeTop, chromeBottom = chromeTop, duration = 1) {
  const targetBottom = isIosAppShell() ? chromeTop : chromeBottom;
  if (chromeTop === currentChromeTop && targetBottom === currentChromeBottom) return;

  if (colorTween) {
    colorTween.kill();
    colorTween = null;
  }

  const fromTop = currentChromeTop;
  const fromBottom = currentChromeBottom;
  const progress = { value: 0 };

  colorTween = gsap.to(progress, {
    value: 1,
    duration,
    ease: 'power2.inOut',
    overwrite: true,
    onUpdate: () => {
      const t = progress.value;
      const top = gsap.utils.interpolate(fromTop, chromeTop, t);
      const bottom = gsap.utils.interpolate(fromBottom, targetBottom, t);
      applyChromeColors(top, bottom);
    },
    onComplete: () => {
      applyChromeColors(chromeTop, chromeBottom);
      colorTween = null;
    },
  });
}

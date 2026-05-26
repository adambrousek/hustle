import gsap from 'gsap';
import { isIosAppShell } from './iosAppShell';

let currentChromeTop = '#F01818';
let currentChromeBottom = '#CD0010';
let colorTween = null;

let blendFromTop = '#F01818';
let blendFromBottom = '#CD0010';
let blendToTop = '#F01818';
let blendToBottom = '#CD0010';

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

function killChromeTween() {
  if (colorTween) {
    colorTween.kill();
    colorTween = null;
  }
}

/** Start of bg crossfade — chrome will follow layer opacity (0–1). */
export function startChromeBlend(chromeTop, chromeBottom = chromeTop) {
  killChromeTween();
  blendFromTop = currentChromeTop;
  blendFromBottom = currentChromeBottom;
  blendToTop = chromeTop;
  blendToBottom = isIosAppShell() ? chromeTop : chromeBottom;
}

/** Step chrome to match visible bg crossfade (t = incoming layer opacity). */
export function applyChromeBlend(progress) {
  const t = Math.max(0, Math.min(1, progress));
  applyChromeColors(
    gsap.utils.interpolate(blendFromTop, blendToTop, t),
    gsap.utils.interpolate(blendFromBottom, blendToBottom, t),
  );
}

export function commitChrome(chromeTop, chromeBottom = chromeTop) {
  killChromeTween();
  applyChromeColors(chromeTop, chromeBottom);
}

/** Instant sync (refresh / snap). */
export function syncPageBackground(_gradientBg, chromeTop, chromeBottom = chromeTop) {
  killChromeTween();
  if (chromeTop === currentChromeTop && chromeBottom === currentChromeBottom) return;
  applyChromeColors(chromeTop, chromeBottom);
}

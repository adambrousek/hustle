import { isIosAppShell } from './iosAppShell';

let currentChromeTop = '#F01818';
let currentChromeBottom = '#CD0010';

function applyChromeColors(chromeTop, chromeBottom) {
  document.documentElement.style.setProperty('--chrome-edge-top', chromeTop);
  document.documentElement.style.setProperty('--chrome-edge-bottom', chromeBottom);

  if (isIosAppShell()) {
    document.documentElement.style.setProperty('--shell-chrome-color', chromeTop);
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
  currentChromeBottom = chromeBottom;
}

/** Instant sync on section change (bg crossfade stays on layers). */
export function syncPageBackground(_gradientBg, chromeTop, chromeBottom = chromeTop) {
  if (chromeTop === currentChromeTop && chromeBottom === currentChromeBottom) return;
  applyChromeColors(chromeTop, chromeBottom);
}

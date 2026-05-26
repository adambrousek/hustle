import gsap from 'gsap';

let currentThemeColor = '#F01818';
let colorTween = null;

function applyThemeColor(themeColor) {
  document.documentElement.style.backgroundColor = themeColor;
  document.body.style.backgroundColor = themeColor;

  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = themeColor;
  currentThemeColor = themeColor;
}

/** Instant sync (refresh / initial load). */
export function syncPageBackground(_gradientBg, themeColor) {
  if (colorTween) {
    colorTween.kill();
    colorTween = null;
  }
  applyThemeColor(themeColor);
}

/** Smooth chrome color transition synced with bg crossfade. */
export function transitionPageBackground(_gradientBg, themeColor, duration = 1) {
  if (themeColor === currentThemeColor) return;

  if (colorTween) {
    colorTween.kill();
    colorTween = null;
  }

  const fromColor = currentThemeColor;
  const progress = { value: 0 };

  colorTween = gsap.to(progress, {
    value: 1,
    duration,
    ease: 'power2.inOut',
    overwrite: true,
    onUpdate: () => {
      applyThemeColor(gsap.utils.interpolate(fromColor, themeColor, progress.value));
    },
    onComplete: () => {
      applyThemeColor(themeColor);
      colorTween = null;
    },
  });
}

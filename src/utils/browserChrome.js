/** Sync html/body + Safari/macOS theme-color with active slide background. */
export function syncPageBackground(gradientBg, themeColor) {
  const root = document.documentElement;
  root.style.backgroundColor = themeColor;
  // Avoid repaint seams/jank on fast scroll: keep gradients in fixed layers,
  // and only sync a solid color for browser chrome + page fallback.
  root.style.backgroundImage = 'none';
  root.style.backgroundAttachment = '';
  root.style.backgroundSize = '';

  document.body.style.backgroundColor = themeColor;
  document.body.style.backgroundImage = 'none';
  document.body.style.backgroundAttachment = '';
  document.body.style.backgroundSize = '';

  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = themeColor;
}

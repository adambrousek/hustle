/** Sync html/body + Safari/macOS theme-color with active slide background. */
export function syncPageBackground(gradientBg, themeColor) {
  const root = document.documentElement;
  root.style.backgroundColor = themeColor;
  root.style.backgroundImage = gradientBg;
  root.style.backgroundAttachment = 'fixed';
  root.style.backgroundSize = 'cover';

  document.body.style.backgroundColor = themeColor;
  document.body.style.backgroundImage = gradientBg;
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundSize = 'cover';

  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = themeColor;
}

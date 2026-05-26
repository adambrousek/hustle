function isDesktopSafari() {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR|CriOS|FxiOS/i.test(ua);
  const isAppleWebKit = /AppleWebKit/i.test(ua);
  const isMobile = /iPhone|iPad|iPod/i.test(ua);
  return isSafari && isAppleWebKit && !isMobile;
}

export function syncDesktopSafariClass() {
  document.documentElement.classList.toggle('desktop-safari', isDesktopSafari());
}

export function initDesktopSafari() {
  syncDesktopSafariClass();
}


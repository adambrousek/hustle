function isDesktopSafari() {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  const vendor = navigator.vendor || '';
  const isAppleVendor = /Apple/i.test(vendor);
  const isSafari =
    /Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR|CriOS|FxiOS/i.test(ua);
  const isMobile = /iPhone|iPad|iPod/i.test(ua);
  return isAppleVendor && isSafari && !isMobile;
}

export function syncDesktopSafariClass() {
  document.documentElement.classList.toggle('desktop-safari', isDesktopSafari());
}

export function initDesktopSafari() {
  syncDesktopSafariClass();
}


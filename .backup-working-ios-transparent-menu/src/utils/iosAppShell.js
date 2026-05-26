const IOS_UA = /iPhone|iPad|iPod/i;
const MOBILE_MQ = '(max-width: 900px)';

export function isIosAppShell() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia(MOBILE_MQ).matches && IOS_UA.test(navigator.userAgent)
  );
}

export function syncIosAppShellClass() {
  document.documentElement.classList.toggle('ios-app-shell', isIosAppShell());
}

export function initIosAppShell() {
  syncIosAppShellClass();
  const mq = window.matchMedia(MOBILE_MQ);
  mq.addEventListener('change', syncIosAppShellClass);
  return () => mq.removeEventListener('change', syncIosAppShellClass);
}

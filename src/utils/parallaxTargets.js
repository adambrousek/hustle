/** Najde textový a vizuální uzel pro scroll parallax v sekci. */
export function getParallaxBeat(section) {
  if (!section) return null;

  return {
    section,
    content:
      section.querySelector('.pilulka-chapter__text') ||
      section.querySelector('.pilulka-chapter__hero-aside') ||
      section.querySelector('.pilulka-chapter__split-body') ||
      section.querySelector('.pilulka-chapter__overlay-side') ||
      section.querySelector('.pilulka-chapter__intro-body') ||
      section.querySelector('.manifest-contact__content') ||
      section.querySelector('.pilulka-cta-contact__text'),
    visual:
      section.querySelector('.proof-visual') ||
      section.querySelector('.manifest-contact-visual'),
  };
}

export function mergeSectionRefs(...refs) {
  return (el) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(el);
      else ref.current = el;
    });
  };
}

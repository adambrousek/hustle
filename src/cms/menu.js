export function getPageHref(page) {
  if (page.kind === 'legacy' && page.route) return page.route;
  if (page.slug) return `/p/${page.slug}`;
  return '/';
}

export function buildMenuItems(pages = []) {
  return pages
    .filter((page) => page.menuLabel?.trim() && page.status === 'published')
    .sort((a, b) => {
      const orderDiff = (a.menuOrder ?? 100) - (b.menuOrder ?? 100);
      if (orderDiff !== 0) return orderDiff;
      return a.menuLabel.localeCompare(b.menuLabel, 'cs');
    })
    .map((page) => ({
      id: page.id,
      label: page.menuLabel.trim().toUpperCase(),
      href: getPageHref(page),
    }));
}

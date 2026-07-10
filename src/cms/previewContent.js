function toPlaceholder(item, index) {
  return {
    placeholder: true,
    className: item.className ?? `proof-img--${['a', 'b', 'c'][index % 3]}`,
  };
}

/**
 * Pro náhledy v adminu — videa nahradí statickými placeholdery.
 */
export function sanitizePreviewContent(content = {}) {
  const next = structuredClone(content);

  if (Array.isArray(next.media)) {
    next.media = next.media.map((item, index) =>
      item?.type === 'video' ? toPlaceholder(item, index) : item,
    );
  }

  if (next.map?.embedUrl) {
    next.map = { ...next.map, placeholder: true };
  }

  return next;
}

export const HEADLINE_INDENT_PRESETS = [
  { id: 'stagger', label: 'Schodový', pattern: ['0', '6vw', '12vw'] },
  { id: 'cascade', label: 'Kaskáda', pattern: ['0', '8vw', '3vw'] },
  { id: 'spread', label: 'Roztažený', pattern: ['0', '4vw', '9vw', '2vw'] },
];

export const DEFAULT_HEADLINE_INDENT = 'stagger';

export function lineIndentsFromPreset(presetId, lineCount) {
  const preset =
    HEADLINE_INDENT_PRESETS.find((item) => item.id === presetId) ??
    HEADLINE_INDENT_PRESETS[0];
  const pattern = preset.pattern;

  return Array.from({ length: Math.max(lineCount, 1) }, (_, index) => pattern[index % pattern.length]);
}

export function detectHeadlineIndentPreset(lineIndents = []) {
  if (!lineIndents.length) return null;

  for (const preset of HEADLINE_INDENT_PRESETS) {
    const matches = lineIndents.every(
      (indent, index) => indent === preset.pattern[index % preset.pattern.length],
    );
    if (matches) return preset.id;
  }

  return null;
}

export function resolveHeadlineIndents(headline, settings = {}) {
  if (!headline?.lines?.length) return headline;
  if (headline.uniform) return headline;

  const presetId = settings.headlineIndent;
  if (!presetId) {
    const existing = headline.lineIndents ?? [];
    return {
      ...headline,
      lineIndents: headline.lines.map((_, index) => existing[index] ?? '0'),
    };
  }

  return {
    ...headline,
    lineIndents: lineIndentsFromPreset(presetId, headline.lines.length),
  };
}

export function supportsHeadlineIndent(block) {
  const type = block?.type;
  const content = block?.content ?? {};

  if (type === 'intro' || type === 'zigzag') {
    return !content.headline?.uniform;
  }

  if (type === 'key-learnings' || type === 'key-learnings-six') {
    return !content.title?.uniform;
  }

  if (type === 'cta') {
    const layout = block?.settings?.layout ?? content.layout ?? 'sticky';
    if (layout === 'contact-page') {
      return typeof content.headline === 'object' && Boolean(content.headline?.lines?.length);
    }
    return false;
  }

  return false;
}

export function activeHeadlineIndent(block) {
  const settings = block?.settings ?? {};
  if (settings.headlineIndent) return settings.headlineIndent;

  const content = block?.content ?? {};
  const headline = content.headline ?? content.title;
  if (headline?.uniform) return null;

  return detectHeadlineIndentPreset(headline?.lineIndents) ?? DEFAULT_HEADLINE_INDENT;
}

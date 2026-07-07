import { PROOFS } from './proofs';

const DEFAULT_ROLES = {
  cs: ['Strategy', 'Content system', 'Creative direction', 'Production', 'Community', 'Reporting'],
  pilulka: ['Strategy', 'Content system', 'Creative direction', 'Product placement', 'Reporting'],
  sportisimo: ['Strategy', 'Interim management', 'Creative direction', 'Production', 'Reporting'],
  kitkat: ['Strategy', 'Local adaptation', 'Creative direction', 'Production', 'Community'],
  dofe: ['Strategy', 'Campaign', 'Creative direction', 'Workshops', 'Ambassador program'],
};

function firstStatement(sections) {
  return sections.find((s) => s.type === 'statement');
}

function secondStatement(sections) {
  return sections.filter((s) => s.type === 'statement')[1];
}

function pickBody(section, index = 0) {
  if (!section?.body) return '';
  const lines = Array.isArray(section.body) ? section.body : [section.body];
  return lines[index] ?? lines.join(' ');
}

function buildStoryBeats(study, sections, proof) {
  const beats = [];
  const used = new Set(['statement-0', 'statement-1']);
  const statements = sections.filter((s) => s.type === 'statement');

  statements.forEach((section, index) => {
    if (index < 2) return;
    beats.push({
      id: `statement-${index}`,
      headlineLines: section.headingLines,
      body: pickBody(section),
      bullets: section.bullets,
      images: proof?.images?.slice(0, 2),
      stat: section.impact ? section.headlineLines?.[0]?.text : null,
    });
  });

  const framework = sections.find((s) => s.type === 'framework');
  if (framework?.columns) {
    framework.columns.forEach((col, i) => {
      beats.push({
        id: `framework-${i}`,
        headlineLines: [{ text: col.title, indent: `${i * 5}vw` }],
        body: col.body,
        images: proof?.images?.slice(i, i + 2),
      });
    });
  }

  if (beats.length === 0 && proof?.images?.length) {
    beats.push({
      id: 'story-fallback',
      headlineLines: study.headlineLines?.slice(0, 2) ?? [{ text: study.brand, indent: '0' }],
      body: study.perex,
      images: proof.images,
    });
  }

  return beats.slice(0, 5);
}

export function buildCaseFilm(study) {
  const proof = PROOFS.find((p) => p.id === study.slug);
  const sections = study.sections ?? [];
  const problemSection = firstStatement(sections);
  const shiftSection = sections.find((s) => s.type === 'beforeAfter') ?? secondStatement(sections);
  const stack = sections.find((s) => s.type === 'stack');
  const impact = sections.find((s) => s.type === 'proofGrid');

  const proofItems =
    impact?.items ??
    (study.proofBar ?? []).map((item) =>
      typeof item === 'string'
        ? { text: item }
        : { value: item.label, label: item.text },
    );

  const workImages = proof?.images ?? [];
  const gallery = study.gallery ?? [];

  return {
    ...study,
    label: study.label ?? 'CASE STUDY',
    film: {
      problem: {
        headlineLines: problemSection?.headingLines ?? [{ text: 'Problém', indent: '0' }],
        body: pickBody(problemSection),
        support: problemSection?.body?.[1] ?? '',
      },
      shift: shiftSection?.type === 'beforeAfter'
        ? {
            type: 'beforeAfter',
            headlineLines: shiftSection.headingLines,
            before: shiftSection.before,
            after: shiftSection.after,
          }
        : {
            type: 'statement',
            headlineLines: shiftSection?.headingLines ?? [{ text: 'Strategický posun', indent: '0' }],
            body: pickBody(shiftSection),
            support: shiftSection?.body?.[1] ?? '',
          },
      story: buildStoryBeats(study, sections, proof),
      system: {
        headlineLines: stack?.headingLines ?? [{ text: 'Systém', indent: '0' }],
        items: (stack?.items ?? []).slice(0, 4),
      },
      work: {
        images: workImages,
        gallery,
      },
      impact: {
        headlineLines: impact?.headingLines ?? [{ text: 'Dopad', indent: '0' }],
        items: proofItems,
      },
      role: study.role ?? DEFAULT_ROLES[study.slug] ?? ['Strategy', 'Content', 'Production'],
    },
  };
}

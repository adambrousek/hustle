import { pathToFileURL } from 'node:url';
import {
  listPages,
  createPage,
  getSettings,
  saveSettings,
  writePages,
  listLibrarySections,
  writeLibrarySections,
} from './db.js';
import { CATALOG_VARIANTS, CATALOG_LIBRARY_IDS } from '../src/design-system/caseStudy/demo/catalogVariants.js';

function blockNeedsContent(block) {
  const content = block.content;
  if (!content) return true;
  return Object.keys(content).length === 0;
}

export async function migratePageBlockContent() {
  const [pages, library] = await Promise.all([listPages(), listLibrarySections()]);
  const libraryMap = Object.fromEntries(library.map((s) => [s.id, s]));
  let changed = false;

  const next = pages.map((page) => {
    if (page.kind === 'legacy' || !page.blocks?.length) return page;

    let pageChanged = false;
    const blocks = page.blocks.map((block) => {
      if (!blockNeedsContent(block)) return block;
      const lib = block.librarySectionId ? libraryMap[block.librarySectionId] : null;
      if (!lib?.content) return block;

      pageChanged = true;
      changed = true;
      return { ...block, content: structuredClone(lib.content) };
    });

    return pageChanged ? { ...page, blocks } : page;
  });

  if (changed) {
    await writePages(next);
  }

  return changed;
}

const LEGACY_VARIANT_BY_NAME = {
  'Intro (Pilulka)': 'intro',
  'Intro + Aside Proofs': 'intro-aside-proofs',
  'Zigzag Chapter': 'zigzag-chapter',
  'Zigzag (Flip)': 'zigzag-chapter-flip',
  'Zigzag + Shift': 'zigzag-chapter-shift',
  'Zigzag + Stat Proof': 'zigzag-body-proofs-stat',
  'Key Learnings (4)': 'key-learnings',
  'Key Learnings (6)': 'key-learnings-six',
};

export async function syncLibraryCatalog() {
  const library = await listLibrarySections();
  const catalogByVariantId = Object.fromEntries(
    CATALOG_VARIANTS.map((v) => [v.variantId, v]),
  );
  let changed = false;
  const next = [...library];

  for (let i = 0; i < next.length; i += 1) {
    const item = next[i];
    if (item.settings?.variantId) continue;

    const variantId =
      LEGACY_VARIANT_BY_NAME[item.name] ??
      Object.entries(CATALOG_LIBRARY_IDS).find(([, id]) => id === item.id)?.[0];

    if (!variantId) continue;

    next[i] = {
      ...item,
      settings: { ...item.settings, variantId },
      updatedAt: new Date().toISOString(),
    };
    changed = true;
  }

  const existingVariantIds = new Set(
    next.map((item) => item.settings?.variantId).filter(Boolean),
  );
  const existingIds = new Set(next.map((item) => item.id));
  const now = new Date().toISOString();

  for (const variant of CATALOG_VARIANTS) {
    if (existingVariantIds.has(variant.variantId)) continue;

    if (existingIds.has(variant.id)) {
      const index = next.findIndex((item) => item.id === variant.id);
      if (index !== -1) {
        next[index] = {
          ...next[index],
          name: next[index].name ?? variant.name,
          type: variant.type,
          content: next[index].content ?? variant.content,
          settings: { ...variant.settings, ...next[index].settings, variantId: variant.variantId },
          updatedAt: now,
        };
        changed = true;
        existingVariantIds.add(variant.variantId);
      }
      continue;
    }

    next.push({
      id: variant.id,
      name: variant.name,
      type: variant.type,
      content: structuredClone(variant.content),
      settings: structuredClone(variant.settings),
      createdAt: now,
      updatedAt: now,
    });
    changed = true;
    existingVariantIds.add(variant.variantId);
    existingIds.add(variant.id);
  }

  if (changed) {
    await writeLibrarySections(next);
  }

  return changed;
}

const LEGACY_PAGES = [
  {
    id: 'legacy-home',
    kind: 'legacy',
    title: 'Homepage',
    route: '/',
    slug: '',
    status: 'published',
    blocks: [],
  },
  {
    id: 'legacy-portfolio',
    kind: 'legacy',
    title: 'Portfolio',
    route: '/portfolio',
    slug: '',
    status: 'published',
    blocks: [],
  },
  {
    id: 'legacy-kontakt',
    kind: 'legacy',
    title: 'Kontakt',
    route: '/kontakt',
    slug: '',
    status: 'published',
    blocks: [],
  },
  {
    id: 'legacy-design-system',
    kind: 'legacy',
    title: 'Design System',
    route: '/homepage',
    slug: '',
    status: 'published',
    blocks: [],
  },
];

export async function ensureLegacyPages() {
  await migratePageBlockContent();
  await syncLibraryCatalog();

  const pages = await listPages();
  const existingIds = new Set(pages.map((p) => p.id));
  const now = new Date().toISOString();
  let changed = false;

  for (const legacy of LEGACY_PAGES) {
    if (existingIds.has(legacy.id)) continue;
    await createPage({ ...legacy, createdAt: now, updatedAt: now });
    changed = true;
  }

  const settings = await getSettings();
  if (!settings.homepagePageId) {
    await saveSettings({ ...settings, homepagePageId: 'legacy-home' });
    changed = true;
  }

  const refreshed = await listPages();
  const withKind = refreshed.map((page) => {
    if (page.kind) return page;
    return { ...page, kind: 'cms' };
  });

  if (withKind.some((p, i) => p.kind !== refreshed[i]?.kind)) {
    await writePages(withKind);
    changed = true;
  }

  return changed;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  ensureLegacyPages()
    .then((changed) => {
      console.log(changed ? 'Legacy pages migrated.' : 'Legacy pages already present.');
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

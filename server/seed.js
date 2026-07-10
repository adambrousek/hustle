import { pathToFileURL } from 'node:url';
import { CATALOG_VARIANTS } from '../src/design-system/caseStudy/demo/catalogVariants.js';
import { listLibrarySections, listPages, createLibrarySection, createPage } from './db.js';

const IDS = {
  demoPage: 'b2000000-0000-4000-8000-000000000001',
};

const PILULKA_BG = {
  bg: '#006858',
  themeColor: '#006858',
  chromeBottom: '#003830',
};

const CS_BG = {
  bg: '#1868F0',
  themeColor: '#1868F0',
  chromeBottom: '#0E48B8',
};

const SPORTISIMO_BG = {
  bg: '#0058B0',
  themeColor: '#0058B0',
  chromeBottom: '#002858',
};

const SEED_PAGE = {
  id: IDS.demoPage,
  kind: 'cms',
  slug: 'demo',
  title: 'Demo stránka',
  status: 'published',
  blocks: [
    { id: 'block-1', librarySectionId: CATALOG_VARIANTS[0].id, type: 'intro', settings: PILULKA_BG },
    { id: 'block-2', librarySectionId: CATALOG_VARIANTS[3].id, type: 'zigzag', settings: CS_BG },
    {
      id: 'block-3',
      librarySectionId: CATALOG_VARIANTS[4].id,
      type: 'zigzag',
      settings: { ...SPORTISIMO_BG, stackLayout: 'fan' },
    },
    {
      id: 'block-4',
      librarySectionId: CATALOG_VARIANTS.find((v) => v.variantId === 'key-learnings').id,
      type: 'key-learnings',
      settings: PILULKA_BG,
    },
    { id: 'block-5', type: 'cta', content: {}, settings: {} },
  ],
};

export async function seedIfEmpty() {
  const [library, pages] = await Promise.all([listLibrarySections(), listPages()]);
  if (library.length > 0 || pages.length > 0) return false;

  const now = new Date().toISOString();

  for (const variant of CATALOG_VARIANTS) {
    await createLibrarySection({
      id: variant.id,
      name: variant.name,
      type: variant.type,
      content: variant.content,
      settings: variant.settings,
      createdAt: now,
      updatedAt: now,
    });
  }

  await createPage({
    ...SEED_PAGE,
    createdAt: now,
    updatedAt: now,
  });

  return true;
}

async function runCli() {
  const seeded = await seedIfEmpty();
  if (seeded) {
    console.log('CMS seed: library + demo page (/p/demo) created.');
  } else {
    console.log('CMS seed: data already exists, skipped.');
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CMS_DIR = path.join(__dirname, '../data/cms');
const LIBRARY_FILE = path.join(CMS_DIR, 'library.json');
const PAGES_FILE = path.join(CMS_DIR, 'pages.json');
const SETTINGS_FILE = path.join(CMS_DIR, 'settings.json');

async function ensureStore() {
  await fs.mkdir(CMS_DIR, { recursive: true });
  for (const file of [LIBRARY_FILE, PAGES_FILE]) {
    try {
      await fs.access(file);
    } catch {
      await fs.writeFile(file, '[]', 'utf8');
    }
  }
  try {
    await fs.access(SETTINGS_FILE);
  } catch {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify({ homepagePageId: null }, null, 2), 'utf8');
  }
}

async function readJson(file) {
  await ensureStore();
  const raw = await fs.readFile(file, 'utf8');
  return JSON.parse(raw || '[]');
}

async function writeJson(file, data) {
  await ensureStore();
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
}

export async function listLibrarySections() {
  return readJson(LIBRARY_FILE);
}

export async function writeLibrarySections(sections) {
  await writeJson(LIBRARY_FILE, sections);
}

export async function getLibrarySection(id) {
  const sections = await listLibrarySections();
  return sections.find((s) => s.id === id) ?? null;
}

export async function createLibrarySection(payload) {
  const sections = await listLibrarySections();
  const now = new Date().toISOString();
  const section = {
    id: payload.id ?? randomUUID(),
    name: payload.name,
    type: payload.type,
    content: payload.content ?? {},
    settings: payload.settings ?? {},
    createdAt: now,
    updatedAt: now,
  };
  sections.push(section);
  await writeJson(LIBRARY_FILE, sections);
  return section;
}

export async function updateLibrarySection(id, payload) {
  const sections = await listLibrarySections();
  const index = sections.findIndex((s) => s.id === id);
  if (index === -1) return null;

  sections[index] = {
    ...sections[index],
    ...payload,
    id,
    updatedAt: new Date().toISOString(),
  };
  await writeJson(LIBRARY_FILE, sections);
  return sections[index];
}

export async function deleteLibrarySection(id) {
  const sections = await listLibrarySections();
  const next = sections.filter((s) => s.id !== id);
  if (next.length === sections.length) return false;
  await writeJson(LIBRARY_FILE, next);
  return true;
}

export async function listPages() {
  return readJson(PAGES_FILE);
}

export async function writePages(pages) {
  await writeJson(PAGES_FILE, pages);
}

export async function getSettings() {
  await ensureStore();
  const raw = await fs.readFile(SETTINGS_FILE, 'utf8');
  return JSON.parse(raw || '{}');
}

export async function saveSettings(settings) {
  await writeJson(SETTINGS_FILE, settings);
}

export async function setHomepagePageId(pageId) {
  const settings = await getSettings();
  const next = { ...settings, homepagePageId: pageId };
  await saveSettings(next);
  return next;
}

export async function getHomepagePage() {
  const settings = await getSettings();
  if (!settings.homepagePageId) return null;
  return getPage(settings.homepagePageId);
}

export async function getPage(id) {
  const pages = await listPages();
  return pages.find((p) => p.id === id) ?? null;
}

export async function getPageBySlug(slug) {
  const pages = await listPages();
  return pages.find((p) => p.slug === slug) ?? null;
}

export async function createPage(payload) {
  const pages = await listPages();
  const now = new Date().toISOString();
  const page = {
    id: payload.id ?? randomUUID(),
    kind: payload.kind ?? 'cms',
    slug: payload.slug ?? '',
    route: payload.route ?? null,
    title: payload.title,
    menuLabel: payload.menuLabel ?? '',
    menuOrder: payload.menuOrder ?? 100,
    status: payload.status ?? 'draft',
    blocks: payload.blocks ?? [],
    createdAt: payload.createdAt ?? now,
    updatedAt: now,
  };
  pages.push(page);
  await writeJson(PAGES_FILE, pages);
  return page;
}

export async function updatePage(id, payload) {
  const pages = await listPages();
  const index = pages.findIndex((p) => p.id === id);
  if (index === -1) return null;

  pages[index] = {
    ...pages[index],
    ...payload,
    id,
    updatedAt: new Date().toISOString(),
  };
  await writeJson(PAGES_FILE, pages);
  return pages[index];
}

export async function deletePage(id) {
  const pages = await listPages();
  const next = pages.filter((p) => p.id !== id);
  if (next.length === pages.length) return false;
  await writeJson(PAGES_FILE, next);
  return true;
}

export async function getResolvedPage(slug) {
  const page = await getPageBySlug(slug);
  if (!page || page.kind === 'legacy') return null;

  const library = await listLibrarySections();
  const libraryMap = Object.fromEntries(library.map((s) => [s.id, s]));

  const blocks = page.blocks.map((block) => {
    const librarySection = block.librarySectionId
      ? libraryMap[block.librarySectionId]
      : null;

    return {
      ...block,
      type: block.type ?? librarySection?.type,
      content: block.content ?? {},
      settings: block.settings ?? {},
      templateName: librarySection?.name ?? null,
    };
  });

  return { ...page, blocks };
}

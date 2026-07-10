#!/usr/bin/env node
/**
 * Crawl hustle.cz and export URL inventory + HTML snapshots for migration.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'https://www.hustle.cz';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'migration');
const MAX_PAGES = 120;

const SEED_PATHS = [
  '/',
  '/blog',
  '/kontakt',
  '/studio',
  '/kariera',
  '/podminky-zpracovani-udaju',
  '/case-study/udelali-jsme-ze-sporky-lovebrand',
  '/case-study/pomahame-dofe-rust-mimo-elitni-skoly',
  '/case-study/naucili-jsme-gen-z-sporit-na-duchod',
  // discovered via search / external links
  '/projects/sporka-na-tiktoku',
  '/projects/generovani-leadu-pro-penzijko',
  '/projekt/nejuspesnejsi-bankovni-tiktok',
];

function normalizePath(href) {
  if (!href) return null;
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return null;
  if (href.startsWith('http')) {
    try {
      const url = new URL(href);
      if (!url.hostname.replace(/^www\./, '').endsWith('hustle.cz')) return null;
      href = url.pathname + url.search;
    } catch {
      return null;
    }
  }
  if (!href.startsWith('/')) return null;
  const path = href.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  return path;
}

function extractLinks(html) {
  const links = new Set();
  const re = /href="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const p = normalizePath(m[1]);
    if (p) links.add(p);
  }
  return [...links];
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : '';
}

function extractMetaDescription(html) {
  const m = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  return m ? m[1].trim() : '';
}

function extractArticleBody(html) {
  const rich = html.match(/<div[^>]+class="[^"]*rich-text[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (!rich) return '';
  return rich[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2000);
}

function extractH1(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return '';
  return m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugFromPath(path) {
  if (path === '/') return 'home';
  return path.slice(1).replace(/\//g, '__');
}

function suggestRedirect(path) {
  if (path === '/blog') return '/novinky';
  if (path.startsWith('/post/')) return `/novinky${path.slice('/post'.length)}`;
  if (path === '/kontakt') return '/kontakt';
  if (path === '/studio') return '/studio';
  if (path === '/kariera') return '/kariera';
  if (path === '/podminky-zpracovani-udaju') return '/podminky';
  if (path === '/case-study/udelali-jsme-ze-sporky-lovebrand') return '/portfolio/case/cs';
  if (path === '/case-study/pomahame-dofe-rust-mimo-elitni-skoly') return '/portfolio/case/dofe';
  if (path === '/case-study/naucili-jsme-gen-z-sporit-na-duchod') return '/portfolio';
  if (path.startsWith('/case-study/')) return '/portfolio';
  if (path.startsWith('/projects/')) return '/portfolio';
  if (path.startsWith('/projekt/')) return '/portfolio';
  if (path === '/old-home') return '/';
  return path === '/' ? '/' : null;
}

async function fetchPage(path) {
  const url = BASE + path;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'HustleMigrationCrawler/1.0' },
    redirect: 'follow',
  });
  const html = await res.text();
  return { url, path, status: res.status, html, finalUrl: res.url };
}

async function main() {
  await mkdir(join(OUT, 'html'), { recursive: true });

  const queue = [...SEED_PATHS];
  const seen = new Set();
  const pages = [];

  while (queue.length > 0 && seen.size < MAX_PAGES) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);

    process.stdout.write(`Fetching ${path}...\n`);
    let data;
    try {
      data = await fetchPage(path);
    } catch (err) {
      pages.push({ path, error: String(err) });
      continue;
    }

    const title = extractTitle(data.html);
    const description = extractMetaDescription(data.html);
    const h1 = extractH1(data.html);
    const bodyPreview = extractArticleBody(data.html);
    const links = extractLinks(data.html);

    for (const link of links) {
      if (
        !seen.has(link) &&
        !queue.includes(link) &&
        (link.startsWith('/post/') ||
          link.startsWith('/case-study/') ||
          link.startsWith('/projects/') ||
          link.startsWith('/projekt/') ||
          ['/blog', '/studio', '/kariera', '/kontakt', '/podminky-zpracovani-udaju', '/'].includes(
            link,
          ))
      ) {
        queue.push(link);
      }
    }

    const slug = slugFromPath(path);
    await writeFile(join(OUT, 'html', `${slug}.html`), data.html, 'utf8');

    pages.push({
      path,
      status: data.status,
      title,
      h1,
      description,
      bodyPreview: bodyPreview || undefined,
      suggestedRedirect: suggestRedirect(path),
      outboundInternal: links.filter((l) => l !== path),
    });

    await new Promise((r) => setTimeout(r, 200));
  }

  const inventory = {
    crawledAt: new Date().toISOString(),
    base: BASE,
    totalPages: pages.length,
    pages: pages.sort((a, b) => a.path.localeCompare(b.path)),
    redirects: pages
      .filter((p) => p.suggestedRedirect && p.path !== p.suggestedRedirect)
      .map((p) => ({
        source: p.path,
        destination: p.suggestedRedirect,
        permanent: true,
        title: p.title,
      })),
    blogPosts: pages
      .filter((p) => p.path.startsWith('/post/'))
      .map((p) => ({
        slug: p.path.replace('/post/', ''),
        path: p.path,
        title: p.title || p.h1,
        newPath: `/novinky/${p.path.replace('/post/', '')}`,
      })),
    caseStudies: pages
      .filter((p) => p.path.startsWith('/case-study/'))
      .map((p) => ({
        slug: p.path.replace('/case-study/', ''),
        path: p.path,
        title: p.title || p.h1,
        suggestedRedirect: p.suggestedRedirect,
      })),
    projects: pages
      .filter((p) => p.path.startsWith('/projects/') || p.path.startsWith('/projekt/'))
      .map((p) => ({
        slug: p.path.split('/').pop(),
        path: p.path,
        title: p.title || p.h1,
        suggestedRedirect: p.suggestedRedirect,
      })),
  };

  await writeFile(join(OUT, 'url-inventory.json'), JSON.stringify(inventory, null, 2), 'utf8');

  const vercelRedirects = inventory.redirects.map((r) => ({
    source: r.source,
    destination: r.destination,
    permanent: true,
  }));

  await writeFile(
    join(OUT, 'vercel-redirects.json'),
    JSON.stringify({ redirects: vercelRedirects }, null, 2),
    'utf8',
  );

  console.log(`\nDone. ${pages.length} pages → data/migration/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

# Migrace z hustle.cz

Staženo crawlerem `scripts/crawl-hustle-cz.mjs` z live Webflow webu.

## Soubory

| Soubor | Obsah |
|--------|--------|
| `url-inventory.json` | Kompletní inventář URL, titulky, návrhy redirectů, preview textů |
| `vercel-redirects.json` | Hotový seznam pro `vercel.json` → `redirects` |
| `html/*.html` | Raw HTML snapshot každé stránky |

## Znovu stáhnout

```bash
node scripts/crawl-hustle-cz.mjs
```

## Nalezené stránky (19)

### Hlavní
- `/` — homepage
- `/kontakt`, `/studio`, `/kariera`
- `/podminky-zpracovani-udaju` → navržený redirect `/podminky`

### Blog → Novinky
- `/blog` → `/novinky`
- 7 článků `/post/:slug` → `/novinky/:slug`

### Case studies
| Stará URL | Navržený redirect |
|-----------|-------------------|
| `/case-study/udelali-jsme-ze-sporky-lovebrand` | `/portfolio/case/cs` |
| `/case-study/pomahame-dofe-rust-mimo-elitni-skoly` | `/portfolio/case/dofe` |
| `/case-study/naucili-jsme-gen-z-sporit-na-duchod` | `/portfolio` |

### Projekty (legacy)
| Stará URL | Navržený redirect |
|-----------|-------------------|
| `/projects/sporka-na-tiktoku` | `/portfolio` |
| `/projects/generovani-leadu-pro-penzijko` | `/portfolio` |
| `/projekt/nejuspesnejsi-bankovni-tiktok` | `/portfolio` |

## Poznámka

Webflow nemá veřejný sitemap. Crawler našel všechny stránky propojené z menu + homepage + blog.
Další `/projects/*` URL mohou existovat jen v Google indexu — doplnit z Search Console.

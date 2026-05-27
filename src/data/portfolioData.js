const IMG = '/extracted';

/** @typedef {'all' | 'case-study' | 'video' | 'campaign' | 'profile' | 'training'} PortfolioFilterId */

/**
 * @typedef {Object} PortfolioVideoItem
 * @property {string} id
 * @property {string} title
 * @property {string} brand
 * @property {string} type
 * @property {string} description
 * @property {PortfolioFilterId} category
 * @property {string} shelfId
 * @property {string} thumbnailUrl
 * @property {string} [vimeoId]
 * @property {string} [vimeoUrl]
 * @property {number} [year]
 * @property {boolean} [featured]
 * @property {string} [caseStudySlug]
 */

/**
 * @typedef {Object} FeaturedCaseStudy
 * @property {string} id
 * @property {string} slug
 * @property {string} brand
 * @property {string} claim
 * @property {string} workType
 * @property {string} thumbnailUrl
 * @property {string} accent
 */

export const PORTFOLIO_FILTERS = [
  { id: 'all', label: 'VŠE' },
  { id: 'case-study', label: 'CASE STUDIES' },
  { id: 'video', label: 'VIDEO' },
  { id: 'campaign', label: 'KAMPANĚ' },
  { id: 'profile', label: 'SPRÁVA PROFILŮ' },
  { id: 'training', label: 'ŠKOLENÍ' },
];

export const FEATURED_CASE_STUDIES = [
  {
    id: 'feat-cs',
    slug: 'cs',
    brand: 'Česká spořitelna',
    claim: 'Děláme profily, které patří mezi nejlepší v Česku.',
    workType: 'dlouhodobá správa',
    thumbnailUrl: `${IMG}/page-02-img-3.jpeg`,
    accent: '#1868F0',
  },
  {
    id: 'feat-pilulka',
    slug: 'pilulka',
    brand: 'Pilulka',
    claim: 'Přes social razíme nový směr.',
    workType: 'social repositioning',
    thumbnailUrl: `${IMG}/page-03-img-1.jpeg`,
    accent: '#006858',
  },
  {
    id: 'feat-sportisimo',
    slug: 'sportisimo',
    brand: 'Sportisimo',
    claim: 'Vracíme kanálům energii.',
    workType: 'social restart',
    thumbnailUrl: `${IMG}/page-04-img-0.jpeg`,
    accent: '#0058B0',
  },
  {
    id: 'feat-kitkat',
    slug: 'kitkat',
    brand: 'KitKat a Formula 1',
    claim: 'Necháváme značky spolu mluvit.',
    workType: 'kampaň a partnerství',
    thumbnailUrl: `${IMG}/page-05-img-0.jpeg`,
    accent: '#E81828',
  },
  {
    id: 'feat-partnership',
    slug: 'partnership',
    brand: 'Česká spořitelna × TV Nova',
    claim: 'Z partnerství děláme důvod sledovat.',
    workType: 'branded content',
    thumbnailUrl: `${IMG}/page-06-img-0.jpeg`,
    accent: '#1868F0',
  },
  {
    id: 'feat-dofe',
    slug: 'dofe',
    brand: 'DofE',
    claim: 'Učíme týmy tvořit obsah, který drží směr.',
    workType: 'školení a framework',
    thumbnailUrl: `${IMG}/page-07-img-0.jpeg`,
    accent: '#9C2088',
  },
];

export const VIDEO_SHELVES = [
  { id: 'outputs', title: 'Video výstupy' },
  { id: 'campaigns', title: 'Kampaně a partnerství' },
  { id: 'profiles', title: 'Profily, které spravujeme' },
  { id: 'training', title: 'Školení a frameworky' },
  { id: 'archive', title: 'Starší výstupy' },
];

/** Sample Vimeo IDs — replace with real IDs from your Vimeo library */
export const PORTFOLIO_VIDEOS = [
  {
    id: 'vid-cs-reels',
    title: 'Reels série',
    brand: 'Česká spořitelna',
    type: 'Reels série',
    description: 'Finanční témata převedená do lidského obsahu',
    category: 'video',
    shelfId: 'outputs',
    thumbnailUrl: `${IMG}/page-02-img-1.jpeg`,
    vimeoId: '',
    year: 2025,
    featured: true,
    caseStudySlug: 'cs',
  },
  {
    id: 'vid-pilulka-tt',
    title: 'TikTok video',
    brand: 'Pilulka',
    type: 'TikTok video',
    description: 'Longevity téma vysvětlené jednoduše a bez medicínského patosu',
    category: 'video',
    shelfId: 'outputs',
    thumbnailUrl: `${IMG}/page-03-img-2.jpeg`,
    vimeoId: '',
    year: 2025,
    caseStudySlug: 'pilulka',
  },
  {
    id: 'vid-sportisimo-reels',
    title: 'Reels formát',
    brand: 'Sportisimo',
    type: 'Reels formát',
    description: 'Sportovní emoce a důvody sledovat značku i mimo nákupní moment',
    category: 'video',
    shelfId: 'outputs',
    thumbnailUrl: `${IMG}/page-04-img-3.jpeg`,
    vimeoId: '',
    year: 2024,
    caseStudySlug: 'sportisimo',
  },
  {
    id: 'vid-kitkat-f1',
    title: 'Kampaň',
    brand: 'KitKat × F1',
    type: 'Kampaň',
    description: 'Lokální social moment propojující značky ve feedu',
    category: 'campaign',
    shelfId: 'campaigns',
    thumbnailUrl: `${IMG}/page-05-img-3.jpeg`,
    vimeoId: '',
    year: 2025,
    caseStudySlug: 'kitkat',
  },
  {
    id: 'vid-partnership',
    title: 'Branded content',
    brand: 'Česká spořitelna × TV Nova',
    type: 'Partnerství',
    description: 'Ambice Spořitelny dodávat lidem sebevědomí k podnikání',
    category: 'campaign',
    shelfId: 'campaigns',
    thumbnailUrl: `${IMG}/page-06-img-0.jpeg`,
    vimeoId: '',
    year: 2024,
    caseStudySlug: 'partnership',
  },
  {
    id: 'vid-cs-profile',
    title: 'Správa profilu',
    brand: 'Česká spořitelna',
    type: 'Správa profilu',
    description: 'Dlouhodobá strategie a obsah pro nejvýraznější bankovní profil v Česku',
    category: 'profile',
    shelfId: 'profiles',
    thumbnailUrl: `${IMG}/page-02-img-5.jpeg`,
    vimeoId: '',
    year: 2025,
    caseStudySlug: 'cs',
  },
  {
    id: 'vid-pilulka-profile',
    title: 'Social repositioning',
    brand: 'Pilulka',
    type: 'Repositioning',
    description: 'Nový směr značky přes social a komunitní témata',
    category: 'profile',
    shelfId: 'profiles',
    thumbnailUrl: `${IMG}/page-03-img-3.jpeg`,
    vimeoId: '',
    year: 2025,
    caseStudySlug: 'pilulka',
  },
  {
    id: 'vid-dofe-workshop',
    title: 'Workshop výstup',
    brand: 'DofE',
    type: 'Workshop výstup',
    description: 'Obsah, který můžou tvořit lidé nejblíž programu',
    category: 'training',
    shelfId: 'training',
    thumbnailUrl: `${IMG}/page-07-img-3.jpeg`,
    vimeoId: '',
    year: 2024,
    caseStudySlug: 'dofe',
  },
  {
    id: 'vid-archive-1',
    title: 'Starší formát',
    brand: 'Sportisimo',
    type: 'Formát',
    description: 'Energie kanálu a komunitní inspirace ve feedu',
    category: 'video',
    shelfId: 'archive',
    thumbnailUrl: `${IMG}/page-04-img-4.jpeg`,
    vimeoId: '',
    year: 2023,
  },
  {
    id: 'vid-archive-2',
    title: 'Adaptace kampaně',
    brand: 'KitKat',
    type: 'Adaptace',
    description: 'Lokální výstupy pro české publikum',
    category: 'campaign',
    shelfId: 'archive',
    thumbnailUrl: `${IMG}/page-05-img-4.jpeg`,
    vimeoId: '',
    year: 2023,
    caseStudySlug: 'kitkat',
  },
];

export function vimeoHoverSrc(vimeoId) {
  if (!vimeoId) return null;
  return `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&controls=0&playsinline=1`;
}

export function vimeoModalSrc(vimeoId) {
  if (!vimeoId) return null;
  return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
}

export function filterPortfolioVideos(videos, filterId) {
  if (filterId === 'all') return videos;
  if (filterId === 'case-study') {
    return videos.filter((v) => Boolean(v.caseStudySlug));
  }
  return videos.filter((v) => v.category === filterId);
}

export function getVideosByShelf(videos, shelfId) {
  return videos.filter((v) => v.shelfId === shelfId);
}

export function getCaseStudyBySlug(slug) {
  return FEATURED_CASE_STUDIES.find((c) => c.slug === slug) ?? null;
}

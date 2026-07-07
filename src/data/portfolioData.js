import { BG_SECTIONS, PROOFS } from './proofs';

const IMG = '/extracted';
const PILULKA_PORTFOLIO_THUMB = '/images/portfolio/pilulka-preview.png';
const PILULKA_PORTFOLIO_VIDEO = '/videos/pilulka-portfolio-hover.mp4';
const CS_PORTFOLIO_THUMB = '/images/portfolio/cs-preview.png';
const CS_PORTFOLIO_VIDEO = '/videos/cs-portfolio-hover.mp4';
const KITKAT_PORTFOLIO_THUMB = '/images/portfolio/kitkat-preview.png';
const KITKAT_PORTFOLIO_VIDEO = '/videos/kitkat-portfolio-hover.mp4';

function proofBrand(proof) {
  if (proof.logos?.length > 1) {
    return proof.logos.map((logo) => logo.alt).join(' × ');
  }
  return proof.logos?.[0]?.alt ?? proof.id;
}

function proofClaim(proof) {
  return proof.lines
    .join(' ')
    .replace(/,\s*/g, ', ')
    .toLowerCase()
    .replace(/^\w/u, (char) => char.toUpperCase())
    .replace(/,\s*$/, '.');
}

/** Case studies — same projects as homepage PROOFS. */
export const PORTFOLIO_CASE_STUDIES = PROOFS.map((proof) => {
  const section = BG_SECTIONS.find((s) => s.id === proof.id);
  const preview = proof.images?.find((media) => media.type === 'video');
  const thumb = proof.images?.find((media) => media.type !== 'video') ?? proof.images?.[0];

  const study = {
    id: `case-${proof.id}`,
    slug: proof.id,
    brand: proofBrand(proof),
    claim: proofClaim(proof),
    lines: proof.lines,
    logos: proof.logos ?? [],
    workType: proof.links?.[0]?.label?.replace(/\s*↗\s*$/, '') ?? '',
    thumbnailUrl: thumb?.src ?? '',
    previewSrc: preview?.src,
    accent: section?.color ?? '#ffffff',
  };

  if (proof.id === 'pilulka') {
    study.thumbnailUrl = PILULKA_PORTFOLIO_THUMB;
    study.previewSrc = PILULKA_PORTFOLIO_VIDEO;
  }

  if (proof.id === 'cs') {
    study.thumbnailUrl = CS_PORTFOLIO_THUMB;
    study.previewSrc = CS_PORTFOLIO_VIDEO;
  }

  if (proof.id === 'kitkat') {
    study.thumbnailUrl = KITKAT_PORTFOLIO_THUMB;
    study.previewSrc = KITKAT_PORTFOLIO_VIDEO;
  }

  return study;
});

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
 * @property {string} [youtubeId]
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

export const VIDEO_SHELVES = [
  { id: 'campaigns', title: 'Kampaně' },
  { id: 'videos', title: 'Videa' },
  { id: 'case-studies', title: 'Časosběry' },
];

/** Portfolio video rows — YouTube + case study shelf placeholders */
export const PORTFOLIO_VIDEOS = [
  {
    id: 'vid-campaign-youtube',
    title: 'Kampaň',
    brand: 'Hustle',
    type: 'Kampaň',
    description: '',
    category: 'campaign',
    shelfId: 'campaigns',
    thumbnailUrl: 'https://img.youtube.com/vi/u3kMuLBYX80/hqdefault.jpg',
    youtubeId: 'u3kMuLBYX80',
    year: 2025,
  },
  {
    id: 'vid-main-youtube',
    title: 'Video',
    brand: 'Hustle',
    type: 'Video',
    description: '',
    category: 'video',
    shelfId: 'videos',
    thumbnailUrl: 'https://img.youtube.com/vi/YnHsbYsS7Pw/hqdefault.jpg',
    youtubeId: 'YnHsbYsS7Pw',
    year: 2025,
  },
  {
    id: 'vid-cs-profile',
    title: 'Správa profilu',
    brand: 'Česká spořitelna',
    type: 'Správa profilu',
    description: 'Dlouhodobá strategie a obsah pro nejvýraznější bankovní profil v Česku',
    category: 'profile',
    shelfId: 'case-studies',
    thumbnailUrl: CS_PORTFOLIO_THUMB,
    previewSrc: CS_PORTFOLIO_VIDEO,
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
    shelfId: 'case-studies',
    thumbnailUrl: PILULKA_PORTFOLIO_THUMB,
    previewSrc: PILULKA_PORTFOLIO_VIDEO,
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
    shelfId: 'case-studies',
    thumbnailUrl: `${IMG}/page-07-img-3.jpeg`,
    vimeoId: '',
    year: 2024,
    caseStudySlug: 'dofe',
  },
];

export const PORTFOLIO_REALITY_SHOW = {
  logo: '/logos/always-on.png',
  video: '/videos/reality-show-trailer.mp4',
  poster: '/images/reality-show.png',
  copy:
    'První agentura s vlastní reality show. Náš Instagram není výloha. Je to formát. Nápady. Meetingy. Natáčení. Chaos. Výstupy. To, co radíme značkám, testujeme na sobě.',
  cta: 'SLEDOVAT NA INSTAGRAMU',
  instagramUrl: 'https://www.instagram.com/hustle.cz/',
};

export function youtubeHoverSrc(youtubeId) {
  if (!youtubeId) return null;
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&rel=0&modestbranding=1&playlist=${youtubeId}`;
}

export function youtubeModalSrc(youtubeId) {
  if (!youtubeId) return null;
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
}

export function vimeoHoverSrc(vimeoId) {
  if (!vimeoId) return null;
  return `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&controls=0&playsinline=1`;
}

export function vimeoModalSrc(vimeoId) {
  if (!vimeoId) return null;
  return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`;
}

export function getVideoModalSrc(item) {
  if (!item) return null;
  if (item.youtubeId) return youtubeModalSrc(item.youtubeId);
  if (item.vimeoId) return vimeoModalSrc(item.vimeoId);
  return null;
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
  return PORTFOLIO_CASE_STUDIES.find((c) => c.slug === slug) ?? null;
}

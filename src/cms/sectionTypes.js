import CaseIntroSection from '../design-system/caseStudy/sections/CaseIntroSection';
import CaseZigzagChapterSection from '../design-system/caseStudy/sections/CaseZigzagChapterSection';
import CaseKeyLearningsSection from '../design-system/caseStudy/sections/CaseKeyLearningsSection';
import CaseCtaSection from '../design-system/caseStudy/sections/CaseCtaSection';
import {
  INTRO_STACK_LAYOUTS,
  ZIGZAG_STACK_LAYOUTS,
} from '../design-system/caseStudy/mediaStackLayouts';
import { resolveHeadlineIndents } from '../design-system/caseStudy/headlineIndents';

export const CMS_SECTION_TYPES = {
  intro: {
    id: 'intro',
    label: 'Intro',
    component: CaseIntroSection,
    stackLayouts: INTRO_STACK_LAYOUTS,
    defaultStackLayout: 'offset',
    stackType: 'intro',
    hasMedia: true,
    hasBg: true,
    hasFlip: false,
    hasHeadlineIndent: true,
  },
  zigzag: {
    id: 'zigzag',
    label: 'Zigzag Chapter',
    component: CaseZigzagChapterSection,
    stackLayouts: ZIGZAG_STACK_LAYOUTS,
    defaultStackLayout: 'stagger',
    stackType: 'zigzag',
    hasMedia: true,
    hasBg: true,
    hasFlip: true,
    hasHeadlineIndent: true,
  },
  'key-learnings': {
    id: 'key-learnings',
    label: 'Key Learnings (4)',
    component: CaseKeyLearningsSection,
    hasMedia: false,
    hasBg: true,
    hasFlip: false,
    hasHeadlineIndent: true,
    grid: 4,
  },
  'key-learnings-six': {
    id: 'key-learnings-six',
    label: 'Key Learnings (6)',
    component: CaseKeyLearningsSection,
    hasMedia: false,
    hasBg: true,
    hasFlip: false,
    hasHeadlineIndent: true,
    grid: 6,
  },
  cta: {
    id: 'cta',
    label: 'CTA',
    component: CaseCtaSection,
    hasMedia: false,
    hasBg: true,
    hasFlip: false,
    hasHeadlineIndent: true,
  },
};

export const CMS_BG_PRESETS = [
  { id: 'pilulka', label: 'Pilulka', bg: '#006858', themeColor: '#006858', chromeBottom: '#003830' },
  { id: 'cs', label: 'ČS', bg: '#1868F0', themeColor: '#1868F0', chromeBottom: '#0E48B8' },
  { id: 'sportisimo', label: 'Sportisimo', bg: '#0058B0', themeColor: '#0058B0', chromeBottom: '#002858' },
  { id: 'kitkat', label: 'KitKat', bg: '#E81828', themeColor: '#E81828', chromeBottom: '#A81018' },
  { id: 'dofe', label: 'Dofe', bg: '#9C2088', themeColor: '#9C2088', chromeBottom: '#6A1058' },
  { id: 'red', label: 'Hustle Red', bg: '#F01818', themeColor: '#F01818', chromeBottom: '#CD0010' },
  { id: 'black', label: 'Black', bg: '#000000', themeColor: '#000000', chromeBottom: '#000000' },
];

export function getSectionType(type) {
  return CMS_SECTION_TYPES[type] ?? null;
}

export function blockToProps(block) {
  const typeDef = getSectionType(block.type);
  if (!typeDef) return null;

  const { content = {}, settings = {} } = block;
  const stackLayout =
    settings.stackLayout ?? typeDef.defaultStackLayout ?? 'stagger';

  const base = {
    ...content,
    stackLayout,
    visualVariant: content.visualVariant ?? settings.visualVariant ?? 'pilulka',
  };

  if (block.type === 'intro') {
    return {
      ...base,
      layout: settings.layout ?? content.layout ?? 'default',
      headline: resolveHeadlineIndents(content.headline, settings),
    };
  }

  if (block.type === 'zigzag') {
    return {
      ...base,
      id: content.id ?? block.id,
      flip: settings.flip ?? content.flip ?? false,
      variant: content.variant,
      layout: settings.layout ?? content.layout ?? 'default',
      headline: resolveHeadlineIndents(content.headline, settings),
    };
  }

  if (block.type === 'key-learnings' || block.type === 'key-learnings-six') {
    return {
      title: resolveHeadlineIndents(content.title, settings),
      items: content.items,
      grid: typeDef.grid ?? content.grid ?? 4,
    };
  }

  if (block.type === 'cta') {
    const headline =
      typeof content.headline === 'object'
        ? resolveHeadlineIndents(content.headline, settings)
        : content.headline;

    return {
      ...content,
      headline,
      layout: settings.layout ?? content.layout ?? 'sticky',
    };
  }

  return base;
}

export function blockHasParallax(block) {
  const typeDef = getSectionType(block.type);
  const layout = block.settings?.layout ?? block.content?.layout ?? 'default';

  if (block.type === 'cta') return true;

  if (layout === 'split-prose') return false;
  if (layout === 'hero-split') {
    return Boolean(typeDef?.hasMedia && block.content?.media?.length);
  }
  return Boolean(typeDef?.hasMedia && block.content?.media?.length);
}

export function getBlockBg(block) {
  const { settings = {} } = block;
  return {
    bg: settings.bg ?? '#006858',
    themeColor: settings.themeColor ?? settings.bg ?? '#006858',
    chromeBottom: settings.chromeBottom ?? settings.bg ?? '#003830',
  };
}

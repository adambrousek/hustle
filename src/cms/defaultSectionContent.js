import {
  DEMO_INTRO,
  DEMO_KEY_LEARNINGS,
  DEMO_KEY_LEARNINGS_SIX,
  DEMO_ZIGZAG,
} from '../design-system/caseStudy/demo/demoData';
import { CMS_SECTION_TYPES } from './sectionTypes';

const DEFAULTS = {
  intro: DEMO_INTRO,
  zigzag: DEMO_ZIGZAG,
  'key-learnings': DEMO_KEY_LEARNINGS,
  'key-learnings-six': DEMO_KEY_LEARNINGS_SIX,
  cta: {},
};

export function getDefaultContent(type) {
  const base = DEFAULTS[type] ?? {};
  return structuredClone(base);
}

export function getDefaultSettings(type) {
  const typeDef = CMS_SECTION_TYPES[type];
  return {
    bg: '#006858',
    themeColor: '#006858',
    chromeBottom: '#003830',
    stackLayout: typeDef?.defaultStackLayout,
  };
}

export function createBlockFromTemplate(template) {
  return {
    type: template.type,
    librarySectionId: template.id,
    content: structuredClone(template.content ?? getDefaultContent(template.type)),
    settings: structuredClone(template.settings ?? getDefaultSettings(template.type)),
  };
}

export function blockNeedsContent(block) {
  const content = block.content;
  if (!content) return true;
  return Object.keys(content).length === 0;
}

export function hydrateBlockContent(block, libraryMap) {
  if (!blockNeedsContent(block)) return block;

  const lib = block.librarySectionId ? libraryMap[block.librarySectionId] : null;
  const seed = lib?.content ?? getDefaultContent(block.type);

  return {
    ...block,
    content: structuredClone(seed),
  };
}

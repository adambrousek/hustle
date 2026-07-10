import { CATALOG_VARIANTS } from '../design-system/caseStudy/demo/catalogVariants';
import { getDefaultSettings } from './defaultSectionContent';

export const SECTION_PREVIEW_VARIANTS = CATALOG_VARIANTS.map((variant) => ({
  id: variant.variantId,
  type: variant.type,
  name: variant.name,
  description: variant.description,
  content: structuredClone(variant.content),
  settings: structuredClone(variant.settings),
  previewBg: variant.settings.bg,
  libraryId: variant.id,
}));

export function findPreviewVariant(variantId) {
  return SECTION_PREVIEW_VARIANTS.find((v) => v.id === variantId) ?? null;
}

export function previewForLibraryItem(lib) {
  const variant =
    findPreviewVariant(lib.settings?.variantId) ??
    SECTION_PREVIEW_VARIANTS.find((v) => v.libraryId === lib.id) ??
    SECTION_PREVIEW_VARIANTS.find((v) => {
      if (v.type !== lib.type) return false;
      const libLayout = lib.settings?.layout ?? lib.content?.layout ?? 'default';
      const variantLayout = v.settings?.layout ?? v.content?.layout ?? 'default';
      return libLayout === variantLayout;
    }) ??
    SECTION_PREVIEW_VARIANTS.find((v) => v.type === lib.type);

  const bg = lib.settings?.bg ?? variant?.previewBg ?? '#006858';

  return {
    type: lib.type,
    name: lib.name,
    description: variant?.description ?? lib.type,
    content: structuredClone(
      Object.keys(lib.content ?? {}).length > 0 ? lib.content : (variant?.content ?? {}),
    ),
    settings: {
      ...(variant?.settings ?? getDefaultSettings(lib.type)),
      ...lib.settings,
      bg,
      themeColor: lib.settings?.themeColor ?? bg,
    },
    previewBg: bg,
    libraryId: lib.id,
    variantId: lib.settings?.variantId ?? variant?.id,
  };
}

export function previewBlockFromVariant(variant) {
  return {
    type: variant.type,
    content: structuredClone(variant.content),
    settings: structuredClone(variant.settings),
  };
}

export function libraryTemplateFromVariant(variant, name) {
  return {
    id: variant.libraryId,
    name: name ?? variant.name,
    type: variant.type,
    content: structuredClone(variant.content),
    settings: structuredClone(variant.settings),
  };
}

export function mergeLibraryWithCatalog(savedSections = []) {
  const savedByVariantId = new Map(
    savedSections
      .filter((s) => s.settings?.variantId)
      .map((s) => [s.settings.variantId, s]),
  );
  const savedById = new Map(savedSections.map((s) => [s.id, s]));

  return SECTION_PREVIEW_VARIANTS.map((variant) => {
    const saved =
      savedByVariantId.get(variant.id) ??
      (variant.libraryId ? savedById.get(variant.libraryId) : null);

    if (!saved) return { ...variant, saved: false };

    const preview = previewForLibraryItem(saved);
    return {
      ...variant,
      saved: true,
      libraryId: saved.id,
      name: saved.name,
      content: preview.content,
      settings: preview.settings,
      previewBg: preview.previewBg,
    };
  });
}

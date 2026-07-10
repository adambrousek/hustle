export function resolveBlocks(blocks, library = []) {
  const libraryMap = Object.fromEntries(library.map((s) => [s.id, s]));

  return (blocks ?? []).map((block) => {
    const lib = block.librarySectionId ? libraryMap[block.librarySectionId] : null;

    return {
      ...block,
      type: block.type ?? lib?.type,
      content: block.content ?? {},
      settings: block.settings ?? {},
      templateName: lib?.name ?? null,
    };
  });
}

export function resolvedPage(page, library = []) {
  return {
    ...page,
    blocks: resolveBlocks(page.blocks, library),
  };
}

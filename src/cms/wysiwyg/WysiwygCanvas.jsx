import { useEffect, useMemo, useState } from 'react';
import { syncPageBackground } from '../../utils/browserChrome';
import { getBlockBg } from '../sectionTypes';
import { resolveBlocks } from './resolveBlocks';
import SectionToolbar from './SectionToolbar';
import WysiwygSection from './WysiwygSection';

export default function WysiwygCanvas({
  blocks,
  library = [],
  onBlocksChange,
  singleSection = null,
  onSingleSectionChange,
}) {
  const [selectedId, setSelectedId] = useState(null);

  const resolved = useMemo(() => {
    if (singleSection) {
      return [
        {
          id: 'single',
          type: singleSection.type,
          content: singleSection.content ?? {},
          settings: singleSection.settings ?? {},
          contentEditable: true,
        },
      ];
    }
    return resolveBlocks(blocks, library);
  }, [blocks, library, singleSection]);

  useEffect(() => {
    const first = resolved[0];
    if (!first) return;
    const bg = getBlockBg(first);
    document.documentElement.classList.add('pilulka-case-mode', 'wysiwyg-mode');
    document.documentElement.style.setProperty('--case-bg', bg.bg);
    syncPageBackground(bg.bg, bg.themeColor, bg.chromeBottom);

    return () => {
      document.documentElement.classList.remove('pilulka-case-mode', 'wysiwyg-mode');
      document.documentElement.style.removeProperty('--case-bg');
    };
  }, [resolved]);

  const updateBlock = (blockId, patch) => {
    if (singleSection && onSingleSectionChange) {
      onSingleSectionChange({
        ...singleSection,
        ...patch,
        content: patch.content ?? singleSection.content,
        settings: patch.settings ?? singleSection.settings,
      });
      return;
    }

    onBlocksChange(
      blocks.map((b) => (b.id === blockId ? { ...b, ...patch } : b)),
    );
  };

  const moveBlock = (blockId, dir) => {
    const index = blocks.findIndex((b) => b.id === blockId);
    const target = index + dir;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onBlocksChange(next);
  };

  const removeBlock = (blockId) => {
    if (!window.confirm('Odebrat sekci?')) return;
    onBlocksChange(blocks.filter((b) => b.id !== blockId));
    if (selectedId === blockId) setSelectedId(null);
  };

  return (
    <div className="wysiwyg-canvas">
      <article className="pilulka-case pilulka-case--zigzag wysiwyg-canvas__page">
        {resolved.map((block, index) => (
          <WysiwygSection
            key={block.id}
            block={block}
            selected={selectedId === block.id}
            onSelect={setSelectedId}
            onContentChange={(id, content) => updateBlock(id, { content })}
            toolbar={
              <SectionToolbar
                block={block}
                type={block.type}
                canMoveUp={!singleSection && index > 0}
                canMoveDown={!singleSection && index < resolved.length - 1}
                onSettingsChange={(settings) => updateBlock(block.id, { settings })}
                onMoveUp={singleSection ? undefined : () => moveBlock(block.id, -1)}
                onMoveDown={singleSection ? undefined : () => moveBlock(block.id, 1)}
                onRemove={singleSection ? undefined : () => removeBlock(block.id)}
              />
            }
          />
        ))}
      </article>
    </div>
  );
}

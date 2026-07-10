import { CMS_BG_PRESETS, CMS_SECTION_TYPES } from './sectionTypes';

function linesToText(lines) {
  return (lines ?? []).join('\n');
}

function textToLines(text) {
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

function paragraphsToText(paragraphs) {
  return (paragraphs ?? []).join('\n\n');
}

function textToParagraphs(text) {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

function mediaToText(media) {
  return (media ?? [])
    .map((m) => `${m.type === 'video' ? 'video' : 'image'}|${m.src}${m.className ? `|${m.className}` : ''}`)
    .join('\n');
}

function textToMedia(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [kind, src, className] = line.split('|');
      if (kind === 'video') {
        return { type: 'video', src, ...(className ? { className } : {}) };
      }
      return { src, ...(className ? { className } : {}) };
    });
}

function itemsToText(items) {
  return (items ?? [])
    .map((item) => `${(item.title ?? []).join(' / ')}:::${item.body ?? ''}`)
    .join('\n---\n');
}

function textToItems(text) {
  return text
    .split('\n---\n')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [titlePart, body] = chunk.split(':::');
      return {
        title: titlePart.split('/').map((t) => t.trim()).filter(Boolean),
        body: (body ?? '').trim(),
      };
    });
}

function sceneProofsToText(proofs) {
  return (proofs ?? [])
    .map((p) => p.lines.join(' / '))
    .join('\n');
}

function textToSceneProofs(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({ lines: line.split('/').map((l) => l.trim()).filter(Boolean) }));
}

export default function SectionContentEditor({ type, content, settings, onContentChange, onSettingsChange }) {
  const typeDef = CMS_SECTION_TYPES[type];

  if (!typeDef) return <p>Neznámý typ sekce.</p>;

  const updateContent = (patch) => onContentChange({ ...content, ...patch });
  const updateSettings = (patch) => onSettingsChange({ ...settings, ...patch });

  const applyBgPreset = (preset) => {
    updateSettings({
      bg: preset.bg,
      themeColor: preset.themeColor,
      chromeBottom: preset.chromeBottom,
    });
  };

  return (
    <div className="admin-form">
      {typeDef.hasBg && (
        <fieldset className="admin-fieldset">
          <legend>Barva pozadí</legend>
          <div className="admin-bg-presets">
            {CMS_BG_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="admin-bg-preset"
                style={{ background: preset.bg }}
                title={preset.label}
                onClick={() => applyBgPreset(preset)}
              />
            ))}
          </div>
          <label className="admin-label">
            BG
            <input
              className="admin-input"
              value={settings.bg ?? '#006858'}
              onChange={(e) => updateSettings({ bg: e.target.value })}
            />
          </label>
        </fieldset>
      )}

      {typeDef.stackLayouts && (
        <label className="admin-label">
          Layout videí
          <select
            className="admin-input"
            value={settings.stackLayout ?? typeDef.defaultStackLayout}
            onChange={(e) => updateSettings({ stackLayout: e.target.value })}
          >
            {typeDef.stackLayouts.map((layout) => (
              <option key={layout.id} value={layout.id}>
                {layout.label}
              </option>
            ))}
          </select>
        </label>
      )}

      {typeDef.hasFlip && (
        <fieldset className="admin-fieldset">
          <legend>Pozice sloupců</legend>
          <div className="admin-toggle-group">
            <button
              type="button"
              className={`admin-toggle-btn${!settings.flip ? ' is-active' : ''}`}
              onClick={() => updateSettings({ flip: false })}
            >
              Text vlevo
            </button>
            <button
              type="button"
              className={`admin-toggle-btn${settings.flip ? ' is-active' : ''}`}
              onClick={() => updateSettings({ flip: true })}
            >
              Text vpravo
            </button>
          </div>
        </fieldset>
      )}

      {type !== 'cta' && (
        <>
          <label className="admin-label">
            Headline (řádky)
            <textarea
              className="admin-textarea"
              rows={4}
              value={linesToText(content.headline?.lines)}
              onChange={(e) =>
                updateContent({
                  headline: {
                    ...content.headline,
                    lines: textToLines(e.target.value),
                    lineIndents: content.headline?.lineIndents ?? [],
                    uniform: content.headline?.uniform,
                  },
                })
              }
            />
          </label>

          <label className="admin-label">
            Odstupy headline (volitelné, např. 0, 8vw)
            <input
              className="admin-input"
              value={(content.headline?.lineIndents ?? []).join(', ')}
              onChange={(e) =>
                updateContent({
                  headline: {
                    ...content.headline,
                    lineIndents: e.target.value.split(',').map((v) => v.trim()),
                  },
                })
              }
            />
          </label>
        </>
      )}

      {(type === 'intro' || type === 'zigzag') && (
        <>
          <label className="admin-label">
            Logo URL
            <input
              className="admin-input"
              value={content.logo?.src ?? ''}
              onChange={(e) =>
                updateContent({ logo: { ...content.logo, src: e.target.value, alt: content.logo?.alt ?? '' } })
              }
            />
          </label>
          <label className="admin-label">
            Logo alt
            <input
              className="admin-input"
              value={content.logo?.alt ?? ''}
              onChange={(e) =>
                updateContent({ logo: { ...content.logo, alt: e.target.value, src: content.logo?.src ?? '' } })
              }
            />
          </label>
          <label className="admin-label">
            Odstavce (oddělené prázdným řádkem)
            <textarea
              className="admin-textarea"
              rows={6}
              value={paragraphsToText(content.paragraphs)}
              onChange={(e) => updateContent({ paragraphs: textToParagraphs(e.target.value) })}
            />
          </label>
          <label className="admin-label">
            Media (řádek = video|/path.mp4 nebo image|/path.jpg)
            <textarea
              className="admin-textarea"
              rows={4}
              value={mediaToText(content.media)}
              onChange={(e) => updateContent({ media: textToMedia(e.target.value) })}
            />
          </label>
        </>
      )}

      {type === 'intro' && (
        <>
          <label className="admin-label">
            Subheadline (řádky)
            <textarea
              className="admin-textarea"
              rows={3}
              value={linesToText(content.subhead?.lines)}
              onChange={(e) =>
                updateContent({
                  subhead: {
                    ...content.subhead,
                    lines: textToLines(e.target.value),
                    lineIndents: content.subhead?.lineIndents ?? [],
                    uniform: content.subhead?.uniform ?? true,
                  },
                })
              }
            />
          </label>
          <label className="admin-label">
            CTA text
            <input
              className="admin-input"
              value={content.cta?.label ?? ''}
              onChange={(e) =>
                updateContent({
                  cta: { ...content.cta, label: e.target.value, href: content.cta?.href ?? '/kontakt' },
                })
              }
            />
          </label>
          <label className="admin-label">
            CTA odkaz
            <input
              className="admin-input"
              value={content.cta?.href ?? ''}
              onChange={(e) =>
                updateContent({
                  cta: { ...content.cta, href: e.target.value, label: content.cta?.label ?? '' },
                })
              }
            />
          </label>
          <label className="admin-label">
            Aside proofs (řádek = titulek / podtitulek)
          <textarea
            className="admin-textarea"
            rows={4}
            value={sceneProofsToText(content.sceneProofs)}
            onChange={(e) => {
              const proofs = textToSceneProofs(e.target.value);
              updateContent({
                sceneProofs: proofs.length ? proofs : undefined,
                sceneProofsVariant: proofs.length ? 'awards' : undefined,
                sceneProofsPlacement: proofs.length ? 'aside' : undefined,
              });
            }}
          />
        </label>
        </>
      )}

      {type === 'zigzag' && (
        <>
          <label className="admin-label">
            Shift — před
            <input
              className="admin-input"
              value={content.shift?.before ?? ''}
              onChange={(e) =>
                updateContent({
                  shift: e.target.value
                    ? { before: e.target.value, after: content.shift?.after ?? '' }
                    : undefined,
                })
              }
            />
          </label>
          <label className="admin-label">
            Shift — po
            <input
              className="admin-input"
              value={content.shift?.after ?? ''}
              onChange={(e) =>
                updateContent({
                  shift: content.shift?.before
                    ? { before: content.shift.before, after: e.target.value }
                    : undefined,
                })
              }
            />
          </label>
          <label className="admin-label">
            Body proofs (řádek = titulek / podtitulek, stat = jedno číslo)
            <textarea
              className="admin-textarea"
              rows={3}
              value={sceneProofsToText(content.sceneProofs)}
              onChange={(e) => {
                const proofs = textToSceneProofs(e.target.value);
                updateContent({
                  sceneProofs: proofs.length ? proofs : undefined,
                  sceneProofsVariant: proofs.length && proofs[0].lines.length === 1 ? 'stat' : 'awards',
                  sceneProofsPlacement: proofs.length ? 'body' : undefined,
                });
              }}
            />
          </label>
        </>
      )}

      {(type === 'key-learnings' || type === 'key-learnings-six') && (
        <label className="admin-label">
          Sloupce (title / title:::body, oddělené ---)
          <textarea
            className="admin-textarea"
            rows={10}
            value={itemsToText(content.items)}
            onChange={(e) => updateContent({ items: textToItems(e.target.value) })}
          />
        </label>
      )}
    </div>
  );
}

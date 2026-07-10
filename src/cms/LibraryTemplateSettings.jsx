import { CMS_BG_PRESETS, CMS_SECTION_TYPES } from './sectionTypes';
import { HEADLINE_INDENT_PRESETS } from '../design-system/caseStudy/headlineIndents';

export default function LibraryTemplateSettings({ type, settings, onSettingsChange }) {
  const typeDef = CMS_SECTION_TYPES[type];
  if (!typeDef) return null;

  const update = (patch) => onSettingsChange({ ...settings, ...patch });

  const applyBg = (preset) => {
    update({
      bg: preset.bg,
      themeColor: preset.themeColor,
      chromeBottom: preset.chromeBottom,
    });
  };

  return (
    <div className="admin-form">
      <p className="admin-hint">
        Šablona určuje typ sekce a výchozí nastavení při vložení na stránku. Texty a loga
        upravuješ až na konkrétní stránce — každá instance může mít vlastní obsah.
      </p>

      {typeDef.hasBg && (
        <fieldset className="admin-fieldset">
          <legend>Výchozí barva pozadí</legend>
          <div className="admin-bg-presets">
            {CMS_BG_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="admin-bg-preset"
                style={{ background: preset.bg }}
                title={preset.label}
                onClick={() => applyBg(preset)}
              />
            ))}
          </div>
        </fieldset>
      )}

      {typeDef.stackLayouts && (
        <label className="admin-label">
          Výchozí layout videí
          <select
            className="admin-input"
            value={settings.stackLayout ?? typeDef.defaultStackLayout}
            onChange={(e) => update({ stackLayout: e.target.value })}
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
          <legend>Výchozí pozice sloupců</legend>
          <div className="admin-toggle-group">
            <button
              type="button"
              className={`admin-toggle-btn${!settings.flip ? ' is-active' : ''}`}
              onClick={() => update({ flip: false })}
            >
              Text vlevo
            </button>
            <button
              type="button"
              className={`admin-toggle-btn${settings.flip ? ' is-active' : ''}`}
              onClick={() => update({ flip: true })}
            >
              Text vpravo
            </button>
          </div>
        </fieldset>
      )}

      {typeDef.hasHeadlineIndent && (
        <fieldset className="admin-fieldset">
          <legend>Výchozí odsazení nadpisu</legend>
          <div className="admin-toggle-group">
            {HEADLINE_INDENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`admin-toggle-btn${
                  (settings.headlineIndent ?? 'stagger') === preset.id ? ' is-active' : ''
                }`}
                onClick={() => update({ headlineIndent: preset.id })}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}

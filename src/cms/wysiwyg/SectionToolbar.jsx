import { CMS_BG_PRESETS, CMS_SECTION_TYPES } from '../sectionTypes';
import {
  HEADLINE_INDENT_PRESETS,
  activeHeadlineIndent,
  supportsHeadlineIndent,
} from '../../design-system/caseStudy/headlineIndents';

export default function SectionToolbar({
  block,
  type,
  onSettingsChange,
  onMoveUp,
  onMoveDown,
  onRemove,
  canMoveUp,
  canMoveDown,
}) {
  const typeDef = CMS_SECTION_TYPES[type];
  if (!typeDef) return null;

  const settings = block.settings ?? {};

  const applyBg = (preset) => {
    onSettingsChange({
      ...settings,
      bg: preset.bg,
      themeColor: preset.themeColor,
      chromeBottom: preset.chromeBottom,
    });
  };

  return (
    <div className="wysiwyg-toolbar" onClick={(e) => e.stopPropagation()}>
      <span className="wysiwyg-toolbar__label">
        {typeDef.label}
        {block.templateName ? ` · ${block.templateName}` : ''}
      </span>

      {typeDef.hasBg && (
        <div className="wysiwyg-toolbar__bg">
          {CMS_BG_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`wysiwyg-toolbar__swatch${settings.bg === preset.bg ? ' is-active' : ''}`}
              style={{ background: preset.bg }}
              title={preset.label}
              onClick={() => applyBg(preset)}
            />
          ))}
        </div>
      )}

      {typeDef.stackLayouts && (
        <select
          className="wysiwyg-toolbar__select"
          value={settings.stackLayout ?? typeDef.defaultStackLayout}
          onChange={(e) => onSettingsChange({ ...settings, stackLayout: e.target.value })}
        >
          {typeDef.stackLayouts.map((layout) => (
            <option key={layout.id} value={layout.id}>
              {layout.label}
            </option>
          ))}
        </select>
      )}

      {typeDef.hasFlip && (
        <div className="wysiwyg-toolbar__switcher" role="group" aria-label="Pozice sloupců">
          <button
            type="button"
            className={`wysiwyg-toolbar__switcher-btn${!settings.flip ? ' is-active' : ''}`}
            onClick={() => onSettingsChange({ ...settings, flip: false })}
          >
            Text vlevo
          </button>
          <button
            type="button"
            className={`wysiwyg-toolbar__switcher-btn${settings.flip ? ' is-active' : ''}`}
            onClick={() => onSettingsChange({ ...settings, flip: true })}
          >
            Text vpravo
          </button>
        </div>
      )}

      {typeDef.hasHeadlineIndent && supportsHeadlineIndent(block) && (
        <div className="wysiwyg-toolbar__switcher" role="group" aria-label="Odsazení nadpisu">
          {HEADLINE_INDENT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`wysiwyg-toolbar__switcher-btn${
                activeHeadlineIndent(block) === preset.id ? ' is-active' : ''
              }`}
              onClick={() => onSettingsChange({ ...settings, headlineIndent: preset.id })}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      <div className="wysiwyg-toolbar__actions">
        {onMoveUp && (
          <button type="button" className="wysiwyg-toolbar__btn" disabled={!canMoveUp} onClick={onMoveUp}>
            ↑
          </button>
        )}
        {onMoveDown && (
          <button type="button" className="wysiwyg-toolbar__btn" disabled={!canMoveDown} onClick={onMoveDown}>
            ↓
          </button>
        )}
        {onRemove && (
          <button type="button" className="wysiwyg-toolbar__btn wysiwyg-toolbar__btn--danger" onClick={onRemove}>
            Smazat
          </button>
        )}
      </div>
    </div>
  );
}

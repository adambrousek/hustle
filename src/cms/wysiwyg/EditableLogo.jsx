export const CLIENT_LOGOS = [
  { id: 'pilulka', label: 'Pilulka', src: '/logos/pilulka.svg' },
  { id: 'cs', label: 'Česká spořitelna', src: '/logos/ceska-sporitelna.svg' },
  { id: 'sportisimo', label: 'Sportisimo', src: '/logos/sportisimo.svg' },
  { id: 'kitkat', label: 'KitKat F1', src: '/logos/kitkat-f1.svg' },
  { id: 'dofe', label: 'DofE', src: '/logos/dofe.svg' },
  { id: 'hustle', label: 'Hustle', src: '/logos/hustle.svg' },
];

export default function EditableLogo({ logo, onChange, readOnly = false }) {
  const pickLogo = (e) => {
    e.stopPropagation();
    if (readOnly) return;

    const custom = window.prompt(
      'URL loga (nebo nech prázdné a vyber z nabídky)\n\n' +
        CLIENT_LOGOS.map((l) => `${l.label}: ${l.src}`).join('\n'),
      logo?.src ?? '',
    );

    if (custom === null) return;

    if (custom.trim() === '') {
      onChange(undefined);
      return;
    }

    const preset = CLIENT_LOGOS.find((l) => l.src === custom.trim());
    onChange({
      src: custom.trim(),
      alt: preset?.label ?? logo?.alt ?? 'Logo klienta',
    });
  };

  const pickPreset = (e, preset) => {
    e.stopPropagation();
    onChange({ src: preset.src, alt: preset.label });
  };

  if (!logo?.src && readOnly) return null;

  return (
    <div className="wysiwyg-logo" onClick={(e) => e.stopPropagation()}>
      {logo?.src ? (
        <button type="button" className="wysiwyg-logo__preview" onClick={pickLogo} disabled={readOnly}>
          <img src={logo.src} alt={logo.alt ?? ''} className="pilulka-case-logo" />
          {!readOnly && <span className="wysiwyg-logo__hint">Změnit logo</span>}
        </button>
      ) : (
        !readOnly && (
          <button type="button" className="wysiwyg-logo__add" onClick={pickLogo}>
            + Přidat logo klienta
          </button>
        )
      )}

      {!readOnly && (
        <div className="wysiwyg-logo__picker">
          {CLIENT_LOGOS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`wysiwyg-logo__option${logo?.src === preset.src ? ' is-active' : ''}`}
              title={preset.label}
              onClick={(e) => pickPreset(e, preset)}
            >
              <img src={preset.src} alt={preset.label} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

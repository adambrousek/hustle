import { useEffect } from 'react';
import SectionPreviewThumb from './SectionPreviewThumb';

export default function SectionPickerModal({
  open,
  title,
  items,
  onSelect,
  onClose,
}) {
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="section-picker" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="section-picker__backdrop"
        aria-label="Zavřít"
        onClick={onClose}
      />
      <div className="section-picker__panel">
        <header className="section-picker__head">
          <h2 className="section-picker__title">{title}</h2>
          <button type="button" className="section-picker__close" onClick={onClose}>
            ×
          </button>
        </header>

        <div className="section-picker__grid">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="section-picker__card"
              onClick={() => onSelect(item)}
            >
              <SectionPreviewThumb
                type={item.type}
                content={item.content}
                settings={item.settings}
                previewBg={item.previewBg}
              />
              <span className="section-picker__card-name">{item.name}</span>
              {item.description && (
                <span className="section-picker__card-desc">{item.description}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

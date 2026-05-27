import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { vimeoModalSrc } from '../../data/portfolioData';

export default function VideoModal({ item, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  const embedSrc = vimeoModalSrc(item.vimeoId);
  const localSrc = item.previewSrc;

  return (
    <div
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div className="video-modal__panel" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className="video-modal__close hustle-link"
          onClick={onClose}
          aria-label="Zavřít"
        >
          ZAVŘÍT
        </button>

        <div className="video-modal__player-wrap">
          {embedSrc ? (
            <iframe
              className="video-modal__iframe"
              src={embedSrc}
              title={item.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : localSrc ? (
            <video
              className="video-modal__video"
              src={localSrc}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <div className="video-modal__placeholder">
              <img src={item.thumbnailUrl} alt="" />
              <p className="text-body">Video brzy doplníme.</p>
            </div>
          )}
        </div>

        <div className="video-modal__meta">
          <p className="video-modal__brand">{item.brand}</p>
          <h2 id="video-modal-title" className="video-modal__title">
            {item.title}
          </h2>
          <p className="video-modal__type">{item.type}</p>
          <p className="video-modal__desc text-body">{item.description}</p>
          {item.caseStudySlug && (
            <Link
              to={`/portfolio/case/${item.caseStudySlug}`}
              className="hustle-link"
              onClick={onClose}
            >
              CASE STUDY
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

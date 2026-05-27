import { useCallback, useEffect, useRef, useState } from 'react';
import { vimeoHoverSrc } from '../data/portfolioData';

const MOBILE_MQ = '(max-width: 900px)';

export default function MediaHoverPreview({
  vimeoId = '',
  previewSrc = '',
  thumbnailUrl,
  alt = '',
  className = '',
  brand = '',
  title = '',
  subtitle = '',
}) {
  const [hovering, setHovering] = useState(false);
  const [mobile, setMobile] = useState(false);
  const videoRef = useRef(null);
  const leaveTimer = useRef(null);

  const hoverSrc = vimeoId ? vimeoHoverSrc(vimeoId) : null;
  const canPlay = Boolean(previewSrc || hoverSrc);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !previewSrc) return;
    if (hovering && !mobile) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovering, mobile, previewSrc]);

  const onEnter = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    if (!mobile && canPlay) setHovering(true);
  }, [mobile, canPlay]);

  const onLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setHovering(false), 100);
  }, []);

  useEffect(
    () => () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    },
    [],
  );

  const playing = hovering && !mobile && canPlay;

  return (
    <div
      className={`media-hover-preview ${className}${playing ? ' is-playing' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <img
        src={thumbnailUrl}
        alt={alt}
        className="media-hover-preview__thumb"
        loading="lazy"
        decoding="async"
      />

      {playing && previewSrc && (
        <video
          ref={videoRef}
          className="media-hover-preview__video"
          src={previewSrc}
          muted
          playsInline
          loop
          preload="none"
        />
      )}

      {playing && !previewSrc && hoverSrc && (
        <iframe
          className="media-hover-preview__iframe"
          src={hoverSrc}
          title={alt}
          allow="autoplay; fullscreen; picture-in-picture"
        />
      )}

      {(brand || title) && (
        <div className="media-hover-preview__labels">
          {brand && <span className="media-hover-preview__brand">{brand}</span>}
          {title && <span className="media-hover-preview__title">{title}</span>}
          {subtitle && (
            <span className="media-hover-preview__sub text-body">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
}

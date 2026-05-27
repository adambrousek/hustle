import { useCallback, useEffect, useRef, useState } from 'react';
import { vimeoHoverSrc } from '../data/portfolioData';

const MOBILE_MQ = '(max-width: 900px)';

function isMobile() {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches;
}

export default function VimeoHoverPreview({ vimeoId, thumbnailUrl, alt, className = '' }) {
  const [hovering, setHovering] = useState(false);
  const [mobile, setMobile] = useState(false);
  const leaveTimer = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const hoverSrc = vimeoHoverSrc(vimeoId);
  const showIframe = hovering && !mobile && hoverSrc;

  const onEnter = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    if (!mobile && hoverSrc) setHovering(true);
  }, [mobile, hoverSrc]);

  const onLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setHovering(false), 80);
  }, []);

  useEffect(
    () => () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    },
    [],
  );

  return (
    <div
      className={`vimeo-hover-preview ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <img
        src={thumbnailUrl}
        alt={alt}
        className="vimeo-hover-preview__thumb"
        loading="lazy"
        decoding="async"
      />
      {showIframe && (
        <iframe
          className="vimeo-hover-preview__iframe"
          src={hoverSrc}
          title={alt}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}

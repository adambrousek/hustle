import { useEffect, useRef, useState } from 'react';

export default function CaseMediaAsset({ item, className = '' }) {
  const [videoReady, setVideoReady] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px', threshold: 0.15 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (inView) {
      video.play().catch(() => {});
      return undefined;
    }

    video.pause();
    return undefined;
  }, [inView]);

  if (!item) return null;

  if (item.placeholder) {
    return <div className={`${className} media-placeholder`} aria-hidden="true" />;
  }

  if (item.type === 'video') {
    return (
      <div
        ref={rootRef}
        className={`case-media-asset ${className}${videoReady ? ' case-media-asset--ready' : ' case-media-asset--loading'}`}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          className="case-media-asset__video"
          src={item.src}
          muted
          playsInline
          loop
          autoPlay
          preload={inView ? 'metadata' : 'none'}
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
        />
      </div>
    );
  }

  return (
    <img
      className={className}
      src={item.src}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}

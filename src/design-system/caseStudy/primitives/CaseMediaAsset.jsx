import { useState } from 'react';

export default function CaseMediaAsset({ item, className = '' }) {
  const [videoReady, setVideoReady] = useState(false);

  if (!item) return null;

  if (item.placeholder) {
    return <div className={`${className} media-placeholder`} aria-hidden="true" />;
  }

  if (item.type === 'video') {
    return (
      <div
        className={`case-media-asset ${className}${videoReady ? ' case-media-asset--ready' : ' case-media-asset--loading'}`}
        aria-hidden="true"
      >
        <video
          className="case-media-asset__video"
          src={item.src}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
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

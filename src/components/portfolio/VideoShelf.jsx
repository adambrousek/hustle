import { useRef } from 'react';
import VideoCard from './VideoCard';

export default function VideoShelf({ title, items, onOpenVideo }) {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: 'smooth' });
  };

  if (!items.length) return null;

  return (
    <section className="video-shelf video-shelf--full">
      <h3 className="video-shelf__title">{title}</h3>
      <div className="video-shelf__row">
        <button
          type="button"
          className="nf-arrow nf-arrow--prev"
          onClick={() => scrollBy(-1)}
          aria-label="Posunout vlevo"
        >
          ‹
        </button>
        <div className="video-shelf__scroll" ref={trackRef}>
          <div className="video-shelf__track">
            {items.map((item) => (
              <VideoCard key={item.id} item={item} onOpen={onOpenVideo} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="nf-arrow nf-arrow--next"
          onClick={() => scrollBy(1)}
          aria-label="Posunout vpravo"
        >
          ›
        </button>
      </div>
    </section>
  );
}

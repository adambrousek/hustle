import { useRef } from 'react';
import VideoCard from './VideoCard';

export default function VideoShelf({ title, items, onOpenVideo }) {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 720);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  if (!items.length) return null;

  return (
    <section className="video-shelf">
      <h3 className="video-shelf__title">{title}</h3>
      <div className="video-shelf__row">
        <button
          type="button"
          className="video-shelf__arrow video-shelf__arrow--prev"
          onClick={() => scrollBy(-1)}
          aria-label="Posunout vlevo"
        >
          ‹
        </button>
        <div className="video-shelf__track" ref={trackRef}>
          {items.map((item) => (
            <VideoCard key={item.id} item={item} onOpen={onOpenVideo} />
          ))}
        </div>
        <button
          type="button"
          className="video-shelf__arrow video-shelf__arrow--next"
          onClick={() => scrollBy(1)}
          aria-label="Posunout vpravo"
        >
          ›
        </button>
      </div>
    </section>
  );
}

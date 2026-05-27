import { useRef } from 'react';
import CaseStudyCard from './CaseStudyCard';

export default function FeaturedCaseStudies({ studies }) {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.9, 900);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="featured-cases" id="featured-cases">
      <h2 className="portfolio-section-title">
        <span>HLAVNÍ</span>
        <span style={{ marginLeft: '0.12em' }}>CASE STUDIES</span>
      </h2>
      <p className="portfolio-section-intro text-body">
        Projekty, na kterých je vidět, jak přemýšlíme. Nejen co jsme vytvořili, ale proč
        to vzniklo, jakou roli měl obsah pro značku a co se díky tomu změnilo.
      </p>

      <div className="featured-cases__row">
        <button
          type="button"
          className="video-shelf__arrow video-shelf__arrow--prev"
          onClick={() => scrollBy(-1)}
          aria-label="Posunout vlevo"
        >
          ‹
        </button>
        <div className="featured-cases__track" ref={trackRef}>
          {studies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
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

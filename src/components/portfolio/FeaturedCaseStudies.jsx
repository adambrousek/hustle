import { useRef } from 'react';
import CaseStudyCard from './CaseStudyCard';

export default function FeaturedCaseStudies({ studies }) {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.88, behavior: 'smooth' });
  };

  if (!studies.length) return null;

  return (
    <section className="featured-cases featured-cases--full" id="featured-cases">
      <div className="featured-cases__head">
        <h2 className="featured-cases__title">HLAVNÍ CASE STUDIES</h2>
        <p className="featured-cases__intro text-body">
          Projekty, na kterých je vidět, jak přemýšlíme. Nejen co jsme vytvořili, ale proč
          to vzniklo, jakou roli měl obsah pro značku a co se díky tomu změnilo.
        </p>
      </div>

      <div className="featured-cases__row">
        <button
          type="button"
          className="nf-arrow nf-arrow--prev"
          onClick={() => scrollBy(-1)}
          aria-label="Posunout vlevo"
        >
          ‹
        </button>
        <div className="featured-cases__scroll" ref={trackRef}>
          <div className="featured-cases__track">
            {studies.map((study) => (
              <CaseStudyCard key={study.id} study={study} size="featured" />
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

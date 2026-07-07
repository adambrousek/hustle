import { forwardRef } from 'react';
import { MANIFEST_CONTACT } from '../../../data/manifest';

function CtaLines({ lines }) {
  return (
    <h2 className="manifest-contact__headline">
      {lines.map((line) => (
        <span
          key={line.text}
          className={`manifest-line${line.accent ? ' manifest-line--accent' : ''}`}
          style={{ paddingLeft: line.indent }}
        >
          {line.text}
        </span>
      ))}
    </h2>
  );
}

const PilulkaCaseCta = forwardRef(function PilulkaCaseCta(_props, ref) {
  return (
    <section className="manifest manifest--contact pilulka-case-cta" ref={ref}>
      <div className="manifest-contact__stage sticky-stage">
        <div className="manifest-contact-visual proof-visual" aria-hidden="true">
          <img
            src={MANIFEST_CONTACT.image}
            alt=""
            className="proof-img manifest-contact-visual__img"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="manifest-contact__content manifest__inner manifest-contact__inner">
          <CtaLines lines={MANIFEST_CONTACT.headline} />
          <div className="manifest-contact__copy">
            {MANIFEST_CONTACT.copy.map((line) => (
              <p key={line} className="manifest-contact__line text-body">
                {line}
              </p>
            ))}
          </div>
          <a className="manifest-contact__email" href={`mailto:${MANIFEST_CONTACT.email}`}>
            {MANIFEST_CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
});

export default PilulkaCaseCta;

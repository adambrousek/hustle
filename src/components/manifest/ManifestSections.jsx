import {
  INSTAGRAM_URL,
  MANIFEST_ALWAYS_ON,
  MANIFEST_CONTACT,
  MANIFEST_SYSTEM,
} from '../../data/manifest';

function ManifestLines({ lines, className, accent, as: Tag = 'div' }) {
  return (
    <Tag className={className}>
      {lines.map((line) => (
        <span
          key={line.text}
          className={`manifest-line${line.accent || accent ? ' manifest-line--accent' : ''}`}
          style={{ paddingLeft: line.indent }}
        >
          {line.text}
        </span>
      ))}
    </Tag>
  );
}

function ManifestSystem({ sectionRef }) {
  const data = MANIFEST_SYSTEM;

  return (
    <section className="manifest manifest--system" ref={sectionRef} id="system">
      <div className="manifest__inner manifest-system__inner">
        <ManifestLines lines={data.headline} className="manifest-system__headline" as="h2" />
        <div className="manifest-system__body">
          {data.intro.map((line) => (
            <p key={line} className="manifest-system__text text-body">
              {line}
            </p>
          ))}
          <ul className="manifest-system__points">
            {data.points.map((line) => (
              <li key={line} className="manifest-system__text text-body">
                {line}
              </li>
            ))}
          </ul>
          {data.closing.map((line) => (
            <p key={line} className="manifest-system__text text-body">
              {line}
            </p>
          ))}
        </div>
        <div className="manifest-grid__cells">
          {data.cells.map((cell) => (
            <div key={cell.label} className="manifest-grid__cell">
              <span className="manifest-grid__label">{cell.label}</span>
              <span className="manifest-grid__detail text-body">{cell.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestAlwaysOn({ sectionRef }) {
  const data = MANIFEST_ALWAYS_ON;

  return (
    <section className="manifest manifest--always-on" ref={sectionRef}>
      <div className="manifest-always-on__stage sticky-stage">
        <div className="manifest-always-on-visual proof-visual" aria-hidden="true">
          <video
            className="proof-img manifest-always-on-visual__img"
            src={data.video}
            poster={data.image}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
          />
        </div>
        <div className="manifest-always-on__layout manifest__inner">
          <ManifestLines
            lines={data.headline}
            className="manifest-always-on__headline"
            as="h2"
          />
          <div className="manifest-always-on__media" aria-hidden="true" />
          <div className="manifest-always-on__side">
            <img
              src={data.logo}
              alt="Always On"
              className="manifest-always-on__logo"
              width={420}
              height={165}
              decoding="async"
            />
            <p className="manifest-always-on__text text-body">{data.copy}</p>
            <a
              className="hustle-link manifest-always-on__cta"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              {data.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestContact({ sectionRef }) {
  return (
    <section className="manifest manifest--contact" ref={sectionRef} id="kontakt">
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
          <ManifestLines
            lines={MANIFEST_CONTACT.headline}
            className="manifest-contact__headline"
            as="h2"
          />
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
}

export default function ManifestSections({
  systemRef,
  alwaysOnRef,
  contactRef,
}) {
  return (
    <>
      <ManifestSystem sectionRef={systemRef} />
      <ManifestAlwaysOn sectionRef={alwaysOnRef} />
      <ManifestContact sectionRef={contactRef} />
    </>
  );
}

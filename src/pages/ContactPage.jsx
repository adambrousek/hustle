import { useEffect } from 'react';
import Header from '../components/Header';
import { CONTACT } from '../data/contact';
import '../styles/contact.css';

function BuildStamp() {
  const buildTime =
    typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : 'dev';
  const commitHash =
    typeof __BUILD_COMMIT_HASH__ !== 'undefined' ? __BUILD_COMMIT_HASH__ : '';

  return (
    <div className="build-stamp" aria-hidden="true">
      build {buildTime}
      {commitHash ? ` · ${commitHash}` : ''}
    </div>
  );
}

export default function ContactPage() {
  useEffect(() => {
    document.documentElement.classList.add('contact-mode');
    return () => document.documentElement.classList.remove('contact-mode');
  }, []);

  return (
    <div className="app-shell contact-page">
      <div className="contact-page__bg" aria-hidden="true" />
      <BuildStamp />
      <Header />

      <main className="contact-main">
        <div className="contact-main__stage">
          <div className="contact-main__inner">
            <h1 className="contact-main__headline">{CONTACT.headline}</h1>
            <p className="contact-main__intro text-body">{CONTACT.intro}</p>

            <div className="contact-stack">
              <section className="contact-block">
                <h2 className="contact-block__label">Kontakty</h2>
                <a className="contact-block__link contact-block__link--phone" href={CONTACT.phoneHref}>
                  {CONTACT.phone}
                </a>
                <a
                  className="contact-block__link contact-block__link--email"
                  href={`mailto:${CONTACT.email}`}
                >
                  {CONTACT.email}
                </a>
              </section>

              <div className="contact-details">
                <section className="contact-block">
                  <h2 className="contact-block__label">{CONTACT.office.label}</h2>
                  {CONTACT.office.lines.map((line) => (
                    <p key={line} className="contact-block__line text-body">
                      {line}
                    </p>
                  ))}
                </section>

                <section className="contact-block">
                  <h2 className="contact-block__label">{CONTACT.billing.label}</h2>
                  <p className="contact-block__line contact-block__line--company text-body">
                    {CONTACT.billing.company}
                  </p>
                  {CONTACT.billing.lines.map((line) => (
                    <p key={line} className="contact-block__line text-body">
                      {line}
                    </p>
                  ))}
                  <p className="contact-block__line text-body">IČ: {CONTACT.billing.ic}</p>
                  <p className="contact-block__line text-body">DIČ: {CONTACT.billing.dic}</p>
                </section>
              </div>
            </div>
          </div>

          <div className="contact-visual proof-visual" aria-hidden="true">
            <a
              className="contact-visual__link"
              href={CONTACT.map.linkUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Otevřít kancelář v mapách"
            >
              <iframe
                className="contact-visual__map proof-img"
                src={CONTACT.map.embedUrl}
                title="Mapa kanceláře Hustle — Breitfeldova, Praha 8"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

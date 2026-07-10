import { useEffect } from 'react';
import Header from '../components/Header';
import CaseSubhead from '../design-system/caseStudy/primitives/CaseSubhead';
import ContactBody from '../design-system/caseStudy/primitives/ContactBody';
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
                <CaseSubhead lines={CONTACT.contactsTitle} as="h2" />
                <ContactBody>
                  <a className="contact-block__link text-body" href={CONTACT.phoneHref}>
                    {CONTACT.phone}
                  </a>
                  <a className="contact-block__link text-body" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                </ContactBody>
              </section>

              <div className="contact-details">
                <section className="contact-block">
                  <CaseSubhead lines={CONTACT.office.title} as="h2" />
                  <ContactBody lines={CONTACT.office.lines} />
                </section>

                <section className="contact-block">
                  <CaseSubhead lines={CONTACT.billing.title} as="h2" />
                  <ContactBody
                    lines={[
                      CONTACT.billing.company,
                      ...CONTACT.billing.lines,
                      `IČ: ${CONTACT.billing.ic}`,
                      `DIČ: ${CONTACT.billing.dic}`,
                    ]}
                  />
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

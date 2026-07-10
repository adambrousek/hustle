import { forwardRef } from 'react';
import { mergeSectionRefs } from '../../../utils/parallaxTargets';
import { CONTACT } from '../../../data/contact';
import { MANIFEST_CONTACT } from '../../../data/manifest';
import CaseHeadline from '../primitives/CaseHeadline';
import CaseSubhead from '../primitives/CaseSubhead';
import ContactBody from '../primitives/ContactBody';

function resolveHeadline(headline) {
  if (headline?.lines?.length) return headline;

  const text = typeof headline === 'string' ? headline : 'Ozvěte se nám';
  const upper = text.toUpperCase();
  const words = upper.split(/\s+/);

  if (words.length >= 3) {
    return {
      lines: words,
      lineIndents: ['0', '6vw', '2.5vw'],
    };
  }

  if (words.length === 2) {
    return { lines: words, lineIndents: ['0', '6vw'] };
  }

  return { lines: [upper], lineIndents: ['0'] };
}

function manifestHeadlineToCase(headline) {
  if (!headline?.length) return { lines: [''], lineIndents: ['0'] };

  return {
    lines: headline.map((line) => line.text),
    lineIndents: headline.map((line) => line.indent ?? '0'),
  };
}

function StickyContactCta({
  headline = MANIFEST_CONTACT.headline,
  copy = MANIFEST_CONTACT.copy,
  email = MANIFEST_CONTACT.email,
  image = MANIFEST_CONTACT.image,
}) {
  const headlineData = manifestHeadlineToCase(headline);

  return (
    <div className="manifest-contact__stage sticky-stage">
      <div className="manifest-contact-visual proof-visual" aria-hidden="true">
        <img
          src={image}
          alt=""
          className="proof-img manifest-contact-visual__img"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="manifest-contact__content manifest__inner manifest-contact__inner">
        <CaseHeadline
          as="h2"
          lines={headlineData.lines}
          lineIndents={headlineData.lineIndents}
        />
        <div className="manifest-contact__copy">
          {copy.map((line) => (
            <p key={line} className="manifest-contact__line text-body">
              {line}
            </p>
          ))}
        </div>
        <a className="hustle-link pilulka-case-cta__email-link" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </div>
  );
}

function ContactPageCta({
  headline = CONTACT.headline,
  phone = CONTACT.phone,
  phoneHref = CONTACT.phoneHref,
  email = CONTACT.email,
  contactsTitle = CONTACT.contactsTitle,
  office = CONTACT.office,
  billing = CONTACT.billing,
  map = CONTACT.map,
}) {
  const headlineData = resolveHeadline(headline);

  return (
    <div className="pilulka-chapter__row pilulka-cta-contact__row">
      <div className="pilulka-chapter__text pilulka-cta-contact__text">
        <CaseHeadline
          as="h1"
          lines={headlineData.lines}
          lineIndents={headlineData.lineIndents}
        />

        <div className="pilulka-cta-contact__columns">
          <section className="contact-block">
            <CaseSubhead lines={contactsTitle} as="h2" />
            <ContactBody>
              <a className="contact-block__link text-body" href={phoneHref}>
                {phone}
              </a>
              <a className="contact-block__link text-body" href={`mailto:${email}`}>
                {email}
              </a>
            </ContactBody>
          </section>

          <section className="contact-block">
            <CaseSubhead lines={office.title ?? office.label} as="h2" />
            <ContactBody lines={office.lines} />
          </section>

          <section className="contact-block">
            <CaseSubhead lines={billing.title ?? billing.label} as="h2" />
            <ContactBody
              lines={[
                billing.company,
                ...billing.lines,
                `IČ: ${billing.ic}`,
                `DIČ: ${billing.dic}`,
              ]}
            />
          </section>
        </div>
      </div>

      <div className="pilulka-chapter__media-wrap pilulka-cta-contact__media">
        <div className="proof-visual pilulka-chapter__stack pilulka-cta-contact__map-wrap">
          {map?.placeholder ? (
            <div className="proof-img proof-img--a pilulka-cta-contact__map-placeholder" aria-hidden="true" />
          ) : (
            <a
              className="pilulka-cta-contact__map-link"
              href={map.linkUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Otevřít kancelář v mapách"
            >
              <iframe
                className="proof-img pilulka-cta-contact__map proof-img--a"
                src={map.embedUrl}
                title="Mapa kanceláře Hustle"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Cta — kontaktní závěr (sticky manifest nebo plná kontaktní stránka).
 */
const CaseCtaSection = forwardRef(function CaseCtaSection(
  { layout = 'sticky', bindRef, ...content },
  ref,
) {
  const isContactPage = layout === 'contact-page';

  return (
    <section
      className={`pilulka-chapter pilulka-case-cta${
        isContactPage
          ? ' pilulka-case-cta--contact-page'
          : ' pilulka-case-cta--sticky manifest manifest--contact'
      }`}
      data-section="cta"
      ref={mergeSectionRefs(ref, bindRef)}
    >
      {isContactPage ? (
        <ContactPageCta {...content} />
      ) : (
        <StickyContactCta {...content} />
      )}
    </section>
  );
});

export default CaseCtaSection;

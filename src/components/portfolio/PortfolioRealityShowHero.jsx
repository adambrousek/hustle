import { PORTFOLIO_REALITY_SHOW } from '../../data/portfolioData';

export default function PortfolioRealityShowHero() {
  const data = PORTFOLIO_REALITY_SHOW;

  return (
    <section className="portfolio-reality-show" aria-label="Always On reality show">
      <div className="portfolio-reality-show__stage">
        <video
          className="portfolio-reality-show__video"
          src={data.video}
          poster={data.poster}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
        />
        <div className="portfolio-reality-show__shade" aria-hidden="true" />

        <div className="portfolio-reality-show__content">
          <img
            src={data.logo}
            alt="Always On"
            className="portfolio-reality-show__logo"
            width={560}
            height={220}
            decoding="async"
          />
          <p className="portfolio-reality-show__copy text-body">{data.copy}</p>
          <div className="portfolio-reality-show__actions">
            <a
              className="hustle-link portfolio-reality-show__cta"
              href={data.instagramUrl}
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

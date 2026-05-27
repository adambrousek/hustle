import { useMemo, useState } from 'react';
import Header from '../components/Header';
import FeaturedCaseStudies from '../components/portfolio/FeaturedCaseStudies';
import PortfolioFilters from '../components/portfolio/PortfolioFilters';
import VideoModal from '../components/portfolio/VideoModal';
import VideoShelf from '../components/portfolio/VideoShelf';
import {
  FEATURED_CASE_STUDIES,
  PORTFOLIO_VIDEOS,
  VIDEO_SHELVES,
  filterPortfolioVideos,
  getVideosByShelf,
} from '../data/portfolioData';
import '../styles/portfolio.css';

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

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');
  const [modalItem, setModalItem] = useState(null);

  const filteredVideos = useMemo(
    () => filterPortfolioVideos(PORTFOLIO_VIDEOS, filter),
    [filter],
  );

  return (
    <div className="app-shell portfolio-page">
      <div className="portfolio-page__bg" aria-hidden="true" />
      <BuildStamp />
      <Header />

      <main className="portfolio-main">
        <section className="portfolio-hero">
          <h1 className="portfolio-hero__title">
            <span>PRÁCE,</span>
            <span style={{ marginLeft: '0.08em' }}>KTERÁ</span>
            <span style={{ marginLeft: '0.16em' }}>NEZŮSTALA</span>
            <span style={{ marginLeft: '0.1em' }}>V PREZENTACI.</span>
          </h1>
          <p className="portfolio-hero__sub text-body">
            Case studies, kampaně, videa a social výstupy, které jsme dostali do feedu.
            Některé ukazují dlouhodobou strategii. Jiné jeden silný formát, moment nebo
            nápad.
          </p>
          <a href="#featured-cases" className="portfolio-cta">
            PROHLÉDNOUT CASE STUDIES
          </a>
        </section>

        <FeaturedCaseStudies studies={FEATURED_CASE_STUDIES} />

        <section className="portfolio-library">
          <h2 className="portfolio-section-title">
            <span>VÝSTUPY,</span>
            <span style={{ marginLeft: '0.1em' }}>KTERÉ ŽILY</span>
            <span style={{ marginLeft: '0.14em' }}>VE FEEDU.</span>
          </h2>
          <p className="portfolio-section-intro text-body">
            Videa, formáty, kampaně, adaptace, partnerství a další social výstupy.
            Listujte podle značky, typu práce nebo kanálu.
          </p>

          <PortfolioFilters active={filter} onChange={setFilter} />

          {VIDEO_SHELVES.map((shelf) => (
            <VideoShelf
              key={shelf.id}
              title={shelf.title}
              items={getVideosByShelf(filteredVideos, shelf.id)}
              onOpenVideo={setModalItem}
            />
          ))}
        </section>
      </main>

      <VideoModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  );
}

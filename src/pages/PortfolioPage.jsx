import { useEffect, useState } from 'react';
import Header from '../components/Header';
import PortfolioBillboard from '../components/portfolio/PortfolioBillboard';
import VideoModal from '../components/portfolio/VideoModal';
import VideoShelf from '../components/portfolio/VideoShelf';
import {
  FEATURED_CASE_STUDIES,
  PORTFOLIO_VIDEOS,
  VIDEO_SHELVES,
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
  const [modalItem, setModalItem] = useState(null);

  const heroStudy = FEATURED_CASE_STUDIES[0];

  useEffect(() => {
    document.documentElement.classList.add('portfolio-mode');
    return () => document.documentElement.classList.remove('portfolio-mode');
  }, []);

  return (
    <div className="app-shell portfolio-page portfolio-page--netflix">
      <div className="portfolio-page__bg" aria-hidden="true" />
      <BuildStamp />
      <Header />

      <main className="portfolio-main portfolio-main--netflix">
        <PortfolioBillboard study={heroStudy} />

        <section className="portfolio-library portfolio-library--full" id="portfolio-library">
          {VIDEO_SHELVES.map((shelf) => (
            <VideoShelf
              key={shelf.id}
              title={shelf.title}
              items={getVideosByShelf(PORTFOLIO_VIDEOS, shelf.id)}
              onOpenVideo={setModalItem}
            />
          ))}
        </section>
      </main>

      <VideoModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  );
}

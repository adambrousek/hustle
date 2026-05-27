import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import CaseStudyPage from './pages/CaseStudyPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/portfolio/case/:slug" element={<CaseStudyPage />} />
    </Routes>
  );
}

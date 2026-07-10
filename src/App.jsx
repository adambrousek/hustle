import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomeRoute from './pages/HomeRoute';
import PortfolioPage from './pages/PortfolioPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ContactPage from './pages/ContactPage';
import SystemHomePage from './pages/SystemHomePage';
import CmsPage from './pages/CmsPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLibraryPage from './pages/admin/AdminLibraryPage';
import AdminLibraryEditPage from './pages/admin/AdminLibraryEditPage';
import AdminPagesList from './pages/admin/AdminPagesList';
import AdminPageEditor from './pages/admin/AdminPageEditor';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/homepage" element={<SystemHomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/case/:slug" element={<CaseStudyPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/p/:slug" element={<CmsPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="sections" element={<AdminLibraryPage />} />
          <Route path="sections/:id" element={<AdminLibraryEditPage />} />
          <Route path="pages" element={<AdminPagesList />} />
          <Route path="pages/:id" element={<AdminPageEditor />} />
        </Route>
      </Routes>
    </>
  );
}

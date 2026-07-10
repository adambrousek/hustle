import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ComposedPage from '../cms/ComposedPage';
import { pagesApi } from '../cms/api';
import '../styles.css';
import '../styles/pilulkaCase.css';
import '../styles/manifest.css';

export default function CmsPage({ slug: slugProp }) {
  const { slug: slugParam } = useParams();
  const slug = slugProp ?? slugParam;
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    pagesApi
      .getBySlug(slug)
      .then(setPage)
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return (
      <div className="app-shell pilulka-case-page">
        <Header />
        <main className="main pilulka-case-main" style={{ padding: 48 }}>
          <p>{error}</p>
        </main>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="app-shell pilulka-case-page">
        <Header />
        <main className="main pilulka-case-main" style={{ padding: 48 }}>
          <p>Načítám…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell pilulka-case-page">
      <Header />
      <main className="main pilulka-case-main">
        <ComposedPage page={page} />
      </main>
    </div>
  );
}

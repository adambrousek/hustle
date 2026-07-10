import { useEffect, useState } from 'react';
import HomePage from './HomePage';
import CmsPage from './CmsPage';
import { pagesApi, settingsApi } from '../cms/api';

export default function HomeRoute() {
  const [homepage, setHomepage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([settingsApi.get(), pagesApi.list()])
      .then(([settings, pages]) => {
        const page = pages.find((p) => p.id === settings.homepagePageId) ?? null;
        setHomepage(page);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="app-shell" style={{ padding: 48 }}>
        <p>Načítám…</p>
      </div>
    );
  }

  if (error) {
    return <HomePage />;
  }

  if (homepage?.kind === 'cms' && homepage.slug) {
    return <CmsPage slug={homepage.slug} />;
  }

  return <HomePage />;
}

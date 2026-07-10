import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pagesApi, settingsApi } from '../../cms/api';

export default function AdminPagesList() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [homepagePageId, setHomepagePageId] = useState(null);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);

  const load = () => {
    Promise.all([pagesApi.list(), settingsApi.get()])
      .then(([pagesData, settings]) => {
        setPages(pagesData);
        setHomepagePageId(settings.homepagePageId ?? null);
        setError(null);
      })
      .catch((err) => {
        const msg = err.message?.includes('500')
          ? 'CMS API neběží. Restartuj dev server: npm run dev'
          : err.message;
        setError(msg);
      });
  };

  useEffect(load, []);

  const legacyPages = pages.filter((p) => p.kind === 'legacy');
  const cmsPages = pages.filter((p) => p.kind !== 'legacy');

  const createPage = async () => {
    setCreating(true);
    setError(null);
    try {
      const slug = `stranka-${Date.now().toString(36)}`;
      const page = await pagesApi.create({
        kind: 'cms',
        slug,
        title: 'Nová stránka',
        status: 'draft',
        blocks: [],
      });
      navigate(`/admin/pages/${page.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const renamePage = async (page) => {
    const title = window.prompt('Nový název stránky', page.title);
    if (!title || title === page.title) return;
    try {
      await pagesApi.update(page.id, { title });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePage = async (page) => {
    const label = page.kind === 'legacy' ? page.route : `/p/${page.slug}`;
    if (!window.confirm(`Smazat stránku „${page.title}“ (${label})?`)) return;
    try {
      if (homepagePageId === page.id) {
        await settingsApi.setHomepage(null);
      }
      await pagesApi.remove(page.id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const setHomepage = async (pageId) => {
    try {
      await settingsApi.setHomepage(pageId);
      setHomepagePageId(pageId);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <h1 className="admin-page__title">Stránky</h1>
          <p className="admin-page__desc">
            Nové stránky skládáš ze sekcí. Existující webové stránky jsou jen v seznamu — lze je
            přejmenovat, smazat nebo nastavit jako homepage.
          </p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={createPage}
          disabled={creating}
        >
          {creating ? 'Vytvářím…' : '+ Nová stránka'}
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <h2 className="admin-section-title">Nové stránky (CMS)</h2>
      {cmsPages.length === 0 ? (
        <p className="admin-hint">Zatím žádná CMS stránka. Vytvoř první tlačítkem výše.</p>
      ) : (
        <ul className="admin-list">
          {cmsPages.map((page) => (
            <li key={page.id} className="admin-list__item">
              <div>
                <strong>{page.title}</strong>
                <span className="admin-list__meta">
                  /p/{page.slug} · {page.status} · {page.blocks?.length ?? 0} sekcí
                  {homepagePageId === page.id ? ' · homepage' : ''}
                </span>
              </div>
              <div className="admin-actions">
                <button
                  type="button"
                  className={`admin-btn admin-btn--ghost${homepagePageId === page.id ? ' admin-btn--active' : ''}`}
                  onClick={() => setHomepage(page.id)}
                  title="Nastavit jako homepage"
                >
                  {homepagePageId === page.id ? '★ Homepage' : '☆ Homepage'}
                </button>
                <Link to={`/p/${page.slug}`} className="admin-btn admin-btn--ghost" target="_blank">
                  Náhled
                </Link>
                <Link to={`/admin/pages/${page.id}`} className="admin-btn admin-btn--ghost">
                  Skládat
                </Link>
                <button type="button" className="admin-btn admin-btn--ghost" onClick={() => renamePage(page)}>
                  Přejmenovat
                </button>
                <button type="button" className="admin-btn admin-btn--danger" onClick={() => deletePage(page)}>
                  Smazat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="admin-section-title">Existující stránky (needitovatelné)</h2>
      <ul className="admin-list">
        {legacyPages.map((page) => (
          <li key={page.id} className="admin-list__item admin-list__item--legacy">
            <div>
              <strong>{page.title}</strong>
              <span className="admin-list__meta">
                {page.route} · statická stránka · obsah se neupravuje v CMS
                {homepagePageId === page.id ? ' · homepage' : ''}
              </span>
            </div>
            <div className="admin-actions">
              <button
                type="button"
                className={`admin-btn admin-btn--ghost${homepagePageId === page.id ? ' admin-btn--active' : ''}`}
                onClick={() => setHomepage(page.id)}
              >
                {homepagePageId === page.id ? '★ Homepage' : '☆ Homepage'}
              </button>
              <Link to={page.route} className="admin-btn admin-btn--ghost" target="_blank">
                Náhled
              </Link>
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => renamePage(page)}>
                Přejmenovat
              </button>
              <button type="button" className="admin-btn admin-btn--danger" onClick={() => deletePage(page)}>
                Smazat
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

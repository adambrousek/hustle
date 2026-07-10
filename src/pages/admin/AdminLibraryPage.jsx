import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { libraryApi } from '../../cms/api';
import SectionPreviewThumb from '../../cms/SectionPreviewThumb';
import { mergeLibraryWithCatalog } from '../../cms/sectionPreviewCatalog';
import { CMS_SECTION_TYPES } from '../../cms/sectionTypes';
import '../../styles.css';
import '../../styles/pilulkaCase.css';
import '../../styles/manifest.css';

export default function AdminLibraryPage() {
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);

  const load = () => {
    libraryApi
      .list()
      .then(setSections)
      .catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const catalogItems = mergeLibraryWithCatalog(sections);

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <h1 className="admin-page__title">Knihovna sekcí</h1>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <p className="admin-page__desc">
        Všech {catalogItems.length} variant sekcí. Upravíš výchozí nastavení šablony — obsah (texty,
        loga) pak na každé stránce zvlášť.
      </p>

      <div className="section-library-grid">
        {catalogItems.map((item) => {
          const editId = item.libraryId;
          return (
            <article key={item.id} className="section-library-card">
              {editId ? (
                <Link
                  to={`/admin/sections/${editId}`}
                  className="section-library-card__preview-link"
                >
                  <SectionPreviewThumb
                    type={item.type}
                    content={item.content}
                    settings={item.settings}
                    previewBg={item.previewBg}
                  />
                </Link>
              ) : (
                <div className="section-library-card__preview-link">
                  <SectionPreviewThumb
                    type={item.type}
                    content={item.content}
                    settings={item.settings}
                    previewBg={item.previewBg}
                  />
                </div>
              )}
              <div className="section-library-card__meta">
                <div>
                  <strong className="section-library-card__name">{item.name}</strong>
                  <span className="section-library-card__type">
                    {CMS_SECTION_TYPES[item.type]?.label}
                  </span>
                  {item.description && (
                    <span className="section-library-card__desc">{item.description}</span>
                  )}
                </div>
                {editId ? (
                  <Link to={`/admin/sections/${editId}`} className="admin-btn admin-btn--ghost">
                    Upravit
                  </Link>
                ) : (
                  <span className="section-library-card__pending">Sync…</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

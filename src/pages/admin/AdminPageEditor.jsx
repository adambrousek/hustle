import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { randomUUID } from '../../cms/utils';
import { libraryApi, pagesApi } from '../../cms/api';
import { createBlockFromTemplate, hydrateBlockContent } from '../../cms/defaultSectionContent';
import SectionPickerModal from '../../cms/SectionPickerModal';
import {
  mergeLibraryWithCatalog,
  previewBlockFromVariant,
  SECTION_PREVIEW_VARIANTS,
} from '../../cms/sectionPreviewCatalog';
import WysiwygCanvas from '../../cms/wysiwyg/WysiwygCanvas';
import '../../styles.css';
import '../../styles/pilulkaCase.css';
import '../../styles/manifest.css';
import '../../styles/wysiwyg.css';

export default function AdminPageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [library, setLibrary] = useState([]);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [libraryPickerOpen, setLibraryPickerOpen] = useState(false);
  const [variantPickerOpen, setVariantPickerOpen] = useState(false);

  useEffect(() => {
    Promise.all([pagesApi.get(id), libraryApi.list()])
      .then(([pageData, libraryData]) => {
        if (pageData.kind === 'legacy') {
          navigate('/admin/pages', { replace: true });
          return;
        }

        const libraryMap = Object.fromEntries(libraryData.map((s) => [s.id, s]));
        const hydratedBlocks = pageData.blocks.map((block) =>
          hydrateBlockContent(block, libraryMap),
        );

        setPage({ ...pageData, blocks: hydratedBlocks });
        setLibrary(libraryData);
      })
      .catch((err) => setError(err.message));
  }, [id, navigate]);

  const save = async () => {
    setSaving(true);
    try {
      const updated = await pagesApi.update(id, page);
      setPage(updated);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const addFromLibrary = (librarySectionId) => {
    const lib = library.find((s) => s.id === librarySectionId);
    if (!lib) return;

    const block = createBlockFromTemplate(lib);
    setPage({
      ...page,
      blocks: [...page.blocks, { id: randomUUID(), ...block }],
    });
    setLibraryPickerOpen(false);
  };

  const addFromVariant = (variant) => {
    const block = previewBlockFromVariant(variant);
    setPage({
      ...page,
      blocks: [...page.blocks, { id: randomUUID(), ...block }],
    });
    setVariantPickerOpen(false);
  };

  const libraryPickerItems = mergeLibraryWithCatalog(library).filter((item) => item.saved);

  if (!page) {
    return (
      <div className="admin-page">
        <p>{error || 'Načítám…'}</p>
      </div>
    );
  }

  return (
    <div className="wysiwyg-editor">
      <header className="wysiwyg-editor__bar">
        <div className="wysiwyg-editor__bar-left">
          <Link to="/admin/pages" className="admin-back">
            ← Stránky
          </Link>
          <input
            className="wysiwyg-editor__title-input"
            value={page.title}
            onChange={(e) => setPage({ ...page, title: e.target.value })}
            placeholder="Název stránky"
            aria-label="Název stránky"
          />
          <input
            className="wysiwyg-editor__menu-input"
            value={page.menuLabel ?? ''}
            onChange={(e) => setPage({ ...page, menuLabel: e.target.value })}
            placeholder="Název v menu"
            aria-label="Název v menu"
          />
          <input
            className="wysiwyg-editor__order-input"
            type="number"
            value={page.menuOrder ?? 100}
            onChange={(e) =>
              setPage({ ...page, menuOrder: Number(e.target.value) || 100 })
            }
            aria-label="Pořadí v menu"
            title="Pořadí v menu"
          />
          <select
            className="wysiwyg-editor__status-select"
            value={page.status ?? 'draft'}
            onChange={(e) => setPage({ ...page, status: e.target.value })}
            aria-label="Stav stránky"
          >
            <option value="draft">Koncept</option>
            <option value="published">Publikováno</option>
          </select>
          <span className="wysiwyg-editor__slug">/p/{page.slug}</span>
        </div>
        <div className="wysiwyg-editor__bar-right">
          <button
            type="button"
            className="admin-btn"
            onClick={() => setLibraryPickerOpen(true)}
            disabled={library.length === 0}
          >
            + Ze šablony
          </button>
          <button
            type="button"
            className="admin-btn"
            onClick={() => setVariantPickerOpen(true)}
          >
            + Nová sekce
          </button>
          <button type="button" className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>
            {saving ? 'Ukládám…' : 'Uložit'}
          </button>
        </div>
      </header>

      {error && <p className="admin-error wysiwyg-editor__error">{error}</p>}

      <SectionPickerModal
        open={libraryPickerOpen}
        title="Vyber šablonu z knihovny"
        items={libraryPickerItems}
        onClose={() => setLibraryPickerOpen(false)}
        onSelect={(item) => addFromLibrary(item.libraryId)}
      />

      <SectionPickerModal
        open={variantPickerOpen}
        title="Vyber typ sekce"
        items={SECTION_PREVIEW_VARIANTS}
        onClose={() => setVariantPickerOpen(false)}
        onSelect={addFromVariant}
      />

      <WysiwygCanvas
        blocks={page.blocks}
        library={library}
        onBlocksChange={(blocks) => setPage({ ...page, blocks })}
      />
    </div>
  );
}

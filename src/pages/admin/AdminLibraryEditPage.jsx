import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { libraryApi } from '../../cms/api';
import LibraryTemplateSettings from '../../cms/LibraryTemplateSettings';
import { CMS_SECTION_TYPES } from '../../cms/sectionTypes';
import { getDefaultSettings } from '../../cms/defaultSectionContent';

export default function AdminLibraryEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    libraryApi
      .get(id)
      .then(setSection)
      .catch((err) => setError(err.message));
  }, [id]);

  const save = async () => {
    setSaving(true);
    try {
      const updated = await libraryApi.update(id, section);
      setSection(updated);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm('Smazat šablonu sekce?')) return;
    await libraryApi.remove(id);
    navigate('/admin/sections');
  };

  if (!section) {
    return (
      <div className="admin-page">
        <p>{error || 'Načítám…'}</p>
      </div>
    );
  }

  const typeLabel = CMS_SECTION_TYPES[section.type]?.label ?? section.type;
  const settings = section.settings ?? getDefaultSettings(section.type);

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <div>
          <Link to="/admin/sections" className="admin-back">
            ← Knihovna
          </Link>
          <h1 className="admin-page__title">{section.name}</h1>
          <p className="admin-page__desc">{typeLabel} · šablona sekce</p>
        </div>
        <div className="admin-actions">
          <button type="button" className="admin-btn admin-btn--danger" onClick={remove}>
            Smazat
          </button>
          <button type="button" className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>
            {saving ? 'Ukládám…' : 'Uložit'}
          </button>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <label className="admin-label">
        Název šablony
        <input
          className="admin-input"
          value={section.name}
          onChange={(e) => setSection({ ...section, name: e.target.value })}
        />
      </label>

      <LibraryTemplateSettings
        type={section.type}
        settings={settings}
        onSettingsChange={(nextSettings) => setSection({ ...section, settings: nextSettings })}
      />
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <h1 className="admin-page__title">CMS</h1>
      <p className="admin-page__desc">
        Skládej stránky ze šablon sekcí. Stejnou šablonu můžeš použít na více stránkách s různým obsahem.
      </p>
      <div className="admin-cards">
        <Link to="/admin/sections" className="admin-card">
          <h2>Knihovna sekcí</h2>
          <p>Šablony — typ sekce a výchozí nastavení.</p>
        </Link>
        <Link to="/admin/pages" className="admin-card">
          <h2>Stránky</h2>
          <p>WYSIWYG editor — obsah upravuješ přímo na stránce.</p>
        </Link>
      </div>
    </div>
  );
}

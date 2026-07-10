import { Link, Outlet } from 'react-router-dom';
import '../../styles.css';
import '../../styles/admin.css';

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-sidebar__brand">
          Hustle CMS
        </Link>
        <nav className="admin-sidebar__nav">
          <Link to="/admin">Přehled</Link>
          <Link to="/admin/sections">Knihovna sekcí</Link>
          <Link to="/admin/pages">Stránky</Link>
          <Link to="/homepage">Design System</Link>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

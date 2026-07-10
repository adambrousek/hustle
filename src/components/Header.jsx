import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { pagesApi } from '../cms/api';
import { buildMenuItems } from '../cms/menu';

const FALLBACK_MENU = [
  { id: 'fallback-home', label: 'O NÁS', href: '/' },
  { id: 'fallback-portfolio', label: 'PORTFOLIO', href: '/portfolio' },
  { id: 'fallback-kontakt', label: 'KONTAKT', href: '/kontakt' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(FALLBACK_MENU);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash, location.search]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    pagesApi
      .list()
      .then((pages) => {
        const items = buildMenuItems(pages);
        if (items.length > 0) setMenuItems(items);
      })
      .catch(() => {
        setMenuItems(FALLBACK_MENU);
      });
  }, []);

  return (
    <header className={`header${open ? ' header--menuOpen' : ''}`}>
      <Link to="/" className="header-logo">
        <img
          src="/logos/hustle.svg"
          alt="Hustle"
          className="header-logo-img"
          width={156}
          height={56}
        />
      </Link>

      <button
        type="button"
        className="header-menuToggle hustle-link"
        aria-expanded={open}
        aria-controls="header-nav"
        onClick={() => setOpen((v) => !v)}
      >
        MENU
      </button>

      <nav className="header-nav" id="header-nav" aria-label="Hlavní navigace">
        {menuItems.map((item) => (
          <Link key={item.id} to={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

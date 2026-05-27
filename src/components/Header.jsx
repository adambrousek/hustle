import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);
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
        MENU{open ? ' ▴' : ' ▾'}
      </button>

      <nav className="header-nav" id="header-nav" aria-label="Hlavní navigace">
        <Link to="/#dukazy" onClick={() => setOpen(false)}>
          DŮKAZY
        </Link>
        <Link to="/#system" onClick={() => setOpen(false)}>
          SYSTÉM
        </Link>
        <Link to="/portfolio" onClick={() => setOpen(false)}>
          PORTFOLIO
        </Link>
        <Link to="/#kontakt" onClick={() => setOpen(false)}>
          KONTAKT
        </Link>
      </nav>
    </header>
  );
}

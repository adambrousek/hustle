import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img
          src="/logos/hustle.svg"
          alt="Hustle"
          className="header-logo-img"
          width={156}
          height={56}
        />
      </Link>
      <nav className="header-nav">
        <Link to="/#dukazy">DŮKAZY</Link>
        <Link to="/#system">SYSTÉM</Link>
        <Link to="/portfolio">PORTFOLIO</Link>
        <Link to="/#kontakt">KONTAKT</Link>
      </nav>
    </header>
  );
}

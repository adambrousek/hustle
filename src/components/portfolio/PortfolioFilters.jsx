import { PORTFOLIO_FILTERS } from '../../data/portfolioData';

export default function PortfolioFilters({ active, onChange }) {
  return (
    <div className="portfolio-filters" role="tablist" aria-label="Filtr portfolia">
      {PORTFOLIO_FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          role="tab"
          aria-selected={active === f.id}
          className={`portfolio-filters__btn${active === f.id ? ' is-active' : ''}`}
          onClick={() => onChange(f.id)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

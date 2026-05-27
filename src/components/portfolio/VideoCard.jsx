import VimeoHoverPreview from '../VimeoHoverPreview';

export default function VideoCard({ item, onOpen }) {
  return (
    <button
      type="button"
      className="video-card"
      onClick={() => onOpen(item)}
      aria-label={`${item.brand}: ${item.title}`}
    >
      <div className="video-card__media">
        <VimeoHoverPreview
          vimeoId={item.vimeoId}
          thumbnailUrl={item.thumbnailUrl}
          alt={`${item.brand} ${item.title}`}
          className="video-card__preview"
        />
        <span className="video-card__overlay">
          <span className="video-card__cta">PŘEHRÁT</span>
        </span>
      </div>
      <div className="video-card__body">
        <p className="video-card__brand">{item.brand}</p>
        <p className="video-card__type">{item.type}</p>
        <p className="video-card__desc text-body">{item.description}</p>
      </div>
    </button>
  );
}

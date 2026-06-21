import MediaHoverPreview from '../MediaHoverPreview';

export default function VideoCard({ item, onOpen }) {
  return (
    <div className="video-card-slot">
      <button
        type="button"
        className="video-card"
        onClick={() => onOpen(item)}
        aria-label={`${item.brand}: ${item.title}`}
      >
        <div className="video-card__frame">
          <div className="video-card__media">
            <MediaHoverPreview
              previewSrc={item.previewSrc}
              vimeoId={item.vimeoId}
              youtubeId={item.youtubeId}
              thumbnailUrl={item.thumbnailUrl}
              alt={`${item.brand}: ${item.title}`}
              className="video-card__preview"
              title={item.title}
            />
            <span className="video-card__play" aria-hidden="true">
              ▶
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}

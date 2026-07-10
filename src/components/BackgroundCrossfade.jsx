/**
 * Dvě fixed vrstvy pro crossfade pozadí mezi sekcemi.
 */
export default function BackgroundCrossfade({ bgARef, bgBRef, className = '' }) {
  return (
    <div className={`background-stage-wrap ${className}`.trim()} aria-hidden="true">
      <div className="background-stage" ref={bgARef} />
      <div className="background-stage" ref={bgBRef} />
    </div>
  );
}

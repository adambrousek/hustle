export default function CaseSceneProofs({ proofs, variant, placement = 'body' }) {
  if (!proofs?.length) return null;

  return (
    <div
      className={`pilulka-chapter__scene-proofs pilulka-chapter__scene-proofs--${placement}${
        variant ? ` pilulka-chapter__scene-proofs--${variant}` : ''
      }`}
    >
      {proofs.map((proof) => {
        const lines = variant === 'stat' ? proof.lines.slice(0, 1) : proof.lines;

        return (
        <div key={proof.lines.join('-')} className="pilulka-chapter__scene-proof">
          {lines.map((line, i) => (
            <span
              key={line}
              className={`pilulka-chapter__scene-proof-line${
                i === 0 ? ' pilulka-chapter__scene-proof-line--lead' : ''
              }`}
            >
              {line}
            </span>
          ))}
        </div>
        );
      })}
    </div>
  );
}

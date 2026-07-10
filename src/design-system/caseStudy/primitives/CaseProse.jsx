export default function CaseProse({ paragraphs }) {
  if (!paragraphs?.length) return null;

  return (
    <div className="pilulka-chapter__prose">
      {paragraphs.map((text, i) => (
        <p key={`${text.slice(0, 48)}-${i}`} className="text-body">
          {text}
        </p>
      ))}
    </div>
  );
}

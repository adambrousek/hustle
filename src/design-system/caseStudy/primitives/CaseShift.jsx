export default function CaseShift({ before, after }) {
  if (!before && !after) return null;

  return (
    <div className="pilulka-chapter__shift">
      <p className="pilulka-chapter__shift-line">{before}</p>
      <p className="pilulka-chapter__shift-line pilulka-chapter__shift-line--after">{after}</p>
    </div>
  );
}

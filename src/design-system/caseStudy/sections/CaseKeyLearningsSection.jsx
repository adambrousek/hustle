/**
 * KeyLearnings — závěrečná sekce se sloupci (4 nebo 6).
 * grid: 4 = jeden řádek, 6 = 3 sloupce × 2 řádky
 */
export default function CaseKeyLearningsSection({ title, items, grid = 4, bindRef }) {
  if (!items?.length) return null;

  const isSixGrid = grid === 6;

  return (
    <section
      ref={bindRef}
      className={`pilulka-key-learnings${isSixGrid ? ' pilulka-key-learnings--six' : ''}`}
      data-section={isSixGrid ? 'key-learnings-six' : 'key-learnings'}
      aria-labelledby="case-key-learnings-title"
    >
      <div className="pilulka-key-learnings__inner">
        <h2 id="case-key-learnings-title" className="pilulka-key-learnings__title claim">
          {title.lines.map((line, i) => (
            <span
              key={line}
              className="claim-line"
              style={{ '--claim-indent': title.lineIndents?.[i] ?? '0' }}
            >
              {line}
            </span>
          ))}
        </h2>
        <div
          className={`pilulka-key-learnings__grid${
            isSixGrid ? ' pilulka-key-learnings__grid--six' : ''
          }`}
        >
          {items.map((item) => (
            <article key={item.title.join('-')} className="pilulka-key-learnings__col">
              <h3 className="pilulka-key-learnings__col-title">
                {item.title.map((line) => (
                  <span key={line} className="pilulka-key-learnings__col-title-line">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="pilulka-key-learnings__col-body text-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

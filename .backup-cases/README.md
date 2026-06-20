# Cases layout backup (spread / pre-compact)

Snapshot **before** compact centered stack (v2).

## Files

- `styles.css` — original spread layout
- `useScrollEffects.js` — original parallax
- `proofs.js` — line indents

Current compact v2 also changes `src/pages/HomePage.jsx` (`.proof-signature-col` wrapper).

## Restore spread layout

```bash
cp .backup-cases/styles.css src/styles.css
cp .backup-cases/useScrollEffects.js src/hooks/useScrollEffects.js
git checkout src/pages/HomePage.jsx
```

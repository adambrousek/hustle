# Vyřešený stav: ploché pozadí + iOS chrome

Saved from commit `62b5bd9`.

- Flat section backgrounds (barva = chrome vršek, bez spatial gradientu)
- iOS Safari: transparentní menu, sync chrome s crossfade / fast-scroll snap
- Spodní pruh bez překrytí obsahu

## Restore

```bash
cp .backup-working-flat-bg-resolved/src/styles.css src/styles.css
cp .backup-working-flat-bg-resolved/src/App.jsx src/App.jsx
cp .backup-working-flat-bg-resolved/src/main.jsx src/main.jsx
cp .backup-working-flat-bg-resolved/src/data/proofs.js src/data/proofs.js
cp .backup-working-flat-bg-resolved/src/utils/* src/utils/
cp .backup-working-flat-bg-resolved/src/hooks/* src/hooks/
cp .backup-working-flat-bg-resolved/index.html index.html
cp .backup-working-flat-bg-resolved/vite.config.js vite.config.js
```

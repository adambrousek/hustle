# Meziverze: iOS chrome OK, průhledné menu

Saved from commit `7af3590` (before bottom-edge fix).

- Top/header + Safari `theme-color` sync
- Transparent header (no solid menu fill)
- Edge colors + DEEP_RED gradient aligned
- Bottom gradient seam still visible (next fix)

## Restore

```bash
cp .backup-working-ios-transparent-menu/src/styles.css src/styles.css
cp .backup-working-ios-transparent-menu/src/App.jsx src/App.jsx
cp .backup-working-ios-transparent-menu/src/main.jsx src/main.jsx
cp .backup-working-ios-transparent-menu/src/data/proofs.js src/data/proofs.js
cp .backup-working-ios-transparent-menu/src/utils/* src/utils/
cp .backup-working-ios-transparent-menu/src/hooks/* src/hooks/
cp .backup-working-ios-transparent-menu/index.html index.html
cp .backup-working-ios-transparent-menu/vite.config.js vite.config.js
```

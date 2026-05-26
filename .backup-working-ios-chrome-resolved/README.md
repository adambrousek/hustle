# iOS Safari chrome — resolved baseline

Saved from commit `7971309` (fast-scroll snap, transparent menu, bottom band).

- Instant bg/chrome on fast scroll + snap on `scrollEnd`
- Top chrome + transparent header
- Bottom band without content overlay
- Gradients in backup = pre–spatial-depth version (`proofs.js` from `7971309`)

## Restore chrome-only state

```bash
cp .backup-working-ios-chrome-resolved/src/styles.css src/styles.css
cp .backup-working-ios-chrome-resolved/src/App.jsx src/App.jsx
cp .backup-working-ios-chrome-resolved/src/main.jsx src/main.jsx
cp .backup-working-ios-chrome-resolved/src/data/proofs.js src/data/proofs.js
cp .backup-working-ios-chrome-resolved/src/utils/* src/utils/
cp .backup-working-ios-chrome-resolved/src/hooks/* src/hooks/
cp .backup-working-ios-chrome-resolved/index.html index.html
cp .backup-working-ios-chrome-resolved/vite.config.js vite.config.js
```

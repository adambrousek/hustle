# Working iOS header / theme-color baseline

Saved after removing rounded corners and box-shadow while keeping the top margin offset.

- `html.ios-app-shell` — black top strip via `margin-top: max(10px, safe-area)`
- `browserChrome.js` — html top stays `#000`, body + `theme-color` tween on scroll
- Square top (no `--shell-radius`, no shadow)

Parent commit: `38cda44` (rounded shell) → this variant.

## Restore

```bash
cp .backup-working-header-bg/src/styles.css src/styles.css
cp .backup-working-header-bg/src/App.jsx src/App.jsx
cp .backup-working-header-bg/src/main.jsx src/main.jsx
cp .backup-working-header-bg/src/utils/* src/utils/
cp .backup-working-header-bg/src/hooks/* src/hooks/
cp .backup-working-header-bg/index.html index.html
cp .backup-working-header-bg/vite.config.js vite.config.js
```

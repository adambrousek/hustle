# Working iOS background baseline

Saved from commit `52c95ac` + build stamp (`2d93ec7`).

- Black top chrome via `html.ios-app-shell` + `browserChrome.js` (top black, bottom dynamic)
- iOS app shell with rounded top corners

## Restore

```bash
cp .backup-working-bg/src/styles.css src/styles.css
cp .backup-working-bg/src/App.jsx src/App.jsx
cp .backup-working-bg/src/main.jsx src/main.jsx
cp .backup-working-bg/src/utils/* src/utils/
cp .backup-working-bg/src/hooks/* src/hooks/
cp .backup-working-bg/index.html index.html
cp .backup-working-bg/vite.config.js vite.config.js
```

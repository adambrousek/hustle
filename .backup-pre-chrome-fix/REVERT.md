# Revert before Safari chrome / theme-color fix

```bash
cp .backup-pre-chrome-fix/index.html index.html
cp .backup-pre-chrome-fix/src/* src/
cp .backup-pre-chrome-fix/src/hooks/useScrollEffects.js src/hooks/
cp .backup-pre-chrome-fix/src/data/proofs.js src/data/
rm -rf src/utils/browserChrome.js
```

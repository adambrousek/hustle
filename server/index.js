import { createCmsApp } from './createApp.js';
import { seedIfEmpty } from './seed.js';
import { ensureLegacyPages } from './migrate.js';

const app = createCmsApp();
const PORT = process.env.CMS_PORT || 3456;

Promise.all([seedIfEmpty(), ensureLegacyPages()]).then(([seeded]) => {
  if (seeded) console.log('CMS seed: demo data created (/p/demo)');
});

app.listen(PORT, () => {
  console.log(`CMS API running on http://localhost:${PORT}`);
});

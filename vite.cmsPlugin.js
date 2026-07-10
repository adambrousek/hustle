import { createCmsApp } from './server/createApp.js';
import { seedIfEmpty } from './server/seed.js';
import { ensureLegacyPages } from './server/migrate.js';

let ready = false;

async function ensureCmsReady() {
  if (ready) return;
  await Promise.all([seedIfEmpty(), ensureLegacyPages()]);
  ready = true;
}

export function cmsApiPlugin() {
  return {
    name: 'cms-api',
    async configureServer(server) {
      await ensureCmsReady();

      const app = createCmsApp();

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (!url.startsWith('/api')) return next();
        app(req, res, next);
      });
    },
  };
}

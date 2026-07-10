import express from 'express';
import cors from 'cors';
import libraryRouter from './routes/library.js';
import pagesRouter from './routes/pages.js';
import settingsRouter from './routes/settings.js';

export function createCmsApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/library', libraryRouter);
  app.use('/api/pages', pagesRouter);
  app.use('/api/settings', settingsRouter);

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((err, _req, res, _next) => {
    console.error('CMS API error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  });

  return app;
}

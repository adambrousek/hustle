import { Router } from 'express';
import {
  createPage,
  deletePage,
  getPage,
  getPageBySlug,
  getResolvedPage,
  listPages,
  updatePage,
} from '../db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const pages = await listPages();
    res.json(pages);
  } catch (err) {
    next(err);
  }
});

router.get('/slug/:slug', async (req, res, next) => {
  try {
    const page = await getResolvedPage(req.params.slug);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const page = await getPage(req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const page = await createPage(req.body);
    res.status(201).json(page);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const existing = await getPage(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Page not found' });

    if (existing.kind === 'legacy') {
      const page = await updatePage(req.params.id, {
        title: req.body.title ?? existing.title,
      });
      return res.json(page);
    }

    const page = await updatePage(req.params.id, req.body);
    res.json(page);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await deletePage(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Page not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;

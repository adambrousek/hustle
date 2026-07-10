import { Router } from 'express';
import {
  createLibrarySection,
  deleteLibrarySection,
  getLibrarySection,
  listLibrarySections,
  updateLibrarySection,
} from '../db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const sections = await listLibrarySections();
    res.json(sections);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const section = await getLibrarySection(req.params.id);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const section = await createLibrarySection(req.body);
    res.status(201).json(section);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const section = await updateLibrarySection(req.params.id, req.body);
    if (!section) return res.status(404).json({ error: 'Section not found' });
    res.json(section);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await deleteLibrarySection(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Section not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;

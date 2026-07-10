import { Router } from 'express';
import { getSettings, setHomepagePageId } from '../db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

router.put('/homepage', async (req, res, next) => {
  try {
    const settings = await setHomepagePageId(req.body.pageId ?? null);
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

export default router;

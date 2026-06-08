import express from 'express';
import RecyclingCategory from '../models/RecyclingCategory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cats = await RecyclingCategory.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: cats });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await RecyclingCategory.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const cat = await RecyclingCategory.create(req.body);
    res.status(201).json({ success: true, data: cat });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await RecyclingCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: updated });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await RecyclingCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

export default router;

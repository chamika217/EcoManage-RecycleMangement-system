import express from 'express';
import CollectionRequest from '../models/CollectionRequest.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/requests  (public)
router.get('/', async (req, res) => {
  try {
    const requests = await CollectionRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// GET /api/requests/:id  (public - for status tracking)
router.get('/:id', async (req, res) => {
  try {
    const item = await CollectionRequest.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

// POST /api/requests  (public)
router.post('/', async (req, res) => {
  try {
    const newReq = await CollectionRequest.create(req.body);
    res.status(201).json({ success: true, data: newReq });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
});

// PUT /api/requests/:id  (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await CollectionRequest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: updated });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
});

// DELETE /api/requests/:id  (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await CollectionRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

export default router;

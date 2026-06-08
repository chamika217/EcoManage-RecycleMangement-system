import express from 'express';
import CollectionTeam from '../models/CollectionTeam.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teams = await CollectionTeam.find().sort({ createdAt: -1 });
    res.json({ success: true, data: teams });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await CollectionTeam.findById(req.params.id);
    if (!team) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: team });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const team = await CollectionTeam.create(req.body);
    res.status(201).json({ success: true, data: team });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await CollectionTeam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: updated });
  } catch (err) { res.status(400).json({ success: false, error: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await CollectionTeam.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

export default router;

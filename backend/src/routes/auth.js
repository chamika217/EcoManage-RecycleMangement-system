import express from 'express';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminUser.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ success: true, token, admin: { id: admin._id, username: admin.username, email: admin.email } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/auth/seed  — run once to create admin
router.get('/seed', async (req, res) => {
  try {
    const existing = await AdminUser.findOne({ email: 'admin@waste.com' });
    if (existing) return res.json({ success: true, message: 'Admin already exists. Email: admin@waste.com | Password: Admin@123' });

    await AdminUser.create({ username: 'admin', email: 'admin@waste.com', password: 'Admin@123' });
    res.json({ success: true, message: 'Admin created! Email: admin@waste.com | Password: Admin@123' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

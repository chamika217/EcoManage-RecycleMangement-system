import express from 'express';
import CollectionRequest from '../models/CollectionRequest.js';
import Schedule from '../models/Schedule.js';
import RecyclingCategory from '../models/RecyclingCategory.js';
import CollectionTeam from '../models/CollectionTeam.js';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [
      totalRequests, pendingRequests, approvedRequests, completedRequests,
      totalSchedules, completedSchedules, totalCategories, totalTeams, totalMessages,
      recentRequests, upcomingSchedules
    ] = await Promise.all([
      CollectionRequest.countDocuments(),
      CollectionRequest.countDocuments({ status: 'pending' }),
      CollectionRequest.countDocuments({ status: 'approved' }),
      CollectionRequest.countDocuments({ status: 'completed' }),
      Schedule.countDocuments(),
      Schedule.countDocuments({ status: 'completed' }),
      RecyclingCategory.countDocuments({ isActive: true }),
      CollectionTeam.countDocuments({ isActive: true }),
      ContactMessage.countDocuments(),
      CollectionRequest.find().sort({ createdAt: -1 }).limit(5),
      Schedule.find({ status: 'scheduled' }).populate('team').sort({ collectionDate: 1 }).limit(5),
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalRequests, pendingRequests, approvedRequests, completedRequests,
          totalSchedules, completedSchedules, totalCategories, totalTeams, totalMessages,
        },
        recentRequests,
        upcomingSchedules,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

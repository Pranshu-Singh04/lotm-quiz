import express from 'express';
import Result from '../models/Result.js';

const router = express.Router();

// GET /api/analytics/distribution
// Returns: how many people got each pathway
router.get('/distribution', async (req, res) => {
  const data = await Result.aggregate([
    { $group: { _id: '$pathway', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.json(data);
});

// GET /api/analytics/total
router.get('/total', async (req, res) => {
  const count = await Result.countDocuments();
  res.json({ total: count });
});

export default router;

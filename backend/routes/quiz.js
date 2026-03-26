import express from 'express';
import Result from '../models/Result.js';

const router = express.Router();

// POST /api/quiz/submit
router.post('/submit', async (req, res) => {
  const { pathway, scores, questionIds, sessionId } = req.body;
  const result = await Result.create({ pathway, scores, questionIds, sessionId });
  res.json({ success: true, id: result._id });
});

export default router;
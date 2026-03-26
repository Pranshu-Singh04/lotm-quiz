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
```

This gives you a **live analytics endpoint** — you can display "X people have taken this quiz, Y% got Reader" on the result screen. That's what makes it feel like a real product.

---

## Step 4 — Connect Frontend to Backend

In `frontend/.env`:
```
VITE_API_URL=http://localhost:3001
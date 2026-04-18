// backend/routes/quiz.js — CommonJS, Upstash Redis
const express = require('express')
const router  = express.Router()

const VALID_PATHWAYS = new Set([
  'fool','error','door','visionary','sun','tyrant','whitetower','hangedman',
  'darkness','death','twilightgiant','demoness','redpriest','hermit','paragon',
  'wheeloffortune','mother','moon','abyss','chained','blackemperor','justiciar',
])

router.post('/submit', async (req, res) => {
  try {
    const { pathway, scores, sessionId } = req.body
    const redis = req.redis

    if (!pathway || !VALID_PATHWAYS.has(pathway)) {
      return res.status(400).json({ error: 'Invalid pathway' })
    }

    // Increment pathway count + global total (atomic)
    await Promise.all([
      redis.hincrby('pathway_counts', pathway, 1),
      redis.incr('total_count'),
    ])

    // Store last 500 sessions in a list (optional — for future analytics)
    if (sessionId) {
      const entry = JSON.stringify({ pathway, sessionId, ts: Date.now() })
      await redis.lpush('recent_sessions', entry)
      await redis.ltrim('recent_sessions', 0, 499)
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

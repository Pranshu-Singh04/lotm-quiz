// backend/routes/analytics.js — CommonJS, Upstash Redis
const express = require('express')
const router  = express.Router()

router.get('/distribution', async (req, res) => {
  try {
    const redis  = req.redis
    const counts = await redis.hgetall('pathway_counts') || {}

    // Format same shape as old Mongo aggregate: [{ _id, count }]
    const data = Object.entries(counts)
      .map(([_id, count]) => ({ _id, count: parseInt(count, 10) }))
      .sort((a, b) => b.count - a.count)

    res.json(data)
  } catch (err) {
    console.error('Distribution error:', err)
    res.status(500).json({ error: err.message })
  }
})

router.get('/total', async (req, res) => {
  try {
    const redis = req.redis
    const total = await redis.get('total_count')
    res.json({ total: parseInt(total, 10) || 0 })
  } catch (err) {
    console.error('Total error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

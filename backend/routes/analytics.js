// backend/routes/analytics.js — CommonJS
const express = require('express')
const Result = require('../models/Result')
const router = express.Router()

router.get('/distribution', async (req, res) => {
  try {
    const data = await Result.aggregate([
      { $group: { _id: '$pathway', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/total', async (req, res) => {
  try {
    const count = await Result.countDocuments()
    res.json({ total: count })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
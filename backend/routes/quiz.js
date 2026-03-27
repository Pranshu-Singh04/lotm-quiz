// backend/routes/quiz.js — CommonJS
const express = require('express')
const Result = require('../models/Result')
const router = express.Router()

router.post('/submit', async (req, res) => {
  try {
    const { pathway, scores, questionIds, sessionId } = req.body
    const result = await Result.create({ pathway, scores, questionIds, sessionId })
    res.json({ success: true, id: result._id })
  } catch (err) {
    console.error('Submit error:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
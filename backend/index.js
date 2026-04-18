// backend/index.js — CommonJS, Upstash Redis
const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const { Redis } = require('@upstash/redis')

if (!process.env.UPSTASH_URL || !process.env.UPSTASH_TOKEN) {
  console.error('FATAL: UPSTASH_URL and UPSTASH_TOKEN must be set')
  process.exit(1)
}

const redis = new Redis({
  url:   process.env.UPSTASH_URL,
  token: process.env.UPSTASH_TOKEN,
})

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

// Attach redis to every request
app.use((req, _res, next) => { req.redis = redis; next() })

app.get('/health', async (req, res) => {
  try {
    await redis.ping()
    res.json({ status: 'ok', db: 'upstash', timestamp: new Date().toISOString() })
  } catch (err) {
    res.status(503).json({ status: 'error', error: err.message })
  }
})

const quizRoutes      = require('./routes/quiz')
const analyticsRoutes = require('./routes/analytics')

app.use('/api/quiz',      quizRoutes)
app.use('/api/analytics', analyticsRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))

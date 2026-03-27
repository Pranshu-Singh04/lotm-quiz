// backend/index.js — CommonJS version, no "type":"module" needed
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const quizRoutes = require('./routes/quiz')
const analyticsRoutes = require('./routes/analytics')

app.use('/api/quiz', quizRoutes)
app.use('/api/analytics', analyticsRoutes)

const PORT = process.env.PORT || 3001

if (!process.env.MONGO_URI) {
  console.error('FATAL: MONGO_URI is not set')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
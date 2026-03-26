// backend/index.js
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import quizRoutes from './routes/quiz.js'
import analyticsRoutes from './routes/analytics.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}))
app.use(express.json())

app.use('/api/quiz', quizRoutes)
app.use('/api/analytics', analyticsRoutes)

// Health check — Railway pings this to confirm your app is alive
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const PORT = process.env.PORT || 3001

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err)
    process.exit(1)
  })
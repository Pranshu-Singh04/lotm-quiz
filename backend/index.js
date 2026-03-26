import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './routes/quiz.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/quiz', quizRoutes);
app.use('/api/analytics', analyticsRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(3001, () => console.log('Server running')));
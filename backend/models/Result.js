// backend/models/Result.js — CommonJS
const mongoose = require('mongoose')

const ResultSchema = new mongoose.Schema({
  pathway:     { type: String, required: true },
  scores:      { type: Object, required: true },
  questionIds: [String],
  sessionId:   String,
  completedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Result', ResultSchema)
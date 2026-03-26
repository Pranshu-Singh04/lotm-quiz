import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  pathway: String,          // winning pathway
  scores: Object,           // all 8 pathway scores
  questionIds: [String],    // which 20 were selected
  completedAt: { type: Date, default: Date.now },
  sessionId: String,        // random UUID, no personal data
});

export default mongoose.model('Result', ResultSchema);
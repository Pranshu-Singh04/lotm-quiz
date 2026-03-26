// src/utils/scoring.js
export function computeScores(selectedQuestions, answers) {
  const scores = { fool:0, reader:0, seer:0, ...etc };
  selectedQuestions.forEach((q, i) => {
    const chosen = q.opts[answers[i]];
    Object.entries(chosen.s).forEach(([k, v]) => {
      scores[k] += v * q.w;
    });
  });
  return scores;
}
// frontend/src/utils/scoring.js
export function computeScores(selectedQuestions, answers) {
  const scores = {
    fool: 0, error: 0, door: 0, visionary: 0, sun: 0,
    tyrant: 0, whitetower: 0, hangedman: 0, darkness: 0,
    death: 0, twilightgiant: 0, demoness: 0, redpriest: 0,
    hermit: 0, paragon: 0, wheeloffortune: 0, mother: 0,
    moon: 0, abyss: 0, chained: 0, blackemperor: 0, justiciar: 0,
  }

  selectedQuestions.forEach((q, i) => {
    const answerIndex = answers[i]
    if (answerIndex === null || answerIndex === undefined) return
    const chosen = q.opts[answerIndex]
    if (!chosen || !chosen.s) return
    Object.entries(chosen.s).forEach(([pathway, value]) => {
      if (pathway in scores) {
        scores[pathway] += value * q.w
      }
    })
  })

  return scores
}

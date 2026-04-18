// frontend/src/pages/QuizPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import questions from '../data/questions.json'
import { computeScores } from '../utils/scoring'

function pickQuestions() {
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)
  const w1 = shuffle(questions.filter(q => q.w === 1))
  const w2 = shuffle(questions.filter(q => q.w === 2))
  const w3 = shuffle(questions.filter(q => q.w === 3))
  // 25 questions: 5×w1 + 9×w2 + 11×w3 from 110-question bank
  return shuffle([...w1.slice(0, 5), ...w2.slice(0, 9), ...w3.slice(0, 11)])
}

export default function QuizPage() {
  const navigate = useNavigate()
  const [selected] = useState(() => pickQuestions())
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(new Array(25).fill(null))

  const q = selected[current]
  const glyphs = ['I', 'II', 'III', 'IV']

  function selectOption(i) {
    const updated = [...answers]
    updated[current] = i
    setAnswers(updated)
  }

  function next() {
    if (answers[current] === null) return
    if (current < selected.length - 1) {
      setCurrent(current + 1)
    } else {
      const scores = computeScores(selected, answers)
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
      const pathway = sorted[0][0]
      navigate('/loading', {
        state: { scores, pathway, selectedQuestions: selected, answers }
      })
    }
  }

  function prev() {
    if (current > 0) setCurrent(current - 1)
  }

  const progress = ((current + 1) / selected.length) * 100

  return (
    <div className="screen">
      {/* Progress */}
      <div className="progress-bar-container">
        <div className="progress-meta">
          <span>{q.s}</span>
          <span>{current + 1} / {selected.length}</span>
        </div>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Weight indicator */}
      <div className="weight-badge">
        {[1, 2, 3].map(n => (
          <span key={n} className={`weight-pip${n <= q.w ? ' lit' : ''}`} />
        ))}
        <span>Question Weight</span>
      </div>

      {/* Question — animated on change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22 }}
          style={{ width: '100%' }}
        >
          <h2 className="question-text">{q.q}</h2>
          {q.sub && <p className="question-subtext">{q.sub}</p>}

          <div className="options-grid">
            {q.opts.map((opt, i) => (
              <motion.div
                key={i}
                className={`option-card${answers[current] === i ? ' selected' : ''}`}
                onClick={() => selectOption(i)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.25 }}
              >
                <span className="option-glyph">{glyphs[i]}</span>
                <div>
                  <div className="option-text">{opt.t}</div>
                  {opt.sub && <div className="option-subtext">{opt.sub}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="question-nav">
        <button
          className="btn-secondary"
          onClick={prev}
          style={{ opacity: current > 0 ? 1 : 0, pointerEvents: current > 0 ? 'auto' : 'none' }}
        >
          ← Previous
        </button>
        <button
          className="btn-primary"
          onClick={next}
          disabled={answers[current] === null}
        >
          {current === selected.length - 1 ? 'Complete Evaluation →' : 'Next →'}
        </button>
      </div>
      <p className="nav-hint">Select an answer to continue</p>
    </div>
  )
}

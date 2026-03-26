import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import questions from '../data/questions.json'
import { computeScores } from '../utils/scoring'

function pickQuestions() {
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)
  const w1 = shuffle(questions.filter(q => q.w === 1))
  const w2 = shuffle(questions.filter(q => q.w === 2))
  const w3 = shuffle(questions.filter(q => q.w === 3))
  return shuffle([...w1.slice(0, 5), ...w2.slice(0, 8), ...w3.slice(0, 7)])
}

export default function QuizPage() {
  const navigate = useNavigate()
  const [selected] = useState(() => pickQuestions())
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(new Array(20).fill(null))

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
      // Quiz complete — compute scores and navigate to result
      const scores = computeScores(selected, answers)
      navigate('/result', {
        state: { scores, selectedQuestions: selected, answers }
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
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Weight indicator */}
      <div className="weight-badge">
        {[1, 2, 3].map(n => (
          <span key={n} className={`weight-pip ${n <= q.w ? 'lit' : ''}`} />
        ))}
        <span>Question Weight</span>
      </div>

      {/* Question */}
      <h2 className="question-text">{q.q}</h2>
      {q.sub && <p className="question-subtext">{q.sub}</p>}

      {/* Options */}
      <div className="options-grid">
        {q.opts.map((opt, i) => (
          <div
            key={i}
            className={`option-card ${answers[current] === i ? 'selected' : ''}`}
            onClick={() => selectOption(i)}
          >
            <span className="option-glyph">{glyphs[i]}</span>
            <div>
              <div className="option-text">{opt.t}</div>
              {opt.sub && <div className="option-subtext">{opt.sub}</div>}
            </div>
          </div>
        ))}
      </div>

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
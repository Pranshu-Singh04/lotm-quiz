// frontend/src/pages/WarningPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { prewarmModel } from '../utils/semanticScoring'

export default function WarningPage() {
  const navigate = useNavigate()
  const [accepted, setAccepted] = useState(false)
  const [modelProgress, setModelProgress] = useState(0)   // 0–100
  const [modelReady,    setModelReady]    = useState(false)

  useEffect(() => {
    // Start downloading model while user reads — by the time they finish
    // 25 questions the 90 MB model will be cached, making the pipeline instant.
    prewarmModel(info => {
      if (info.status === 'progress') {
        setModelProgress(Math.round(info.progress ?? 0))
      } else if (info.status === 'ready' || info.progress >= 100) {
        setModelProgress(100)
        setModelReady(true)
      }
    })
  }, [])

  return (
    <div className="screen">
      <p className="title-eyebrow">Mandatory Pre-Evaluation Disclosure</p>
      <h1 className="display" style={{ fontSize: 'clamp(18px, 4vw, 32px)' }}>
        Read Before You Proceed
      </h1>

      {/* AI engine pre-load badge */}
      <AnimatePresence>
        {!modelReady && (
          <motion.div
            className="model-badge"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <div className="model-badge-dot" />
            <span>
              {modelProgress > 0
                ? `AI engine loading… ${modelProgress}%`
                : 'AI engine initialising…'}
            </span>
            <div className="model-badge-bar">
              <motion.div
                className="model-badge-fill"
                animate={{ width: `${modelProgress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>
        )}
        {modelReady && (
          <motion.div
            className="model-badge model-badge--ready"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span className="model-badge-check">✓</span>
            <span>Neural engine ready — analysis will be instant</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="warning-screen-box">
        <p className="w-title">⚠ Official Bureau Notice</p>

        {[
          { icon: '☠', title: 'This is a fictional psychological exercise.',
            body: 'The Beyondgod Street Occult Evaluation Bureau does not exist. Klein Moretti is not available for consultation.' },
          { icon: '🕯', title: 'The author bears zero responsibility for your survival in Backlund.',
            body: 'If you are subsequently hunted by a Sequence 4 Beyonder or contaminated by a characteristic — this form is legally inadmissible.' },
          { icon: '📖', title: 'This is a fan-made project',
            body: 'based on Lord of the Mysteries by Cuttlefish That Loves Diving. All Pathway lore belongs to the original author.' },
          { icon: '🧠', title: 'Psychological questions may be uncomfortably accurate.',
            body: 'The Bureau does not apologize for this. Self-knowledge is the first prerequisite for Pathway ascension.' },
          { icon: '🌀', title: 'Corruption risk scores are fictional.',
            body: 'If your result shows 90% corruption risk, you answered like someone who absolutely would be contaminated.' },
          { icon: '⚙', title: 'Twenty-two Pathways evaluated via in-browser AI.',
            body: 'Neural analysis runs entirely on your device — no data leaves your browser. Not all ends are good.' },
        ].map((item, i) => (
          <div className="warning-item" key={i}>
            <span className="w-icon">{item.icon}</span>
            <p><strong>{item.title}</strong> {item.body}</p>
          </div>
        ))}

        <div className="ack-row">
          <input
            type="checkbox"
            id="ack"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
          />
          <label htmlFor="ack">
            I understand this is a fictional psychological exercise. I accept full responsibility
            for my results. I acknowledge the Tarot Club has not been notified of this evaluation.
          </label>
        </div>
      </div>

      <button
        className="btn-primary"
        disabled={!accepted}
        onClick={() => navigate('/quiz')}
      >
        I ACCEPT THE TERMS · PROCEED
      </button>

      <button className="btn-secondary" onClick={() => navigate('/')}>
        ← Return to Safety
      </button>
    </div>
  )
}

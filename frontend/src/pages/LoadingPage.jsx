// frontend/src/pages/LoadingPage.jsx
import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { computeSemanticScores, mergeScores } from '../utils/semanticScoring'
import { PATHWAYS } from '../data/pathways'

const PIPELINE_STEPS = [
  { id: 1, label: 'Initializing neural engine',    icon: '⬡' },
  { id: 2, label: 'Encoding response corpus',      icon: '◈' },
  { id: 3, label: 'Profiling pathway vectors',     icon: '✦' },
  { id: 4, label: 'Running cosine analysis',       icon: '◎' },
  { id: 5, label: 'Integrating weighted scores',   icon: '⊕' },
  { id: 6, label: 'Finalizing alignment',          icon: '⧖' },
]

function PipelineStep({ step, status, progress, label }) {
  const isActive  = status === 'active'
  const isDone    = status === 'done'
  const isPending = status === 'pending'

  return (
    <motion.div
      className={`pipeline-step pipeline-step--${status}`}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
      transition={{ delay: step.id * 0.06, duration: 0.4 }}
    >
      <div className="pipeline-step-icon">
        {isDone
          ? <span className="pipeline-check">✓</span>
          : isActive
            ? <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >{step.icon}</motion.span>
            : <span>{step.icon}</span>
        }
      </div>
      <div className="pipeline-step-body">
        <div className="pipeline-step-label">{label || step.label}</div>
        {isActive && (
          <div className="pipeline-bar-track">
            <motion.div
              className="pipeline-bar-fill"
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>
      <div className={`pipeline-step-badge pipeline-step-badge--${status}`}>
        {isDone ? 'done' : isActive ? 'running' : 'queued'}
      </div>
    </motion.div>
  )
}

export default function LoadingPage() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { scores, pathway: traditionalPathway, selectedQuestions, answers } = location.state || {}

  const [activeStep,   setActiveStep]   = useState(1)
  const [stepProgress, setStepProgress] = useState(0)
  const [stepLabel,    setStepLabel]    = useState('')
  const [doneSteps,    setDoneSteps]    = useState(new Set())
  const [finalPathway, setFinalPathway] = useState(null)
  const [statusText,   setStatusText]   = useState('Bureau analysis in progress…')
  const [mlFailed,     setMlFailed]     = useState(false)

  const ranRef = useRef(false)

  useEffect(() => {
    if (ranRef.current) return
    ranRef.current = true

    if (!scores) {
      navigate('/', { replace: true })
      return
    }

    runPipeline()
  }, [])

  async function runPipeline() {
    // Build answer text array from selected questions + answers
    const answerTexts = (selectedQuestions || []).map((q, i) => {
      const idx = answers?.[i]
      return (idx !== null && idx !== undefined && q.opts[idx])
        ? q.opts[idx].t
        : ''
    }).filter(Boolean)

    try {
      const semantic = await computeSemanticScores(
        answerTexts,
        PATHWAYS,
        ({ step, label, progress }) => {
          setActiveStep(step)
          setStepLabel(label)
          setStepProgress(progress)
          if (progress >= 1) {
            setDoneSteps(prev => new Set([...prev, step]))
          }
        }
      )

      // ── Step 5: Merge ─────────────────────────────────────────────
      setActiveStep(5)
      setStepLabel('Integrating weighted scores…')
      setStepProgress(0)
      await delay(300)
      setStepProgress(0.5)
      const hybrid = mergeScores(scores, semantic)
      await delay(300)
      setStepProgress(1)
      setDoneSteps(prev => new Set([...prev, 5]))

      // ── Step 6: Finalize ──────────────────────────────────────────
      setActiveStep(6)
      setStepLabel('Finalizing alignment…')
      setStepProgress(0)
      await delay(400)

      const winner = Object.entries(hybrid).sort((a, b) => b[1] - a[1])[0][0]
      setFinalPathway(winner)
      setStepProgress(1)
      setDoneSteps(prev => new Set([...prev, 6]))
      setStatusText(`Alignment confirmed: ${PATHWAYS[winner]?.name ?? winner}`)

      await delay(900)
      navigate('/result', {
        state: { scores, pathway: winner, selectedQuestions, answers },
      })

    } catch (err) {
      console.warn('Semantic scoring unavailable, using classical method:', err)
      setMlFailed(true)

      // Graceful fallback — complete remaining steps visually (start from 1, not stale state)
      for (let s = 1; s <= 6; s++) {
        setActiveStep(s)
        setStepProgress(1)
        await delay(220)
        setDoneSteps(prev => new Set([...prev, s]))
      }
      setStatusText('Alignment complete (classical method)')
      await delay(600)
      navigate('/result', {
        state: { scores, pathway: traditionalPathway, selectedQuestions, answers },
      })
    }
  }

  const pathway = finalPathway ? PATHWAYS[finalPathway] : null

  return (
    <div className="screen loading-screen">

      {/* ── Ritual circle ─────────────────────────────────────────── */}
      <div className="ritual-wrap" aria-hidden="true">
        <motion.div
          className="ritual-ring ritual-ring--outer"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="ritual-ring ritual-ring--mid"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="ritual-ring ritual-ring--inner"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <div className="ritual-core">
          <AnimatePresence mode="wait">
            {pathway ? (
              <motion.span
                key="result"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                style={{ color: pathway.color, fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.04em' }}
              >
                {pathway.name}
              </motion.span>
            ) : (
              <motion.span
                key="glyph"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '1.6rem', color: 'var(--gold)' }}
              >
                ✦
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Header ────────────────────────────────────────────────── */}
      <motion.div
        className="loading-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1,  y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="title-eyebrow">Beyondgod Street · Sequence Analysis Engine</p>
        <h2 className="loading-title">Running ML Inference</h2>
        <p className="loading-subtitle">MiniLM-L6-v2 · in-browser · zero telemetry</p>
      </motion.div>

      {/* ── Pipeline ──────────────────────────────────────────────── */}
      <motion.div
        className="pipeline-panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {PIPELINE_STEPS.map(step => {
          const status = doneSteps.has(step.id) ? 'done'
                       : step.id === activeStep   ? 'active'
                       : 'pending'
          return (
            <PipelineStep
              key={step.id}
              step={step}
              status={status}
              progress={step.id === activeStep ? stepProgress : 0}
              label={step.id === activeStep ? stepLabel : undefined}
            />
          )
        })}
      </motion.div>

      {/* ── Status ────────────────────────────────────────────────── */}
      <motion.p
        className="loading-status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={statusText}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1,  y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {mlFailed ? '⚠ Neural engine unavailable — classical method applied' : statusText}
          </motion.span>
        </AnimatePresence>
      </motion.p>

    </div>
  )
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

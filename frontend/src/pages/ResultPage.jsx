// frontend/src/pages/ResultPage.jsx
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { PATHWAYS } from '../data/pathways'
import GlobalStats from '../components/GlobalStats'
import ShareCard from '../components/ShareCard'

// Tarot card symbols per pathway (all 22 canonical pathways)
const TAROT_GLYPHS = {
  fool:          { roman: '0',    sym: '🃏', label: 'The Fool'           },
  error:         { roman: 'XV',   sym: '⧖',  label: 'The Devil'          },
  door:          { roman: 'VI',   sym: '🗝',  label: 'The Lovers'         },
  visionary:     { roman: 'XI',   sym: '⚖',  label: 'Justice'            },
  sun:           { roman: 'XIX',  sym: '☀',  label: 'The Sun'            },
  tyrant:        { roman: 'V',    sym: '⚓',  label: 'The Hierophant'     },
  whitetower:    { roman: 'XVI',  sym: '◈',  label: 'The Tower'          },
  hangedman:     { roman: 'XII',  sym: '✦',  label: 'The Hanged Man'     },
  darkness:      { roman: 'II',   sym: '◎',  label: 'The High Priestess' },
  death:         { roman: 'XIII', sym: '♾',  label: 'Death'              },
  twilightgiant: { roman: 'VII',  sym: '⚔',  label: 'The Chariot'        },
  demoness:      { roman: 'III',  sym: '♦',  label: 'The Empress'        },
  redpriest:     { roman: 'IV',   sym: '⚜',  label: 'The Emperor'        },
  hermit:        { roman: 'IX',   sym: '🕯', label: 'The Hermit'         },
  paragon:       { roman: 'VIII', sym: '⚙',  label: 'Strength'           },
  wheeloffortune:{ roman: 'X',    sym: '⊕',  label: 'Wheel of Fortune'   },
  mother:        { roman: 'XXI',  sym: '✿',  label: 'The World'          },
  moon:          { roman: 'XVIII',sym: '☽',  label: 'The Moon'           },
  abyss:         { roman: 'XV',   sym: '👁',  label: 'The Devil'          },
  chained:       { roman: 'XIV',  sym: '⛓',  label: 'Temperance'         },
  blackemperor:  { roman: 'IV',   sym: '♚',  label: 'The Emperor'        },
  justiciar:     { roman: 'XI',   sym: '⚖',  label: 'Justice'            },
}

// Brief compatibility notes per pathway pair archetype
const COMPAT_NOTE = {
  // observer cluster
  fool:       'Shares your perceptive, paradoxical nature',
  visionary:  'Shares your analytical, observational mindset',
  whitetower: 'Shares your drive to understand hidden truths',
  hermit:     'Shares your contemplative, knowledge-seeking nature',
  // warrior cluster
  twilightgiant: 'Shares your direct, action-oriented courage',
  redpriest:  'Shares your intensity and willingness to act',
  tyrant:     'Shares your commanding, protective instincts',
  // protector cluster
  darkness:   'Shares your protective, watchful nature',
  mother:     'Shares your nurturing, life-affirming instincts',
  sun:        'Shares your principled, inspiring presence',
  // philosopher cluster
  death:      'Shares your philosophical acceptance of reality',
  hangedman:  'Shares your acceptance of sacrifice and cost',
  // wanderer cluster
  door:       'Shares your restless, freedom-seeking nature',
  error:      'Shares your adaptive, opportunistic mindset',
  wheeloffortune: 'Shares your comfort with chaos and change',
  // creator cluster
  paragon:    'Shares your drive to create and perfect',
  // primal cluster
  moon:       'Shares your cyclical, instinct-driven nature',
  chained:    'Shares your resilience under constraint',
  // power cluster
  abyss:      'Shares your awareness of desire and power',
  blackemperor:'Shares your strategic, commanding vision',
  demoness:   'Shares your fierce independence',
  justiciar:  'Shares your principled sense of justice',
}

function TarotCard({ pathwayKey, pathway, onDone }) {
  const [flipped, setFlipped] = useState(false)
  const glyph = TAROT_GLYPHS[pathwayKey] || { roman: 'I', sym: '✦', label: pathway?.name }

  useEffect(() => {
    const t1 = setTimeout(() => setFlipped(true), 900)
    const t2 = setTimeout(() => onDone(), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="tarot-scene">
      <motion.div
        className="tarot-card-wrap"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back face */}
        <div className="tarot-face tarot-back">
          <div className="tarot-back-pattern">
            {Array.from({length: 25}).map((_, i) => (
              <span key={i} className="tarot-back-cell">✦</span>
            ))}
          </div>
          <p className="tarot-back-label">Beyondgod Street Bureau</p>
        </div>

        {/* Front face */}
        <div className="tarot-face tarot-front" style={{ '--card-color': pathway?.color || '#c9973a' }}>
          <div className="tarot-corner tl">{glyph.roman}</div>
          <div className="tarot-corner tr">{glyph.roman}</div>
          <div className="tarot-sym">{glyph.sym}</div>
          <div className="tarot-card-name">{pathway?.name}</div>
          <div className="tarot-card-label">{glyph.label}</div>
          <div className="tarot-corner bl">{glyph.roman}</div>
          <div className="tarot-corner br">{glyph.roman}</div>
        </div>
      </motion.div>
      <motion.p
        className="tarot-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: flipped ? 1 : 0 }}
        transition={{ delay: 0.5 }}
      >
        The Pathway has chosen
      </motion.p>
    </div>
  )
}

function CompatCard({ pathwayKey, type }) {
  const p = PATHWAYS[pathwayKey]
  const glyph = TAROT_GLYPHS[pathwayKey]
  if (!p) return null
  return (
    <div className={`compat-card compat-card--${type}`} style={{ '--acc': p.color }}>
      <div className="compat-sym" style={{ color: p.color }}>{glyph?.sym}</div>
      <div className="compat-body">
        <div className="compat-name" style={{ color: p.color }}>{p.name}</div>
        <div className="compat-seq">{p.sequence}</div>
        <div className="compat-note">
          {type === 'shadow'
            ? 'Divergent — represents your psychological opposite'
            : COMPAT_NOTE[pathwayKey] || 'Secondary alignment detected'}
        </div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  const location = useLocation()
  const navigate  = useNavigate()
  const { scores, pathway: pathwayKey, selectedQuestions } = location.state || {}

  const [globalStats, setGlobalStats] = useState(null)
  const [copied,      setCopied]      = useState(false)
  const [cardDone,    setCardDone]    = useState(false)

  const pathway = PATHWAYS[pathwayKey]

  useEffect(() => {
    if (!pathwayKey) return
    async function submitAndFetch() {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/quiz/submit`,
          {
            pathway: pathwayKey,
            scores,
            questionIds: selectedQuestions?.map(q => q.id) || [],
            sessionId: crypto.randomUUID(),
          }
        )
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/analytics/distribution`
        )
        // Backend returns [{_id, count}] — convert to {key: count} for GlobalStats
        const statsObj = {}
        res.data.forEach(({ _id, count }) => { statsObj[_id] = count })
        setGlobalStats(statsObj)
      } catch (err) {
        console.error('Backend unavailable:', err)
      }
    }
    submitAndFetch()
  }, [])

  if (!pathway) {
    return (
      <div className="screen">
        <p style={{ color: 'var(--ash)' }}>No result found.</p>
        <button className="btn-primary" style={{ marginTop: '24px' }} onClick={() => navigate('/')}>
          Return to Bureau
        </button>
      </div>
    )
  }

  const sorted   = scores ? Object.entries(scores).sort((a, b) => b[1] - a[1]) : []
  const maxScore = sorted.length > 0 ? sorted[0][1] || 1 : 1

  // Compatibility: 2nd–4th highest = resonances, last = shadow
  const resonances  = sorted.slice(1, 4).map(([k]) => k)
  const shadowKey   = sorted.length > 1 ? sorted[sorted.length - 1][0] : null

  function share() {
    const text =
      `Pathway Alignment: ${pathway.name} (${pathway.sequence})\n` +
      `Stability ${pathway.stability}% · Corruption ${pathway.corruption}% · Survival ${pathway.survival}%\n` +
      `"${pathway.warning.slice(0, 80)}..."\n` +
      `lotm-quiz.vercel.app`
    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  if (!cardDone) {
    return (
      <div className="screen" style={{ minHeight: '100vh', justifyContent: 'center', zIndex: 2 }}>
        <TarotCard pathwayKey={pathwayKey} pathway={pathway} onDone={() => setCardDone(true)} />
      </div>
    )
  }

  return (
    <div className="screen result-screen">

      {/* ── Pathway Header ── */}
      <motion.div className="result-header"
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <p className="title-eyebrow">Pathway Alignment Complete</p>
        <h1 className="display" style={{ color: pathway.color }}>{pathway.name}</h1>
        <p className="result-sequence">{pathway.sequence}</p>
      </motion.div>

      {/* ── Description ── */}
      <motion.div className="lore-box"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}>
        {pathway.description}
      </motion.div>

      <div className="divider">✦ ✦ ✦</div>

      {/* ── Metric Bars ── */}
      <motion.div className="stats-grid"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}>
        <StatBar label="Stability Index"       value={pathway.stability}   color="#4a8ac9"      delay={0.7}  />
        <StatBar label="Corruption Risk"       value={pathway.corruption}  color="#c94a4a"      delay={0.85} />
        <StatBar label="Survival Rating"       value={pathway.survival}    color="#6a9a4a"      delay={1.0}  />
        <StatBar label="Advancement Potential" value={pathway.advancement} color={pathway.color} delay={1.15}/>
      </motion.div>

      <div className="divider">✦ ✦ ✦</div>

      {/* ── Strengths & Risks ── */}
      <motion.div className="traits-grid"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}>
        <div className="traits-col">
          <h3 className="traits-heading traits-heading--strength">Core Strengths</h3>
          {pathway.strengths.map((s, i) => (
            <div key={i} className="trait-item">
              <span className="trait-icon trait-icon--strength">{s.icon}</span>
              <div>
                <div className="trait-name">{s.name}</div>
                <div className="trait-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="traits-col">
          <h3 className="traits-heading traits-heading--risk">Corruption Vectors</h3>
          {pathway.risks.map((r, i) => (
            <div key={i} className="trait-item">
              <span className="trait-icon trait-icon--risk">{r.icon}</span>
              <div>
                <div className="trait-name">{r.name}</div>
                <div className="trait-desc">{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="divider">✦ ✦ ✦</div>

      {/* ── Score Breakdown ── */}
      {sorted.length > 0 && (
        <motion.div className="score-breakdown"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}>
          <h3 className="section-heading">Alignment Scores</h3>
          {sorted.map(([key, val], i) => {
            const pct = maxScore > 0 ? (val / maxScore) * 100 : 0
            const p   = PATHWAYS[key]
            return (
              <div key={key} className={`score-row${i === 0 ? ' score-row--winner' : ''}`}>
                <div className="score-label">{p?.name || key}</div>
                <div className="score-bar-track">
                  <motion.div
                    className="score-bar-fill"
                    style={{ background: p?.color || '#c9973a' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 1.0 + i * 0.06, duration: 0.5 }}
                  />
                </div>
                <div className="score-val">{val}</div>
              </div>
            )
          })}
        </motion.div>
      )}

      <div className="divider">✦ ✦ ✦</div>

      {/* ── Pathway Compatibility ── */}
      {resonances.length > 0 && (
        <motion.div className="compat-section"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}>
          <h3 className="section-heading">Pathway Resonances</h3>
          <p className="compat-intro">
            Secondary alignment clusters detected in your response profile.
          </p>
          <div className="compat-grid">
            {resonances.map(k => (
              <CompatCard key={k} pathwayKey={k} type="resonant" />
            ))}
          </div>

          {shadowKey && (
            <>
              <h3 className="section-heading" style={{ marginTop: '28px' }}>
                Shadow Pathway
              </h3>
              <p className="compat-intro">
                Your psychological opposite — the Pathway furthest from your profile.
              </p>
              <div className="compat-grid compat-grid--shadow">
                <CompatCard pathwayKey={shadowKey} type="shadow" />
              </div>
            </>
          )}
        </motion.div>
      )}

      <div className="divider">✦ ✦ ✦</div>

      {/* ── Bureau Warning ── */}
      <motion.div className="warning-block"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}>
        <p className="warning-label">⚠ Bureau Warning</p>
        <p>{pathway.warning}</p>
      </motion.div>

      {/* ── Global Stats ── */}
      {globalStats && (
        <motion.div style={{ width: '100%', marginTop: '48px' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}>
          <GlobalStats data={globalStats} userPathway={pathwayKey} />
        </motion.div>
      )}

      {/* ── Actions ── */}
      <motion.div className="result-actions"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}>
        <button className="btn-primary" onClick={share}>
          {copied ? 'Copied to Clipboard' : 'Share Result'}
        </button>
        <ShareCard pathwayKey={pathwayKey} pathway={pathway} scores={scores} />
        <button className="btn-secondary" onClick={() => navigate('/pathways')}>
          Browse All 22 Pathways
        </button>
        <button className="btn-secondary" onClick={() => navigate('/')}>
          ← Retake Evaluation
        </button>
      </motion.div>

    </div>
  )
}

function StatBar({ label, value, color, delay }) {
  return (
    <div className="stat-bar-item">
      <div className="stat-bar-header">
        <span className="stat-bar-label">{label}</span>
        <span className="stat-bar-value">{value}%</span>
      </div>
      <div className="stat-bar-track">
        <motion.div
          className="stat-bar-fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.7 }}
        />
      </div>
    </div>
  )
}

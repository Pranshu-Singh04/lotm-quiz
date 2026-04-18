// frontend/src/pages/IntroPage.jsx
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] },
})

const CHARACTERS = [
  {
    name: 'Klein Moretti',
    title: 'The Fool',
    pathway: 'Fool Pathway · Sequence 0',
    color: '#c9973a',
    desc: 'Beyond imagination. Beyond history. The source of all Mystery.',
    // Drop your fan art image path here, e.g. '/images/klein.jpg'
    img: '/images/klein.jpg',
    // SVG silhouette fallback — top-hat gentleman
    icon: (
      <svg viewBox="0 0 120 180" width="120" height="180" fill="none">
        <ellipse cx="60" cy="38" rx="22" ry="24" fill="rgba(201,151,58,0.18)" stroke="rgba(201,151,58,0.5)" strokeWidth="1"/>
        <rect x="34" y="30" width="52" height="6" rx="1" fill="rgba(201,151,58,0.35)" stroke="rgba(201,151,58,0.5)" strokeWidth="1"/>
        <rect x="42" y="6" width="36" height="26" rx="2" fill="rgba(201,151,58,0.2)" stroke="rgba(201,151,58,0.5)" strokeWidth="1"/>
        <path d="M38 62 Q60 54 82 62 L88 130 Q60 138 32 130 Z" fill="rgba(201,151,58,0.1)" stroke="rgba(201,151,58,0.4)" strokeWidth="1"/>
        <path d="M44 128 L40 168" stroke="rgba(201,151,58,0.35)" strokeWidth="6" strokeLinecap="round"/>
        <path d="M76 128 L80 168" stroke="rgba(201,151,58,0.35)" strokeWidth="6" strokeLinecap="round"/>
        <path d="M38 100 L12 88" stroke="rgba(201,151,58,0.3)" strokeWidth="5" strokeLinecap="round"/>
        <path d="M82 100 L108 88" stroke="rgba(201,151,58,0.3)" strokeWidth="5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Alger Wilson',
    title: 'The Hanged Man',
    pathway: 'Hanged Man Pathway · Sequence 5',
    color: '#3a7ac9',
    desc: 'Commands the seas and those who sail them. Ruthless, calculating — loyalty earned, never given.',
    img: '/images/alger.jpg',
    // Pirate admiral silhouette — long coat, commanding posture
    icon: (
      <svg viewBox="0 0 120 180" width="120" height="180" fill="none">
        {/* Head */}
        <ellipse cx="60" cy="30" rx="19" ry="21" fill="rgba(58,122,201,0.18)" stroke="rgba(58,122,201,0.5)" strokeWidth="1"/>
        {/* Tricorn hat */}
        <path d="M32 22 Q60 10 88 22 Q80 14 60 12 Q40 14 32 22Z" fill="rgba(58,122,201,0.3)" stroke="rgba(58,122,201,0.5)" strokeWidth="1"/>
        <ellipse cx="60" cy="22" rx="30" ry="5" fill="rgba(58,122,201,0.2)" stroke="rgba(58,122,201,0.4)" strokeWidth="1"/>
        {/* Long admiral coat */}
        <path d="M36 52 Q60 44 84 52 L90 150 Q60 158 30 150 Z" fill="rgba(58,122,201,0.1)" stroke="rgba(58,122,201,0.4)" strokeWidth="1"/>
        {/* Coat lapels */}
        <path d="M60 52 L52 90 M60 52 L68 90" stroke="rgba(58,122,201,0.3)" strokeWidth="1.5"/>
        {/* Epaulettes */}
        <ellipse cx="36" cy="60" rx="8" ry="4" fill="rgba(58,122,201,0.25)" stroke="rgba(58,122,201,0.45)" strokeWidth="1"/>
        <ellipse cx="84" cy="60" rx="8" ry="4" fill="rgba(58,122,201,0.25)" stroke="rgba(58,122,201,0.45)" strokeWidth="1"/>
        {/* Arms — commanding spread */}
        <path d="M36 65 L10 90 L16 96" stroke="rgba(58,122,201,0.4)" strokeWidth="5" strokeLinecap="round"/>
        <path d="M84 65 L110 80 L106 88" stroke="rgba(58,122,201,0.4)" strokeWidth="5" strokeLinecap="round"/>
        {/* Legs */}
        <path d="M48 148 L44 180" stroke="rgba(58,122,201,0.35)" strokeWidth="6" strokeLinecap="round"/>
        <path d="M72 148 L76 180" stroke="rgba(58,122,201,0.35)" strokeWidth="6" strokeLinecap="round"/>
        {/* Anchor symbol on chest */}
        <line x1="60" y1="68" x2="60" y2="84" stroke="rgba(58,122,201,0.5)" strokeWidth="1.5"/>
        <path d="M54 72 Q60 70 66 72" stroke="rgba(58,122,201,0.5)" strokeWidth="1.5" fill="none"/>
        <path d="M55 84 Q60 88 65 84" stroke="rgba(58,122,201,0.5)" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'Audrey Hall',
    title: 'The Telepathist',
    pathway: 'Spectator Pathway · Sequence 9',
    color: '#9a6ac9',
    desc: 'She reads the room before she enters it. Every smile a calculation. Every word precise.',
    img: '/images/audery.jpg',
    icon: (
      <svg viewBox="0 0 120 180" width="120" height="180" fill="none">
        <ellipse cx="60" cy="34" rx="20" ry="22" fill="rgba(154,106,201,0.18)" stroke="rgba(154,106,201,0.5)" strokeWidth="1"/>
        {/* Hair */}
        <path d="M40 28 Q36 50 38 70" stroke="rgba(154,106,201,0.4)" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <path d="M80 28 Q84 50 82 70" stroke="rgba(154,106,201,0.4)" strokeWidth="8" strokeLinecap="round" fill="none"/>
        {/* Dress */}
        <path d="M38 56 Q60 48 82 56 L92 140 Q60 152 28 140 Z" fill="rgba(154,106,201,0.1)" stroke="rgba(154,106,201,0.4)" strokeWidth="1"/>
        {/* Arms */}
        <path d="M38 70 L18 100" stroke="rgba(154,106,201,0.35)" strokeWidth="5" strokeLinecap="round"/>
        <path d="M82 70 L102 100" stroke="rgba(154,106,201,0.35)" strokeWidth="5" strokeLinecap="round"/>
        {/* Legs */}
        <path d="M48 138 L46 168" stroke="rgba(154,106,201,0.35)" strokeWidth="5" strokeLinecap="round"/>
        <path d="M72 138 L74 168" stroke="rgba(154,106,201,0.35)" strokeWidth="5" strokeLinecap="round"/>
        {/* Eye symbol */}
        <ellipse cx="60" cy="34" rx="6" ry="4" stroke="rgba(154,106,201,0.7)" strokeWidth="1" fill="none"/>
        <circle cx="60" cy="34" r="2" fill="rgba(154,106,201,0.6)"/>
      </svg>
    ),
  },
]

export default function IntroPage() {
  const navigate = useNavigate()

  return (
    <div className="intro-wrap">

      {/* ── HERO ── */}
      <section className="intro-hero">
        <div className="intro-glow" aria-hidden="true" />

        <motion.p className="title-eyebrow" {...fadeUp(0.1)}>
          Beyondgod Street · Occult Evaluation Bureau
        </motion.p>

        <motion.h1 className="intro-title" {...fadeUp(0.3)}>
          Sequence <span className="intro-title-gold">Alignment</span><br />Engine
        </motion.h1>

        <motion.h2 className="intro-subtitle" {...fadeUp(0.5)}>
          Which Pathway Would Accept You?
        </motion.h2>

        <motion.div className="intro-divider" {...fadeUp(0.6)}>
          <span /><span className="intro-divider-diamond">✦</span><span />
        </motion.div>

        <motion.blockquote className="intro-quote" {...fadeUp(0.7)}>
          "To ascend is to risk. Every Sequence is a cage — and the door only opens inward.
          The true question is not what power you desire, but what darkness you can contain."
        </motion.blockquote>

        <motion.div className="intro-stats" {...fadeUp(0.85)}>
          {[['22','Pathways'],['25','Questions'],['110','Question Bank']].map(([n,l],i) => (
            <div key={i} className="intro-stat-group">
              {i > 0 && <div className="intro-stat-sep" />}
              <div className="intro-stat">
                <span className="intro-stat-n">{n}</span>
                <span className="intro-stat-l">{l}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div className="intro-cta" {...fadeUp(1.0)}>
          <button className="btn-begin" onClick={() => navigate('/warning')}>
            Begin Evaluation
            <span className="btn-begin-arrow">→</span>
          </button>
          <button className="btn-secondary" style={{ marginTop: '12px' }} onClick={() => navigate('/pathways')}>
            Browse All 22 Pathways
          </button>
          <p className="intro-fine-print">
            Results powered by in-browser ML · The Bureau accepts no appeals
          </p>
        </motion.div>
      </section>

      {/* ── CHARACTER PORTRAITS ── */}
      <motion.section
        className="portraits-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.0 }}
      >
        <p className="portraits-label">Known Ascendants — Bureau Records</p>
        <div className="portraits-row">
          {CHARACTERS.map((c, i) => (
            <motion.div
              key={c.name}
              className="portrait-card"
              style={{ '--accent': c.color }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.18, duration: 0.8 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Ornate frame corners */}
              <div className="portrait-corner tl" />
              <div className="portrait-corner tr" />
              <div className="portrait-corner bl" />
              <div className="portrait-corner br" />

              {/* Image or SVG silhouette */}
              <div className="portrait-img-wrap">
                {c.img
                  ? <img src={c.img} alt={c.name} className="portrait-img" />
                  : <div className="portrait-silhouette">{c.icon}</div>
                }
                <div className="portrait-vignette" />
              </div>

              {/* Info */}
              <div className="portrait-info">
                <p className="portrait-pathway" style={{ color: c.color }}>{c.pathway}</p>
                <h3 className="portrait-name">{c.name}</h3>
                <p className="portrait-title-label">"{c.title}"</p>
                <p className="portrait-desc">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  )
}

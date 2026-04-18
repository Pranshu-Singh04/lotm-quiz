// frontend/src/components/GlobalStats.jsx
import { motion } from 'framer-motion'
import { PATHWAYS } from '../data/pathways'

export default function GlobalStats({ data, userPathway }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0)
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1])

  return (
    <div className="global-stats">
      <h3 className="section-heading">Global Pathway Distribution</h3>
      <p className="stats-subtitle">{total.toLocaleString()} evaluations completed</p>
      <div className="stats-bars">
        {sorted.map(([key, count], i) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0
          const p = PATHWAYS[key]
          const isUser = key === userPathway
          return (
            <div key={key} className={`stat-row${isUser ? ' stat-row--user' : ''}`}>
              <div className="stat-label">{p?.name || key}</div>
              <div className="stat-bar-track">
                <motion.div
                  className="stat-bar-fill"
                  style={{ background: p?.color || '#c9973a' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                />
              </div>
              <div className="stat-pct">{pct}%</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

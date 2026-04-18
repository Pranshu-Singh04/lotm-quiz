// frontend/src/pages/PathwayBrowser.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PATHWAYS } from '../data/pathways'

const GROUPS = [
  { name: 'Lord of Mysteries',       deity: 'The Fool / Lord of Mysteries', color: '#c9973a', keys: ['fool','error','door'] },
  { name: 'God Almighty',            deity: 'Adam',                          color: '#9a6ac9', keys: ['visionary','sun','tyrant','whitetower','hangedman'] },
  { name: 'Eternal Darkness',        deity: 'Evernight Goddess',             color: '#5a3a8a', keys: ['darkness','death','twilightgiant'] },
  { name: 'Calamity of Destruction', deity: 'Unknown',                       color: '#c93a7a', keys: ['demoness','redpriest'] },
  { name: 'Demon of Knowledge',      deity: 'The Hidden Sage',               color: '#8a7a4a', keys: ['hermit','paragon'] },
  { name: 'Key of Light',            deity: 'Goddess of Fortune',            color: '#c9a33a', keys: ['wheeloffortune'] },
  { name: 'Goddess of Origin',       deity: 'Mother Earth',                  color: '#6a9a4a', keys: ['mother','moon'] },
  { name: 'Father of Devils',        deity: 'The Chained God',               color: '#8a2a3a', keys: ['abyss','chained'] },
  { name: 'The Anarchy',             deity: 'Unknown',                       color: '#9a7a2a', keys: ['blackemperor','justiciar'] },
]

const TAROT_SYM = {
  fool:'0', error:'XV', door:'VI', visionary:'XI', sun:'XIX',
  tyrant:'V', whitetower:'XVI', hangedman:'XII', darkness:'II',
  death:'XIII', twilightgiant:'VII', demoness:'III', redpriest:'IV',
  hermit:'IX', paragon:'VIII', wheeloffortune:'X', mother:'XXI',
  moon:'XVIII', abyss:'XV', chained:'XIV', blackemperor:'IV', justiciar:'XI',
}

function PathwayCard({ pathwayKey, pathway }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className={`browser-card${open ? ' browser-card--open' : ''}`}
      style={{ '--accent': pathway.color }}
      layout
      onClick={() => setOpen(o => !o)}
      whileHover={open ? {} : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {/* Collapsed header — always visible */}
      <div className="browser-card-header">
        <div className="browser-card-sym">{TAROT_SYM[pathwayKey]}</div>
        <div className="browser-card-meta">
          <div className="browser-card-name" style={{ color: pathway.color }}>
            {pathway.name}
          </div>
          <div className="browser-card-seq">{pathway.sequence}</div>
        </div>
        <div className="browser-card-chevron">{open ? '▲' : '▼'}</div>
      </div>

      {/* Expanded body */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="browser-card-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="browser-desc">{pathway.description}</p>

            <div className="browser-traits">
              <div className="browser-col">
                <p className="browser-col-label browser-col-label--str">Strengths</p>
                {pathway.strengths.map((s, i) => (
                  <div key={i} className="browser-trait">
                    <span style={{ color: pathway.color }}>{s.icon}</span>
                    <div>
                      <div className="browser-trait-name">{s.name}</div>
                      <div className="browser-trait-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="browser-col">
                <p className="browser-col-label browser-col-label--risk">Risks</p>
                {pathway.risks.map((r, i) => (
                  <div key={i} className="browser-trait">
                    <span className="trait-icon--risk">{r.icon}</span>
                    <div>
                      <div className="browser-trait-name">{r.name}</div>
                      <div className="browser-trait-desc">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="browser-stats">
              {[
                ['Stability',    pathway.stability,   '#4a8ac9'],
                ['Corruption',   pathway.corruption,  '#c94a4a'],
                ['Survival',     pathway.survival,    '#6a9a4a'],
                ['Advancement',  pathway.advancement, pathway.color],
              ].map(([label, val, col]) => (
                <div key={label} className="browser-stat-row">
                  <span className="browser-stat-label">{label}</span>
                  <div className="browser-stat-track">
                    <motion.div
                      className="browser-stat-fill"
                      style={{ background: col }}
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </div>
                  <span className="browser-stat-val">{val}%</span>
                </div>
              ))}
            </div>

            <div className="browser-warning">
              <span className="browser-warning-label">⚠ Bureau Warning</span>
              <span>{pathway.warning}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function PathwayBrowser() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredGroups = GROUPS
    .filter(g => filter === 'all' || g.name === filter)
    .map(g => ({
      ...g,
      keys: g.keys.filter(k => {
        if (!search) return true
        const p = PATHWAYS[k]
        return (
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.sequence.toLowerCase().includes(search.toLowerCase())
        )
      }),
    }))
    .filter(g => g.keys.length > 0)

  return (
    <div className="screen browser-screen">

      <motion.div
        className="browser-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="title-eyebrow">Beyondgod Street · Bureau Archives</p>
        <h1 className="display">All 22 Pathways</h1>
        <p className="browser-subtitle">
          Complete registry of Beyonder advancement routes.
          Click any entry to expand the full dossier.
        </p>
      </motion.div>

      {/* Search + filter */}
      <motion.div
        className="browser-controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          className="browser-search"
          placeholder="Search pathways…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="browser-filters">
          <button
            className={`browser-filter-btn${filter === 'all' ? ' active' : ''}`}
            onClick={() => setFilter('all')}
          >All</button>
          {GROUPS.map(g => (
            <button
              key={g.name}
              className={`browser-filter-btn${filter === g.name ? ' active' : ''}`}
              style={filter === g.name ? { borderColor: g.color, color: g.color } : {}}
              onClick={() => setFilter(f => f === g.name ? 'all' : g.name)}
            >
              {g.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Groups */}
      <div className="browser-groups">
        {filteredGroups.map((group, gi) => (
          <motion.section
            key={group.name}
            className="browser-group"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + gi * 0.06 }}
          >
            <div className="browser-group-header" style={{ '--group-color': group.color }}>
              <div className="browser-group-dot" style={{ background: group.color }} />
              <div>
                <div className="browser-group-name">{group.name}</div>
                <div className="browser-group-deity">Deity: {group.deity}</div>
              </div>
              <div className="browser-group-count">{group.keys.length}</div>
            </div>

            <div className="browser-cards">
              {group.keys.map(k => (
                <PathwayCard key={k} pathwayKey={k} pathway={PATHWAYS[k]} />
              ))}
            </div>
          </motion.section>
        ))}

        {filteredGroups.length === 0 && (
          <div className="browser-empty">No pathways match "{search}"</div>
        )}
      </div>

      <button className="btn-secondary" onClick={() => navigate(-1)}>
        ← Return to Bureau
      </button>
    </div>
  )
}

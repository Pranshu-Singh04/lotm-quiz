// frontend/src/components/ShareCard.jsx
// Canvas 1200×630 share card + share modal with platform buttons

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PATHWAYS } from '../data/pathways'

const TAROT_SYMS = {
  fool:'0', error:'XV', door:'VI', visionary:'XI', sun:'XIX',
  tyrant:'V', whitetower:'XVI', hangedman:'XII', darkness:'II',
  death:'XIII', twilightgiant:'VII', demoness:'III', redpriest:'IV',
  hermit:'IX', paragon:'VIII', wheeloffortune:'X', mother:'XXI',
  moon:'XVIII', abyss:'XV', chained:'XIV', blackemperor:'IV', justiciar:'XI',
}

const TAROT_LABELS = {
  fool:'The Fool', error:'The Devil', door:'The Lovers',
  visionary:'Justice', sun:'The Sun', tyrant:'The Hierophant',
  whitetower:'The Tower', hangedman:'The Hanged Man', darkness:'The High Priestess',
  death:'Death', twilightgiant:'The Chariot', demoness:'The Empress',
  redpriest:'The Emperor', hermit:'The Hermit', paragon:'Strength',
  wheeloffortune:'Wheel of Fortune', mother:'The World', moon:'The Moon',
  abyss:'The Devil', chained:'Temperance', blackemperor:'The Emperor',
  justiciar:'Justice',
}

const EMBLEMS = {
  fool:'✦', error:'⬡', door:'⟡', visionary:'◈', sun:'☀',
  tyrant:'♔', whitetower:'⊞', hangedman:'⌖', darkness:'☽',
  death:'✝', twilightgiant:'⚔', demoness:'♀', redpriest:'✠',
  hermit:'⊕', paragon:'⚖', wheeloffortune:'⊛', mother:'♁',
  moon:'☾', abyss:'⬟', chained:'⛓', blackemperor:'♚', justiciar:'⚖',
}

const TAGS = {
  fool:         ['Paradox','Observer','Fate'],
  error:        ['Corruption','Forbidden','Ritual'],
  door:         ['Gateway','Choice','Connection'],
  visionary:    ['Foresight','Will','Clarity'],
  sun:          ['Radiance','Truth','Authority'],
  tyrant:       ['Control','Faith','Power'],
  whitetower:   ['Disruption','Lightning','Change'],
  hangedman:    ['Sacrifice','Reversal','Patience'],
  darkness:     ['Mystery','Silence','Night'],
  death:        ['Undeath','Memory','Passage'],
  twilightgiant:['Conquest','Motion','War'],
  demoness:     ['Charm','Desire','Illusion'],
  redpriest:    ['Bloodshed','Dominion','Order'],
  hermit:       ['Knowledge','Solitude','Truth'],
  paragon:      ['Virtue','Courage','Perfection'],
  wheeloffortune:['Luck','Cycle','Fortune'],
  mother:       ['Life','Earth','Creation'],
  moon:         ['Dreams','Madness','Veil'],
  abyss:        ['Darkness','Desire','Temptation'],
  chained:      ['Balance','Restraint','Binding'],
  blackemperor: ['Anarchy','Rebellion','Shadow'],
  justiciar:    ['Law','Retribution','Order'],
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return { r, g, b }
}

function wrapText(ctx, text, x, y, maxW, lineH, maxLines = 4) {
  const words = text.split(' ')
  let line = '', lines = 0
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line.trim(), x, y)
      y += lineH; line = word + ' '; lines++
      if (lines >= maxLines) { ctx.fillText('…', x, y); return }
    } else { line = test }
  }
  if (line) ctx.fillText(line.trim(), x, y)
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath()
}

async function drawCard(pathwayKey, pathway, scores) {
  await document.fonts.ready

  const W = 1200, H = 630
  const SPLIT = 460
  const PAD   = 44
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')

  const col = pathway.color
  const { r, g, b } = hexToRgb(col)

  // Background
  ctx.fillStyle = '#080604'
  ctx.fillRect(0, 0, W, H)

  const gl = ctx.createRadialGradient(SPLIT/2, H/2, 0, SPLIT/2, H/2, 380)
  gl.addColorStop(0, `rgba(${r},${g},${b},0.22)`)
  gl.addColorStop(0.6, `rgba(${r},${g},${b},0.06)`)
  gl.addColorStop(1, 'transparent')
  ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H)

  const gr2 = ctx.createRadialGradient(SPLIT+380, H/2, 0, SPLIT+380, H/2, 320)
  gr2.addColorStop(0, `rgba(${r},${g},${b},0.07)`)
  gr2.addColorStop(1, 'transparent')
  ctx.fillStyle = gr2; ctx.fillRect(0, 0, W, H)

  // Borders
  ctx.strokeStyle = `rgba(${r},${g},${b},0.45)`
  ctx.lineWidth = 1.5
  roundRect(ctx, 14, 14, W-28, H-28, 4); ctx.stroke()
  ctx.strokeStyle = 'rgba(201,151,58,0.12)'
  ctx.lineWidth = 1
  roundRect(ctx, 20, 20, W-40, H-40, 3); ctx.stroke()

  // Divider
  const divGrad = ctx.createLinearGradient(SPLIT, 50, SPLIT, H-50)
  divGrad.addColorStop(0, 'transparent')
  divGrad.addColorStop(0.2, `rgba(${r},${g},${b},0.35)`)
  divGrad.addColorStop(0.8, `rgba(${r},${g},${b},0.35)`)
  divGrad.addColorStop(1, 'transparent')
  ctx.strokeStyle = divGrad; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(SPLIT, 50); ctx.lineTo(SPLIT, H-50); ctx.stroke()

  // Header
  ctx.fillStyle = 'rgba(201,151,58,0.55)'
  ctx.font = '500 10px "Cinzel", serif'
  ctx.textAlign = 'center'
  ctx.letterSpacing = '4px'
  ctx.fillText('BEYONDGOD STREET  ·  SEQUENCE ALIGNMENT ENGINE', W/2, 46)
  ctx.letterSpacing = '0px'

  // Left panel
  const cx = SPLIT / 2

  ctx.fillStyle = `rgba(${r},${g},${b},0.55)`
  ctx.font = '400 13px "Cinzel", serif'
  ctx.textAlign = 'center'
  ctx.fillText(TAROT_SYMS[pathwayKey] ?? 'I', cx, 88)

  ;[88, 68, 48].forEach((rad, i) => {
    ctx.beginPath(); ctx.arc(cx, 182, rad, 0, Math.PI*2)
    ctx.strokeStyle = `rgba(${r},${g},${b},${0.28 - i*0.07})`
    ctx.lineWidth = 1; ctx.stroke()
  })

  ctx.fillStyle = `rgba(${r},${g},${b},0.85)`
  ctx.font = '700 36px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(EMBLEMS[pathwayKey] ?? '✦', cx, 182)
  ctx.textBaseline = 'alphabetic'

  const tarotLabel = TAROT_LABELS[pathwayKey] ?? pathway.name
  const tarotSize  = tarotLabel.length > 14 ? 12 : 14
  ctx.fillStyle = `rgba(${r},${g},${b},0.8)`
  ctx.font = `500 ${tarotSize}px "Cinzel", serif`
  ctx.textAlign = 'center'
  ctx.fillText(tarotLabel, cx, 292)

  const name = pathway.name
  const nameSize = name.length > 12 ? 34 : name.length > 9 ? 40 : name.length > 6 ? 46 : 52
  ctx.fillStyle = col
  ctx.font = `700 ${nameSize}px "Cinzel Decorative", "Cinzel", serif`
  ctx.textAlign = 'center'
  ctx.fillText(name, cx, 348)

  ctx.fillStyle = 'rgba(255,255,255,0.38)'
  ctx.font = '400 12px "Cinzel", serif'
  ctx.textAlign = 'center'
  ctx.fillText(pathway.sequence, cx, 372)

  ctx.strokeStyle = `rgba(${r},${g},${b},0.25)`
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(PAD + 20, 386); ctx.lineTo(SPLIT - PAD - 20, 386); ctx.stroke()

  // Tags
  const tags = TAGS[pathwayKey] ?? []
  const tagFont = '400 9px "Cinzel", serif'
  ctx.font = tagFont
  const tagPad = 8, tagH = 18, tagGap = 6
  const tagWidths = tags.map(t => ctx.measureText(t.toUpperCase()).width + tagPad*2)
  const totalTagW = tagWidths.reduce((a,b)=>a+b,0) + tagGap*(tags.length-1)
  let tx = cx - totalTagW/2
  tags.forEach((tag, i) => {
    const tw = tagWidths[i]
    roundRect(ctx, tx, 396, tw, tagH, 3)
    ctx.strokeStyle = `rgba(${r},${g},${b},0.4)`; ctx.lineWidth = 1; ctx.stroke()
    ctx.fillStyle = `rgba(${r},${g},${b},0.65)`
    ctx.font = tagFont; ctx.textAlign = 'center'
    ctx.fillText(tag.toUpperCase(), tx + tw/2, 396 + 12)
    tx += tw + tagGap
  })

  // Description
  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '400 11px Georgia, serif'
  ctx.textAlign = 'left'
  wrapText(ctx, pathway.description ?? '', PAD + 8, 436, SPLIT - PAD - 16, 17, 5)

  // Right panel
  const rx = SPLIT + PAD
  const rw = W - rx - PAD

  ctx.fillStyle = `rgba(${r},${g},${b},0.7)`
  ctx.font = '600 9px "Cinzel", serif'
  ctx.textAlign = 'left'; ctx.letterSpacing = '2px'
  ctx.fillText('PATHWAY METRICS', rx, 88)
  ctx.letterSpacing = '0px'

  ctx.strokeStyle = `rgba(${r},${g},${b},0.2)`; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(rx, 96); ctx.lineTo(rx+rw, 96); ctx.stroke()

  const stats = [
    { label:'STABILITY INDEX',       sub:'Mental fortitude vs corruption',        value: pathway.stability,   color:'#4a8ac9' },
    { label:'CORRUPTION RISK',       sub:'Chance of losing self to characteristic',value: pathway.corruption,  color:'#c94a4a' },
    { label:'SURVIVAL RATING',       sub:'Likelihood of surviving Sequence ascent',value: pathway.survival,    color:'#6a9a4a' },
    { label:'ADVANCEMENT POTENTIAL', sub:'Ease of obtaining next Potion formula',  value: pathway.advancement, color: col      },
  ]

  stats.forEach((stat, i) => {
    const y = 116 + i * 78

    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = '600 9px "Cinzel", serif'
    ctx.textAlign = 'left'; ctx.letterSpacing = '1px'
    ctx.fillText(stat.label, rx, y)
    ctx.letterSpacing = '0px'

    ctx.fillStyle = 'rgba(255,255,255,0.28)'
    ctx.font = '400 9px Georgia, serif'
    ctx.textAlign = 'left'
    ctx.fillText(stat.sub, rx, y + 13)

    ctx.fillStyle = stat.color
    ctx.font = '700 15px "Cinzel", serif'
    ctx.textAlign = 'right'
    ctx.fillText(`${stat.value}%`, rx + rw, y)

    const barY = y + 20, barH = 7, fillW = (rw * stat.value) / 100
    ctx.fillStyle = 'rgba(255,255,255,0.06)'
    roundRect(ctx, rx, barY, rw, barH, 4); ctx.fill()
    ctx.fillStyle = stat.color
    roundRect(ctx, rx, barY, fillW, barH, 4); ctx.fill()
    const shine = ctx.createLinearGradient(rx, barY, rx, barY + barH)
    shine.addColorStop(0, 'rgba(255,255,255,0.18)'); shine.addColorStop(1, 'transparent')
    ctx.fillStyle = shine
    roundRect(ctx, rx, barY, fillW, barH, 4); ctx.fill()
  })

  if (scores) {
    const sorted    = Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,5)
    const maxScore  = sorted[0]?.[1] || 1
    const scoreY    = 440

    ctx.fillStyle = `rgba(${r},${g},${b},0.7)`
    ctx.font = '600 9px "Cinzel", serif'
    ctx.textAlign = 'left'; ctx.letterSpacing = '2px'
    ctx.fillText('TOP ALIGNMENT SCORES', rx, scoreY)
    ctx.letterSpacing = '0px'
    ctx.strokeStyle = `rgba(${r},${g},${b},0.2)`; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(rx, scoreY+7); ctx.lineTo(rx+rw, scoreY+7); ctx.stroke()

    // Warning banner
    const warn = (pathway.warning ?? '').slice(0, 95)
    ctx.fillStyle = `rgba(${r},${g},${b},0.14)`
    roundRect(ctx, rx, scoreY+14, rw, 28, 4); ctx.fill()
    ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`; ctx.lineWidth = 1
    roundRect(ctx, rx, scoreY+14, rw, 28, 4); ctx.stroke()
    ctx.fillStyle = `rgba(${r},${g},${b},0.9)`
    ctx.font = '400 9px Georgia, serif'; ctx.textAlign = 'left'
    ctx.fillText('⚠  ' + warn + (warn.length < (pathway.warning?.length ?? 0) ? '…' : ''), rx+8, scoreY+32)

    // Bar chart
    const barAreaY = scoreY + 50, barAreaH = 54
    const bw = Math.floor((rw - 4*(sorted.length-1)) / sorted.length)

    sorted.forEach(([key, val], i) => {
      const p   = PATHWAYS[key]
      const pct = val / maxScore
      const bx  = rx + i*(bw+4)
      const bh  = Math.max(4, barAreaH * pct)
      const by  = barAreaY + barAreaH - bh

      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      roundRect(ctx, bx, barAreaY, bw, barAreaH, 3); ctx.fill()
      ctx.fillStyle = p?.color || col
      roundRect(ctx, bx, by, bw, bh, 3); ctx.fill()

      ctx.fillStyle = key === pathwayKey ? (p?.color || col) : 'rgba(255,255,255,0.45)'
      ctx.font = key === pathwayKey ? '700 8px "Cinzel", serif' : '400 8px "Cinzel", serif'
      ctx.textAlign = 'center'
      ctx.fillText((p?.name || key).slice(0,9).toUpperCase(), bx + bw/2, barAreaY + barAreaH + 12)
    })
  }

  // Footer
  ctx.fillStyle = 'rgba(201,151,58,0.35)'
  ctx.font = '400 10px "Cinzel", serif'
  ctx.textAlign = 'center'
  ctx.fillText('lotm-quiz.vercel.app', W/2, H - 26)

  // Corner dots
  [[30,30],[W-30,30],[30,H-30],[W-30,H-30]].forEach(([cx2,cy2]) => {
    ctx.fillStyle = `rgba(${r},${g},${b},0.6)`
    ctx.beginPath(); ctx.arc(cx2, cy2, 2.5, 0, Math.PI*2); ctx.fill()
  })

  return canvas.toDataURL('image/png')
}

// ── Share Modal ────────────────────────────────────────────────────────────────
function ShareModal({ dataUrl, pathway, onClose }) {
  const [copied, setCopied] = useState(false)
  const [imgCopied, setImgCopied] = useState(false)

  const shareText = `I got ${pathway.name} (${pathway.sequence}) on the LotM Beyonder Pathway Quiz!\n\n"${(pathway.warning ?? '').slice(0, 80)}…"\n\nlotm-quiz.vercel.app`
  const shareUrl  = 'https://lotm-quiz.vercel.app'

  function download() {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `lotm-${pathway.name.toLowerCase().replace(/\s+/g,'-')}-pathway.png`
    a.click()
  }

  function tweetIt() {
    const text = encodeURIComponent(`I got aligned with the ${pathway.name} Pathway on the LotM Beyonder Quiz!\n\n${shareUrl}`)
    window.open(`https://x.com/intent/tweet?text=${text}`, '_blank')
  }

  function redditIt() {
    const title = encodeURIComponent(`I got ${pathway.name} on the LotM Beyonder Pathway Quiz`)
    const url   = encodeURIComponent(shareUrl)
    window.open(`https://reddit.com/submit?type=link&title=${title}&url=${url}`, '_blank')
  }

  async function copyDiscord() {
    const msg = `**${pathway.name}** — ${pathway.sequence}\n> "${(pathway.warning ?? '').slice(0, 100)}…"\n${shareUrl}`
    try {
      await navigator.clipboard.writeText(msg)
      setImgCopied(true)
      setTimeout(() => setImgCopied(false), 2500)
    } catch { /* noop */ }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch { /* noop */ }
  }

  async function nativeShare() {
    if (!navigator.share) return copyLink()
    try {
      // Try sharing the image file
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], 'lotm-pathway.png', { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `LotM Pathway: ${pathway.name}`, text: shareText })
      } else {
        await navigator.share({ title: `LotM Pathway: ${pathway.name}`, text: shareText, url: shareUrl })
      }
    } catch { /* user cancelled */ }
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="share-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          className="share-modal"
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          style={{ '--acc': pathway.color }}
        >
          <div className="share-modal-header">
            <span className="share-modal-title">Share Your Result</span>
            <button className="share-modal-close" onClick={onClose}>✕</button>
          </div>

          {/* Card preview */}
          <div className="share-preview">
            <img src={dataUrl} alt="Share card" className="share-preview-img" />
          </div>

          {/* Platform buttons */}
          <div className="share-platforms">
            <button className="share-btn share-btn--download" onClick={download}>
              <span className="share-btn-icon">⬇</span>
              <span>Download</span>
              <span className="share-btn-sub">Save PNG</span>
            </button>

            <button className="share-btn share-btn--twitter" onClick={tweetIt}>
              <span className="share-btn-icon">𝕏</span>
              <span>Post on X</span>
              <span className="share-btn-sub">Twitter/X</span>
            </button>

            <button className="share-btn share-btn--discord" onClick={copyDiscord}>
              <span className="share-btn-icon">💬</span>
              <span>{imgCopied ? 'Copied!' : 'Discord'}</span>
              <span className="share-btn-sub">{imgCopied ? 'Paste in chat' : 'Copy message'}</span>
            </button>

            <button className="share-btn share-btn--reddit" onClick={redditIt}>
              <span className="share-btn-icon">🔺</span>
              <span>Reddit</span>
              <span className="share-btn-sub">Post link</span>
            </button>

            <button className="share-btn share-btn--insta" onClick={download}>
              <span className="share-btn-icon">◎</span>
              <span>Instagram</span>
              <span className="share-btn-sub">Download → upload</span>
            </button>

            <button className="share-btn share-btn--native" onClick={nativeShare}>
              <span className="share-btn-icon">⬡</span>
              <span>{copied ? 'Copied!' : 'Share / Copy'}</span>
              <span className="share-btn-sub">{copied ? 'Done!' : 'All options'}</span>
            </button>
          </div>

          <p className="share-modal-note">
            Instagram: download the image then upload as a Story or post.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function ShareCard({ pathwayKey, pathway, scores }) {
  const [generating, setGenerating] = useState(false)
  const [dataUrl,    setDataUrl]    = useState(null)
  const [modalOpen,  setModalOpen]  = useState(false)

  async function generate() {
    if (dataUrl) { setModalOpen(true); return }   // already rendered — reuse
    setGenerating(true)
    try {
      const url = await drawCard(pathwayKey, pathway, scores)
      setDataUrl(url)
      setModalOpen(true)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <>
      <button className="btn-secondary" onClick={generate} disabled={generating}>
        {generating ? 'Rendering…' : '⬡ Share Result Image'}
      </button>

      {modalOpen && dataUrl && (
        <ShareModal
          dataUrl={dataUrl}
          pathway={pathway}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

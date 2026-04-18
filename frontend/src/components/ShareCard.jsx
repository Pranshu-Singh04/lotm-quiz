// frontend/src/components/ShareCard.jsx
// Draws a 1200×630 share-card image onto a hidden Canvas and opens it in a new tab.

import { useState } from 'react'
import { PATHWAYS } from '../data/pathways'

const TAROT_SYMS = {
  fool: '0', error: 'XV', door: 'VI', visionary: 'XI', sun: 'XIX',
  tyrant: 'V', whitetower: 'XVI', hangedman: 'XII', darkness: 'II',
  death: 'XIII', twilightgiant: 'VII', demoness: 'III', redpriest: 'IV',
  hermit: 'IX', paragon: 'VIII', wheeloffortune: 'X', mother: 'XXI',
  moon: 'XVIII', abyss: 'XV', chained: 'XIV', blackemperor: 'IV', justiciar: 'XI',
}

const TAROT_LABELS = {
  fool: 'The Fool', error: 'The Devil', door: 'The Lovers',
  visionary: 'Justice', sun: 'The Sun', tyrant: 'The Hierophant',
  whitetower: 'The Tower', hangedman: 'The Hanged Man', darkness: 'The High Priestess',
  death: 'Death', twilightgiant: 'The Chariot', demoness: 'The Empress',
  redpriest: 'The Emperor', hermit: 'The Hermit', paragon: 'Strength',
  wheeloffortune: 'Wheel of Fortune', mother: 'The World', moon: 'The Moon',
  abyss: 'The Devil', chained: 'Temperance', blackemperor: 'The Emperor',
  justiciar: 'Justice',
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

async function drawCard(pathwayKey, pathway, scores) {
  await document.fonts.ready

  const W = 1200, H = 630
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')

  const col = pathway.color
  const { r, g, b } = hexToRgb(col)

  // ── Background ──────────────────────────────────────────────────────────
  ctx.fillStyle = '#0a0704'
  ctx.fillRect(0, 0, W, H)

  // Ambient glow left
  const gl = ctx.createRadialGradient(280, 315, 0, 280, 315, 360)
  gl.addColorStop(0, `rgba(${r},${g},${b},0.18)`)
  gl.addColorStop(1, 'transparent')
  ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H)

  // Subtle right glow
  const gr2 = ctx.createRadialGradient(920, 315, 0, 920, 315, 300)
  gr2.addColorStop(0, `rgba(${r},${g},${b},0.06)`)
  gr2.addColorStop(1, 'transparent')
  ctx.fillStyle = gr2; ctx.fillRect(0, 0, W, H)

  // ── Outer border ────────────────────────────────────────────────────────
  ctx.strokeStyle = `rgba(${r},${g},${b},0.4)`
  ctx.lineWidth = 1
  ctx.strokeRect(16, 16, W - 32, H - 32)
  ctx.strokeStyle = 'rgba(201,151,58,0.15)'
  ctx.strokeRect(22, 22, W - 44, H - 44)

  // ── Vertical divider ────────────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(201,151,58,0.18)'
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(480, 60); ctx.lineTo(480, H - 60); ctx.stroke()

  // ── Header ──────────────────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(201,151,58,0.55)'
  ctx.font = '600 11px "Cinzel", serif'
  ctx.textAlign = 'center'
  ctx.letterSpacing = '4px'
  ctx.fillText('BEYONDGOD STREET  ·  SEQUENCE ALIGNMENT ENGINE', W / 2, 52)
  ctx.letterSpacing = '0px'

  // ── Left panel: tarot symbol + name ─────────────────────────────────────
  const cx = 240

  // Roman numeral
  ctx.fillStyle = `rgba(${r},${g},${b},0.6)`
  ctx.font = '500 16px "Cinzel", serif'
  ctx.textAlign = 'center'
  ctx.fillText(TAROT_SYMS[pathwayKey] ?? 'I', cx, 138)

  // Large symbol (Unicode, no emoji)
  const symMap = {
    fool: '0', error: 'XV', door: 'VI', visionary: 'XI', sun: 'XIX',
    tyrant: 'V', whitetower: 'XVI', hangedman: 'XII', darkness: 'II',
    death: 'XIII', twilightgiant: 'VII', demoness: 'III', redpriest: 'IV',
    hermit: 'IX', paragon: 'VIII', wheeloffortune: 'X', mother: 'XXI',
    moon: 'XVIII', abyss: 'XV', chained: 'XIV', blackemperor: 'IV', justiciar: 'XI',
  }

  // Decorative circle behind symbol
  ctx.beginPath()
  ctx.arc(cx, 230, 72, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(${r},${g},${b},0.25)`
  ctx.lineWidth = 1; ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx, 230, 54, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(${r},${g},${b},0.15)`
  ctx.stroke()

  // Tarot label in circle
  ctx.fillStyle = `rgba(${r},${g},${b},0.9)`
  ctx.font = 'bold 26px "Cinzel", serif'
  ctx.fillText(TAROT_LABELS[pathwayKey] ?? pathway.name, cx, 238)

  // Pathway name (large)
  ctx.fillStyle = col
  ctx.font = 'bold 52px "Cinzel Decorative", "Cinzel", serif'
  ctx.textAlign = 'center'

  // Handle long names
  const name = pathway.name
  const fontSize = name.length > 10 ? 38 : name.length > 7 ? 44 : 52
  ctx.font = `bold ${fontSize}px "Cinzel Decorative", "Cinzel", serif`
  ctx.fillText(name, cx, 320)

  // Tarot card name
  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '500 15px "Cinzel", serif'
  ctx.fillText(TAROT_LABELS[pathwayKey], cx, 354)

  // Sequence
  ctx.fillStyle = `rgba(${r},${g},${b},0.65)`
  ctx.font = '400 13px "Cinzel", serif'
  ctx.fillText(pathway.sequence, cx, 382)

  // Description snippet
  const desc = pathway.description.slice(0, 110) + '…'
  ctx.fillStyle = 'rgba(255,255,255,0.3)'
  ctx.font = '400 11px Georgia, serif'
  wrapText(ctx, desc, 60, 420, 380, 16)

  // ── Right panel: stats ──────────────────────────────────────────────────
  const sx = 520, sw = 630

  ctx.fillStyle = 'rgba(201,151,58,0.5)'
  ctx.font = '600 10px "Cinzel", serif'
  ctx.textAlign = 'left'
  ctx.fillText('PATHWAY METRICS', sx, 108)

  const stats = [
    { label: 'STABILITY INDEX',       value: pathway.stability,   color: '#4a8ac9' },
    { label: 'CORRUPTION RISK',        value: pathway.corruption,  color: '#c94a4a' },
    { label: 'SURVIVAL RATING',        value: pathway.survival,    color: '#6a9a4a' },
    { label: 'ADVANCEMENT POTENTIAL', value: pathway.advancement, color: col       },
  ]

  stats.forEach((stat, i) => {
    const y = 140 + i * 88

    ctx.fillStyle = 'rgba(255,255,255,0.38)'
    ctx.font = '600 10px "Cinzel", serif'
    ctx.textAlign = 'left'
    ctx.fillText(stat.label, sx, y)

    ctx.fillStyle = stat.color
    ctx.font = '700 18px "Cinzel", serif'
    ctx.textAlign = 'right'
    ctx.fillText(`${stat.value}%`, sx + sw, y)

    // Track
    ctx.fillStyle = 'rgba(255,255,255,0.07)'
    ctx.fillRect(sx, y + 8, sw, 10)

    // Fill
    ctx.fillStyle = stat.color
    ctx.fillRect(sx, y + 8, (sw * stat.value) / 100, 10)

    // Subtle shine on fill
    const shine = ctx.createLinearGradient(sx, y + 8, sx, y + 18)
    shine.addColorStop(0, 'rgba(255,255,255,0.15)')
    shine.addColorStop(1, 'transparent')
    ctx.fillStyle = shine
    ctx.fillRect(sx, y + 8, (sw * stat.value) / 100, 10)
  })

  // Score breakdown header
  if (scores) {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 5)
    const maxScore = sorted[0]?.[1] || 1

    ctx.fillStyle = 'rgba(201,151,58,0.5)'
    ctx.font = '600 10px "Cinzel", serif'
    ctx.textAlign = 'left'
    ctx.fillText('ALIGNMENT SCORES  (TOP 5)', sx, 502)

    sorted.forEach(([key, val], i) => {
      const p = PATHWAYS[key]
      const pct = (val / maxScore) * 100
      const x = sx + i * (sw / 5 + 2)
      const bw = sw / 5 - 4
      const bh = 40
      const y = 516

      ctx.fillStyle = 'rgba(255,255,255,0.06)'
      ctx.fillRect(x, y, bw, bh)

      ctx.fillStyle = p?.color || col
      ctx.fillRect(x, y + bh - (bh * pct) / 100, bw, (bh * pct) / 100)

      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '500 9px "Cinzel", serif'
      ctx.textAlign = 'center'
      ctx.fillText((p?.name || key).slice(0, 8), x + bw / 2, y + bh + 14)
    })
  }

  // ── Footer ───────────────────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(201,151,58,0.35)'
  ctx.font = '400 11px "Cinzel", serif'
  ctx.textAlign = 'center'
  ctx.fillText('lotm-quiz.vercel.app', W / 2, H - 30)

  // Corner ornaments
  const orn = [[30, 30], [W - 30, 30], [30, H - 30], [W - 30, H - 30]]
  orn.forEach(([x, y]) => {
    ctx.fillStyle = `rgba(${r},${g},${b},0.6)`
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill()
  })

  return canvas.toDataURL('image/png')
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ')
  let line = ''
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line.trim(), x, y)
      y += lineH; line = word + ' '
    } else { line = test }
  }
  if (line) ctx.fillText(line.trim(), x, y)
}

export default function ShareCard({ pathwayKey, pathway, scores }) {
  const [generating, setGenerating] = useState(false)

  async function generate() {
    setGenerating(true)
    try {
      const dataUrl = await drawCard(pathwayKey, pathway, scores)
      // Open in new tab — user can right-click / long-press to save
      const win = window.open()
      win.document.write(
        `<body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;min-height:100vh">` +
        `<img src="${dataUrl}" style="max-width:100%;height:auto" />` +
        `</body>`
      )
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button className="btn-secondary" onClick={generate} disabled={generating}>
      {generating ? 'Rendering…' : '⬡ Generate Share Image'}
    </button>
  )
}

// frontend/src/components/Candles.jsx
// Eerie ritual candles — rough SVG, wax drips, erratic flame, ceremony circle

import { useEffect, useRef } from 'react'

// Rough candle body path — irregular edges for hand-dipped look
function candlePath(w, h) {
  const hw = w / 2
  // Slight irregularity on each side
  return `
    M ${hw - 1} 0
    C ${hw - 2} ${h * 0.2}, ${hw + 1} ${h * 0.4}, ${hw - 1} ${h * 0.6}
    C ${hw - 2} ${h * 0.75}, ${hw + 0} ${h * 0.88}, ${hw - 1} ${h}
    L ${-hw + 1} ${h}
    C ${-hw + 0} ${h * 0.88}, ${-hw + 2} ${h * 0.75}, ${-hw + 1} ${h * 0.6}
    C ${-hw + 2} ${h * 0.4}, ${-hw - 1} ${h * 0.2}, ${-hw + 1} 0
    Z
  `
}

// Wax drip path
function dripPath(x, length, wobble) {
  return `M ${x} 0 Q ${x + wobble} ${length * 0.5} ${x + wobble * 0.4} ${length} Q ${x} ${length * 1.1} ${x - wobble * 0.3} ${length} Q ${x - wobble * 0.5} ${length * 0.5} ${x} 0`
}

function Candle({ height, delay, tilt, waxColor, drips }) {
  const w = 11 + Math.random() * 3 | 0

  return (
    <div
      className="eerie-candle"
      style={{
        transform: `rotate(${tilt}deg)`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg
        width={w + 20}
        height={height + 60}
        viewBox={`${-(w/2+10)} -58 ${w+20} ${height + 62}`}
        overflow="visible"
      >
        {/* Flame glow (wide, blurry) */}
        <ellipse cx="0" cy="-42" rx="9" ry="14"
          fill={`rgba(255,140,30,0.12)`}
          className="flame-glow"
          style={{ animationDelay: `${delay}s` }}
        />

        {/* Outer flame */}
        <path
          d="M 0 -54 C 4 -48, 7 -40, 4 -32 C 2 -27, -2 -27, -4 -32 C -7 -40, -4 -48, 0 -54 Z"
          fill="rgba(255,200,80,0.85)"
          className="flame-outer"
          style={{ animationDelay: `${delay}s` }}
        />
        {/* Inner flame */}
        <path
          d="M 0 -50 C 2 -44, 4 -38, 2 -33 C 1 -30, -1 -30, -2 -33 C -4 -38, -2 -44, 0 -50 Z"
          fill="rgba(255,240,180,0.95)"
          className="flame-inner"
          style={{ animationDelay: `${delay + 0.15}s` }}
        />
        {/* Flame core */}
        <ellipse cx="0" cy="-36" rx="1.5" ry="3"
          fill="rgba(255,255,255,0.9)"
          className="flame-core"
          style={{ animationDelay: `${delay}s` }}
        />

        {/* Wick */}
        <line x1="0" y1="-30" x2="-1" y2="-2"
          stroke="#1a1208" strokeWidth="1.2" strokeLinecap="round"
        />

        {/* Soot / burnt wax at top */}
        <ellipse cx="0" cy="0" rx={w/2} ry="3"
          fill="#1c1408"
          opacity="0.7"
        />

        {/* Candle body — rough sides */}
        <path
          d={candlePath(w, height)}
          fill="url(#wax-grad)"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="0.5"
        />

        {/* Wax drips */}
        {drips.map((d, i) => (
          <g key={i} transform={`translate(${d.x}, ${d.startY})`}>
            <path
              d={dripPath(0, d.length, d.wobble)}
              fill={waxColor}
              opacity={0.7 + d.opacity * 0.25}
            />
          </g>
        ))}

        {/* Candle base shadow */}
        <ellipse cx="0" cy={height} rx={w/2 + 2} ry="3"
          fill="rgba(0,0,0,0.35)"
        />

        {/* Gradient def — inline per candle */}
        <defs>
          <linearGradient id="wax-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={waxColor} stopOpacity="0.6" />
            <stop offset="35%"  stopColor={waxColor} stopOpacity="0.9" />
            <stop offset="65%"  stopColor={waxColor} stopOpacity="1.0" />
            <stop offset="100%" stopColor={waxColor} stopOpacity="0.55" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Ritual blood circle — thin SVG drawn in background
function RitualCircle() {
  return (
    <svg
      className="ritual-bg-circle"
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="rough">
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      {/* Outer circle */}
      <circle cx="300" cy="300" r="270" fill="none"
        stroke="rgba(160,20,20,0.18)" strokeWidth="1.2" filter="url(#rough)" />
      {/* Middle circle */}
      <circle cx="300" cy="300" r="230" fill="none"
        stroke="rgba(160,20,20,0.12)" strokeWidth="0.8" filter="url(#rough)" />
      {/* Inner circle */}
      <circle cx="300" cy="300" r="180" fill="none"
        stroke="rgba(160,20,20,0.09)" strokeWidth="0.8" filter="url(#rough)" />

      {/* Pentagram — 5 points */}
      {[0,1,2,3,4].map(i => {
        const order = [0, 2, 4, 1, 3]
        const a1 = (order[i]     * 72 - 90) * Math.PI / 180
        const a2 = (order[(i+1)%5] * 72 - 90) * Math.PI / 180
        const r = 230
        return (
          <line key={i}
            x1={300 + r * Math.cos(a1)} y1={300 + r * Math.sin(a1)}
            x2={300 + r * Math.cos(a2)} y2={300 + r * Math.sin(a2)}
            stroke="rgba(140,15,15,0.13)" strokeWidth="0.8" filter="url(#rough)"
          />
        )
      })}

      {/* Rune tick marks around outer circle */}
      {Array.from({length: 22}).map((_, i) => {
        const a = (i / 22) * Math.PI * 2
        const r1 = 268, r2 = 255
        return (
          <line key={i}
            x1={300 + r1 * Math.cos(a)} y1={300 + r1 * Math.sin(a)}
            x2={300 + r2 * Math.cos(a)} y2={300 + r2 * Math.sin(a)}
            stroke="rgba(140,15,15,0.2)" strokeWidth="0.8"
          />
        )
      })}

      {/* Small dots at pentagram vertices */}
      {[0,1,2,3,4].map(i => {
        const a = (i * 72 - 90) * Math.PI / 180
        const r = 230
        return (
          <circle key={i}
            cx={300 + r * Math.cos(a)} cy={300 + r * Math.sin(a)}
            r="3.5" fill="rgba(160,20,20,0.22)"
          />
        )
      })}
    </svg>
  )
}

// ── Scattered ceremonial decor ───────────────────────────────────
// Each element: { x, y } as vw/vh percentages, type, size, delay, opacity

// Mini ritual circle SVG
function MiniCircle({ r, roughId, color, opacity, delay, rotate }) {
  const pts = [0,1,2,3,4].map(i => {
    const order = [0,2,4,1,3]
    const a1 = (order[i]       * 72 - 90) * Math.PI / 180
    const a2 = (order[(i+1)%5] * 72 - 90) * Math.PI / 180
    return { x1: r*Math.cos(a1), y1: r*Math.sin(a1), x2: r*Math.cos(a2), y2: r*Math.sin(a2) }
  })
  return (
    <g opacity={opacity} style={{ animation: `decor-spin ${rotate}s linear infinite` }}>
      <circle cx="0" cy="0" r={r}        fill="none" stroke={color} strokeWidth="0.7" filter={`url(#${roughId})`} />
      <circle cx="0" cy="0" r={r * 0.7}  fill="none" stroke={color} strokeWidth="0.4" filter={`url(#${roughId})`} opacity="0.6" />
      {pts.map((p, i) => (
        <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
          stroke={color} strokeWidth="0.5" filter={`url(#${roughId})`} opacity="0.7" />
      ))}
      {[0,1,2,3,4].map(i => {
        const a = (i * 72 - 90) * Math.PI / 180
        return <circle key={i} cx={r*Math.cos(a)} cy={r*Math.sin(a)} r="1.5" fill={color} opacity="0.5" />
      })}
    </g>
  )
}

// Sigil — overlapping triangles / Star of Solomon style
function MiniSigil({ size, color, opacity, delay }) {
  const r = size / 2
  // Upward triangle
  const up = [0,1,2].map(i => { const a = (i*120 - 90)*Math.PI/180; return [r*Math.cos(a), r*Math.sin(a)] })
  // Downward triangle
  const dn = [0,1,2].map(i => { const a = (i*120 + 90)*Math.PI/180; return [r*Math.cos(a), r*Math.sin(a)] })
  const poly = pts => pts.map(p => p.join(',')).join(' ')
  return (
    <g opacity={opacity} style={{ animation: `decor-pulse 4s ease-in-out ${delay}s infinite alternate` }}>
      <polygon points={poly(up)} fill="none" stroke={color} strokeWidth="0.7" />
      <polygon points={poly(dn)} fill="none" stroke={color} strokeWidth="0.7" />
      <circle cx="0" cy="0" r={r * 1.1} fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
      <circle cx="0" cy="0" r="2" fill={color} opacity="0.4" />
    </g>
  )
}

// Runic cross with tick marks
function RunicCross({ size, color, opacity, delay }) {
  const h = size / 2
  // Tick marks at 8 directions
  const ticks = Array.from({length: 8}, (_, i) => {
    const a = (i * 45) * Math.PI / 180
    const r1 = h * 0.85, r2 = h
    return { x1: r1*Math.cos(a), y1: r1*Math.sin(a), x2: r2*Math.cos(a), y2: r2*Math.sin(a) }
  })
  return (
    <g opacity={opacity} style={{ animation: `decor-pulse 5s ease-in-out ${delay}s infinite alternate` }}>
      <circle cx="0" cy="0" r={h * 0.9} fill="none" stroke={color} strokeWidth="0.6" />
      <line x1={-h} y1="0" x2={h} y2="0" stroke={color} strokeWidth="0.7" />
      <line x1="0" y1={-h} x2="0" y2={h} stroke={color} strokeWidth="0.7" />
      <line x1={-h*0.65} y1={-h*0.65} x2={h*0.65} y2={h*0.65} stroke={color} strokeWidth="0.4" opacity="0.5" />
      <line x1={h*0.65} y1={-h*0.65} x2={-h*0.65} y2={h*0.65} stroke={color} strokeWidth="0.4" opacity="0.5" />
      {ticks.map((t,i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={color} strokeWidth="0.8" />
      ))}
    </g>
  )
}

// Arcane eye — triangle with inner circle and rays
function ArcaneEye({ size, color, opacity, delay }) {
  const h = size / 2
  const tri = [[-h,h*0.5],[h,h*0.5],[0,-h]]
  const poly = tri.map(p=>p.join(',')).join(' ')
  return (
    <g opacity={opacity} style={{ animation: `decor-pulse 6s ease-in-out ${delay}s infinite alternate` }}>
      <polygon points={poly} fill="none" stroke={color} strokeWidth="0.7" />
      <circle cx="0" cy="0" r={h * 0.35} fill="none" stroke={color} strokeWidth="0.6" />
      <circle cx="0" cy="0" r={h * 0.12} fill={color} opacity="0.5" />
      {Array.from({length:6}, (_,i) => {
        const a = i * 60 * Math.PI / 180
        const r1 = h*0.4, r2 = h*0.55
        return <line key={i} x1={r1*Math.cos(a)} y1={r1*Math.sin(a)} x2={r2*Math.cos(a)} y2={r2*Math.sin(a)} stroke={color} strokeWidth="0.5" opacity="0.6" />
      })}
    </g>
  )
}

// Creepy bloodied floating eye — visible eyeball, blinks + iris wanders
function BloodEye({ size, delay, blinkInterval, opacity }) {
  const rx = size, ry = size * 0.58
  const irisRx = size * 0.33, irisRy = size * 0.33 * 0.58
  const uid = `eye-${size}-${String(delay).replace('.','x')}`
  const gazeVariant = Math.round(delay * 10) % 4

  // Blood vessels radiating from center, clipped to sclera
  const vessels = Array.from({length: 6}, (_, i) => {
    const a = (i * 60 + 12) * Math.PI / 180
    const len = size * (0.44 + (i % 3) * 0.09)
    const qx = Math.cos(a + 0.4) * len * 0.5
    const qy = Math.sin(a + 0.4) * len * 0.5 * 0.58
    return `M 0 0 Q ${qx} ${qy} ${Math.cos(a)*len} ${Math.sin(a)*len*0.58}`
  })

  // Almond eye-opening shape for clipPath
  const openPath = `M ${-rx} 0 C ${-rx*0.5} ${-ry*1.05} ${rx*0.5} ${-ry*1.05} ${rx} 0 C ${rx*0.5} ${ry*0.82} ${-rx*0.5} ${ry*0.82} ${-rx} 0 Z`

  return (
    <g opacity={opacity}>
      <defs>
        <clipPath id={uid}><path d={openPath} /></clipPath>
      </defs>

      {/* Eyeball contents — clipped to almond opening */}
      <g clipPath={`url(#${uid})`}>
        {/* Sclera */}
        <ellipse cx="0" cy="0" rx={rx+2} ry={ry+2} fill="rgba(228,218,192,0.93)" />
        {/* Blood vessels */}
        {vessels.map((d, i) => (
          <path key={i} d={d} fill="none"
            stroke={`rgba(165,12,12,${0.28 + i*0.06})`} strokeWidth="0.6" />
        ))}
        {/* Iris + pupil + shine — wanders smoothly */}
        <g className={`eye-gaze eye-gaze-${gazeVariant}`}
           style={{ animationDelay: `${delay}s` }}>
          <ellipse cx="0" cy="0" rx={irisRx} ry={irisRy} fill="rgba(22,8,5,0.97)" />
          <ellipse cx="0" cy="0" rx={size*0.14} ry={size*0.14*0.58} fill="rgba(2,0,0,1)" />
          <ellipse cx={size*0.09} cy={-size*0.08*0.58} rx={size*0.046} ry={size*0.033} fill="rgba(255,255,255,0.65)" />
        </g>
        {/* Blood pooling at inner corner */}
        <path d={`M ${-rx} 0 Q ${-rx*0.75} ${ry*0.32} ${-rx*0.44} ${ry*0.14}`}
          fill="none" stroke="rgba(140,8,8,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Upper eyelid skin — masks above the eye opening */}
      <path
        d={`M ${-rx-3} 0 C ${-rx*0.5} ${-ry*1.05} ${rx*0.5} ${-ry*1.05} ${rx+3} 0 L ${rx+3} ${-(ry+size+4)} L ${-(rx+3)} ${-(ry+size+4)} Z`}
        fill="rgba(8,4,2,1)"
      />
      {/* Lower eyelid skin — masks below the eye opening */}
      <path
        d={`M ${-rx-3} 0 C ${-rx*0.5} ${ry*0.82} ${rx*0.5} ${ry*0.82} ${rx+3} 0 L ${rx+3} ${ry+size+4} L ${-(rx+3)} ${ry+size+4} Z`}
        fill="rgba(8,4,2,1)"
      />

      {/* Blink overlay — dark ellipse animates scaleY over the open eye */}
      <ellipse cx="0" cy="0" rx={rx+2} ry={ry+2}
        fill="rgba(8,4,2,1)"
        className="blood-eye-blink"
        style={{ animationDelay: `${delay}s`, animationDuration: `${blinkInterval}s` }}
      />

      {/* Eyelashes — upper only */}
      {[-0.62,-0.28,0,0.28,0.62].map((t, i) => {
        const lx = t * rx
        const ly = -Math.sqrt(Math.max(0, 1 - t*t)) * ry * 1.04
        return (
          <line key={i} x1={lx} y1={ly}
            x2={lx + (t - 0.05) * size * 0.22} y2={ly - size * 0.2}
            stroke="rgba(5,2,1,0.92)" strokeWidth="0.9" strokeLinecap="round" />
        )
      })}
    </g>
  )
}

// Eerie door — Mr. Door aesthetic, slightly ajar with light bleeding through
function EerieDoor({ width, opacity, delay }) {
  const w = width, h = width * 2.3
  const archR = w * 0.52
  const archCY = -h / 2 + archR
  const inset = w * 0.11

  return (
    <g opacity={opacity}>
      {/* Ambient glow leaking around door */}
      <ellipse cx="0" cy="0" rx={w * 0.8} ry={h * 0.45}
        fill="rgba(255,170,50,0.025)" />

      {/* Door body */}
      <path
        d={`M ${-w/2} ${h/2} L ${-w/2} ${archCY} A ${archR} ${archR} 0 0 1 ${w/2} ${archCY} L ${w/2} ${h/2} Z`}
        fill="rgba(6,3,1,0.92)"
        stroke="rgba(65,30,8,0.65)"
        strokeWidth="1.8"
      />

      {/* Arch detail line */}
      <path
        d={`M ${-w/2} ${archCY} A ${archR} ${archR} 0 0 1 ${w/2} ${archCY}`}
        fill="none" stroke="rgba(65,30,8,0.4)" strokeWidth="0.8"
      />

      {/* Upper panel */}
      <rect x={-w/2+inset} y={-h/2+inset*1.5} width={w-inset*2} height={h*0.3}
        fill="none" stroke="rgba(65,30,8,0.38)" strokeWidth="0.75" rx="1" />

      {/* Lower panel */}
      <rect x={-w/2+inset} y={-h/2+h*0.42} width={w-inset*2} height={h*0.42}
        fill="none" stroke="rgba(65,30,8,0.38)" strokeWidth="0.75" rx="1" />

      {/* Light bleeding from right edge — door slightly ajar */}
      <line x1={w/2} y1={archCY} x2={w/2} y2={h/2}
        stroke="rgba(255,200,80,0.28)" strokeWidth="1.2"
        className="door-light"
        style={{ animationDelay: `${delay}s` }}
      />
      <line x1={w/2-1.5} y1={archCY} x2={w/2-1.5} y2={h/2}
        stroke="rgba(255,200,80,0.1)" strokeWidth="3"
        className="door-light"
        style={{ animationDelay: `${delay}s` }}
      />

      {/* Door knob */}
      <circle cx={w*0.27} cy={h*0.04}
        r={w*0.065} fill="rgba(90,50,15,0.75)" stroke="rgba(140,80,25,0.5)" strokeWidth="0.8" />
      <circle cx={w*0.27} cy={h*0.04} r={w*0.025} fill="rgba(170,100,30,0.6)" />

      {/* Keyhole */}
      <circle cx={w*0.27} cy={-h*0.1} r={w*0.045}
        fill="rgba(255,175,50,0.45)"
        className="door-light"
        style={{ animationDelay: `${delay + 0.5}s` }}
      />
      <path
        d={`M ${w*0.27-w*0.032} ${-h*0.1} L ${w*0.27} ${-h*0.1+w*0.09} L ${w*0.27+w*0.032} ${-h*0.1}`}
        fill="rgba(255,175,50,0.45)"
        className="door-light"
        style={{ animationDelay: `${delay + 0.5}s` }}
      />

      {/* Faint silhouette visible through keyhole glow */}
      <ellipse cx={w*0.27} cy={-h*0.22} rx={w*0.07} ry={w*0.09}
        fill="rgba(3,1,0,0.5)" />
    </g>
  )
}

// Scattered decor layout — positions as [left%, top%], type, params
const DECOR_ITEMS = [
  // Left side
  { x:  3, y: 12, type: 'circle',  size: 55,  delay: 0,    rotateDir:  1, rotateSpeed: 28, opacity: 0.22 },
  { x:  7, y: 42, type: 'sigil',   size: 38,  delay: 1.2,  opacity: 0.18 },
  { x:  2, y: 68, type: 'cross',   size: 44,  delay: 0.5,  opacity: 0.20 },
  { x: 10, y: 28, type: 'eye',     size: 32,  delay: 2.1,  opacity: 0.15 },
  { x:  5, y: 82, type: 'circle',  size: 36,  delay: 1.8,  rotateDir: -1, rotateSpeed: 40, opacity: 0.16 },
  { x: 13, y: 58, type: 'sigil',   size: 26,  delay: 0.8,  opacity: 0.13 },
  // Right side
  { x: 88, y: 15, type: 'circle',  size: 48,  delay: 0.6,  rotateDir: -1, rotateSpeed: 32, opacity: 0.20 },
  { x: 93, y: 45, type: 'cross',   size: 40,  delay: 1.5,  opacity: 0.18 },
  { x: 85, y: 72, type: 'sigil',   size: 42,  delay: 0.3,  opacity: 0.21 },
  { x: 91, y: 32, type: 'eye',     size: 28,  delay: 2.4,  opacity: 0.14 },
  { x: 96, y: 60, type: 'circle',  size: 34,  delay: 1.1,  rotateDir:  1, rotateSpeed: 50, opacity: 0.15 },
  { x: 84, y: 88, type: 'cross',   size: 30,  delay: 0.9,  opacity: 0.13 },
  // Top corners
  { x:  1, y:  2, type: 'sigil',   size: 30,  delay: 1.6,  opacity: 0.12 },
  { x: 95, y:  3, type: 'cross',   size: 28,  delay: 0.4,  opacity: 0.12 },
  // Bloodied eyes — far margins only (x < 18 or x > 78), avoid center content
  { x: 10, y: 18, type: 'blood-eye', size: 24, delay: 0.7,  blinkInterval: 7,  opacity: 0.62 },
  { x: 87, y: 16, type: 'blood-eye', size: 20, delay: 2.5,  blinkInterval: 5,  opacity: 0.55 },
  { x:  5, y: 50, type: 'blood-eye', size: 28, delay: 1.3,  blinkInterval: 9,  opacity: 0.65 },
  { x: 93, y: 54, type: 'blood-eye', size: 22, delay: 3.8,  blinkInterval: 6,  opacity: 0.58 },
  { x: 15, y: 75, type: 'blood-eye', size: 18, delay: 4.2,  blinkInterval: 11, opacity: 0.40 },
  { x: 82, y: 78, type: 'blood-eye', size: 20, delay: 1.9,  blinkInterval: 7,  opacity: 0.42 },
  // Eerie doors — screen edges only
  { x:  0, y: 44, type: 'door', size: 54, delay: 0,   opacity: 0.32 },
  { x: 97, y: 40, type: 'door', size: 48, delay: 2.1, opacity: 0.28 },
]

const BLOOD = 'rgba(140,15,15,VAL)'

function ScatteredDecor() {
  return (
    <div className="scattered-decor" aria-hidden="true">
      <svg width="0" height="0" style={{ position:'absolute' }}>
        <defs>
          <filter id="sd-rough">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      {DECOR_ITEMS.map((item, i) => {
        const col = BLOOD.replace('VAL', item.opacity + 0.05)
        const baseOpacity = item.opacity
        return (
          <div
            key={i}
            className="decor-item"
            style={{ left: `${item.x}vw`, top: `${item.y}vh` }}
          >
            <svg
              width={item.size * 2 + 10}
              height={item.size * 2 + 10}
              viewBox={`${-item.size-5} ${-item.size-5} ${item.size*2+10} ${item.size*2+10}`}
              overflow="visible"
              style={{ animationDelay: `${item.delay}s` }}
            >
              {item.type === 'circle' && (
                <MiniCircle
                  r={item.size / 2}
                  roughId="sd-rough"
                  color={`rgba(140,15,15,${baseOpacity + 0.08})`}
                  opacity={1}
                  delay={item.delay}
                  rotate={item.rotateDir > 0 ? item.rotateSpeed : -item.rotateSpeed}
                />
              )}
              {item.type === 'sigil' && (
                <MiniSigil
                  size={item.size}
                  color={`rgba(140,15,15,${baseOpacity + 0.08})`}
                  opacity={1}
                  delay={item.delay}
                />
              )}
              {item.type === 'cross' && (
                <RunicCross
                  size={item.size}
                  color={`rgba(140,15,15,${baseOpacity + 0.08})`}
                  opacity={1}
                  delay={item.delay}
                />
              )}
              {item.type === 'eye' && (
                <ArcaneEye
                  size={item.size}
                  color={`rgba(140,15,15,${baseOpacity + 0.08})`}
                  opacity={1}
                  delay={item.delay}
                />
              )}
              {item.type === 'blood-eye' && (
                <BloodEye
                  size={item.size}
                  delay={item.delay}
                  blinkInterval={item.blinkInterval}
                  opacity={baseOpacity}
                />
              )}
              {item.type === 'door' && (
                <EerieDoor
                  width={item.size}
                  opacity={baseOpacity}
                  delay={item.delay}
                />
              )}
            </svg>
          </div>
        )
      })}
    </div>
  )
}

// Candle configuration — 8 candles across the bottom
const CANDLE_CONFIGS = [
  { height: 75,  delay: 0,    tilt: -1.5, waxColor: '#cfc0a0',
    drips: [{ x: -3, startY: 2, length: 18, wobble: -2.5, opacity: 0.8 }, { x: 3, startY: 5, length: 11, wobble: 1.5, opacity: 0.6 }] },
  { height: 50,  delay: 0.41, tilt:  1.0, waxColor: '#b0a080',
    drips: [{ x: 2, startY: 3, length: 22, wobble: 2, opacity: 0.9 }] },
  { height: 95,  delay: 0.73, tilt: -0.5, waxColor: '#c8b898',
    drips: [{ x: -4, startY: 1, length: 14, wobble: -1.5, opacity: 0.7 }, { x: 2, startY: 8, length: 8, wobble: 2, opacity: 0.5 }] },
  { height: 48,  delay: 1.1,  tilt:  2.0, waxColor: '#d0c0a5',
    drips: [{ x: 3, startY: 4, length: 16, wobble: 2.5, opacity: 0.85 }] },
  { height: 85,  delay: 0.28, tilt: -1.0, waxColor: '#b8a888',
    drips: [{ x: -2, startY: 2, length: 12, wobble: -2, opacity: 0.75 }, { x: 4, startY: 6, length: 20, wobble: 1.5, opacity: 0.6 }] },
  { height: 65,  delay: 0.88, tilt:  0.8, waxColor: '#cbbba0',
    drips: [{ x: -3, startY: 3, length: 25, wobble: -2, opacity: 0.9 }] },
  { height: 42,  delay: 1.45, tilt: -1.8, waxColor: '#c0b090',
    drips: [{ x: 2, startY: 5, length: 13, wobble: 2, opacity: 0.7 }] },
  { height: 90,  delay: 0.55, tilt:  1.2, waxColor: '#d4c4a8',
    drips: [{ x: -3, startY: 2, length: 17, wobble: -1.5, opacity: 0.8 }, { x: 3, startY: 9, length: 9, wobble: 2.5, opacity: 0.55 }] },
]

export default function Candles() {
  return (
    <>
      <RitualCircle />
      <ScatteredDecor />
      <div className="candle-container" aria-hidden="true">
        {CANDLE_CONFIGS.map((cfg, i) => (
          <Candle key={i} {...cfg} />
        ))}
      </div>
    </>
  )
}

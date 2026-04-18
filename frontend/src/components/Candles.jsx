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
      <div className="candle-container" aria-hidden="true">
        {CANDLE_CONFIGS.map((cfg, i) => (
          <Candle key={i} {...cfg} />
        ))}
      </div>
    </>
  )
}

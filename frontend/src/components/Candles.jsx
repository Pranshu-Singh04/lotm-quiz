// frontend/src/components/Candles.jsx
export default function Candles() {
  const heights = [80, 60, 100, 55, 90, 70, 45, 95]
  return (
    <div className="candle-container" aria-hidden="true">
      {heights.map((h, i) => (
        <div key={i} className="candle">
          <div className="candle-flame" style={{ animationDelay: `${i * 0.37}s` }} />
          <div className="candle-body" style={{ height: h }} />
        </div>
      ))}
    </div>
  )
}

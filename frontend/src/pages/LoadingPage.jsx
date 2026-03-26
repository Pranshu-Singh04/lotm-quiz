export default function LoadingPage() {
  return (
    <div className="screen" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div className="ritual-circle">
        <div className="ritual-ring r1"></div>
        <div className="ritual-ring r2"></div>
        <div className="ritual-ring r3"></div>
        <div className="ritual-center"></div>
      </div>
      <p className="loading-text">Consulting the Pathway Matrix...</p>
    </div>
  )
} 